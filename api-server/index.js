var restify = require('restify');
var jwt = require('jsonwebtoken');
var format = require('pg-format');
var Router = require('restify-router').Router;
var router = new Router();
var server = restify.createServer();

const { Client } = require('pg');
var corsMiddleware = require('restify-cors-middleware2');

var cors = corsMiddleware({
    preflightMaxAge: 5,
    origins: ['*'],
    allowHeaders:['X-App-Version'],
    exposeHeaders:[]
});

server.pre(cors.preflight);
server.use(cors.actual);
server.use(restify.plugins.bodyParser({ mapParams: true })); // POST params
server.use(restify.plugins.queryParser()); // GET query

function authenticated(req, res, next) {
    const authHeader = String(req.headers['authorization'] || '');
    if (authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7, authHeader.length);
        try { // Bổ sung thông tin này vào request để xử lí tiếp
            const {username, role} = jwt.verify(token, secret);
            req.user = { // Boôổ s
                username: username,
                role: role
            };
            return next();
        } catch (e){
            res.send({
                success: false, code: 401,
                message: "Unauthorized access - Invalid token",
            }); 
            return next(false);
        }
    } else {
        res.send({
            success: false, code: 401,
            message: "Unauthorized access - No token"
        }); 
        return next(false);
    }
}

function getPgClient() {
    return new Client({    
        host: `${process.env.POSTGRES_HOST}`,
        port: `${process.env.POSTGRES_PORT}`,
        database: `${process.env.POSTGRES_DB}`,
        user: `${process.env.POSTGRES_USER}`,
        password: `${process.env.POSTGRES_PASSWORD}`,
    })
}

router.get('/', async function(req, res) {
    const client = new Client({        
        host: `${process.env.POSTGRES_HOST}`,
        port: `${process.env.POSTGRES_PORT}`,
        database: `${process.env.POSTGRES_DB}`,
        user: `${process.env.POSTGRES_USER}`,
        password: `${process.env.POSTGRES_PASSWORD}`,
      })

    var db_info = "Database is up & running";
    try {
        await client.connect();
    } catch (e)
    {
        db_info = "Cannot connect to database!";
        console.log(e);
    } finally {
        await client.end();
    }

    res.send( {
        Server: "Server is working very good!",
        Database: db_info
      });
});

router.get('/room', async function(req, res) {
    const client = new Client({    
      host: `${process.env.POSTGRES_HOST}`,
      port: `${process.env.POSTGRES_PORT}`,
      database: `${process.env.POSTGRES_DB}`,
      user: `${process.env.POSTGRES_USER}`,
      password: `${process.env.POSTGRES_PASSWORD}`,
    })
    var sql = "select * from room";
    var result = [];
  
    try {
      await client.connect();
      result = await client.query(sql);    
      result = result.rows
    } catch (e) {
      console.log(e);
    } finally {
      await client.end();
    }
  
    res.send( {
      rooms: result
    });
  });

router.post('/login', async (req, res) => {
    const {username = "", password = ""} = req.params;
    if ((username.length == 0)
        || (password.length == 0)
    ) {
        res.send({
            success: false,
            code: 401,
            message: "Invalid username or password"
        })
    }

    //Trả lại token nếu hợp lệ
    if( ((username == "admin") && (password=="1234") )
        || ((username == "manager01") && (password == "1234"))
        || ((username == "manager02") && (password == "1234"))
        || ((username == "customer01") && (password == "1234"))
    ){
        const secret = "my-secret-key";
        const token = jwt.sign({
            username: username ,
             role: (username == "admin") ? "admin" 
                : ((username == "manager01") 
	                || (username == "manager02") ) ? "manager"
                : "customer"
        }, secret, { expiresIn: '1h' });
        res.send({
            success: true,
            code: 200,
            message: "Login successfully",
            token: token
        })
    } else {
        res.send({
            success: false,
            code: 401,
            message: "Invalid username or password"
        });
    }    
});

router.post('/room', authenticated, async (req, res) => {
    var {name = "", price = 0} = req.params;
    // TODO: Check valid params
    if (name.length == 0) {
        res.send({
            success: false, code: 403,
            message: "Invalid parameters"
        }); return;
    }

    // TODO: kiểm tra role có quyền insert trong bảng room hay không   
    const client = getPgClient();
    var sql = format(
        "insert into room(name, price) values(%L, %L)",
        name, price
    );
    await client.connect();
    result = await client.query(sql); 
    client.end();

    res.send({
        success: true, code: 200,
        message: "Room added successfully",
        info: req.user
    }); return;
});

router.get('/room/:id', async (req, res) => {
    var id = req.params.id;
    var client = getPgClient();
    sql = format(
        "select * from room where room_id=%L",
        id
    );

    await client.connect();
    result = await client.query(sql);
    await client.end();

    var found = result.rows.length > 0;

    if (found) {
        res.send({
            success: true, code: 200, message: "",
            data: result.rows[0]
        });
    } else {
        res.send({
            success: false, code: 404,
            message: "Cannot find room with id: " + id
        });
    }   
})

router.del('/room/:id', authenticated, async(req, res) => {
    var id = req.params.id;
    var sql = format(
        "delete from room where room_id=%L",
        id
    );
    var client = getPgClient();
    await client.connect();
    var result = await client.query(sql);
    await client.end();

    var found = result.rowCount > 0;

    if (found) {
        res.send({
            success: true, code: 200, message: ""
        });
    } else {
        res.send({
            success: true, code: 404, message: "Cannot delete room with id " + id + ". Does not exist."
        });
    }
});

router.patch('/room/:id', authenticated, async(req, res) => {
    var {name = "", price=0} = req.params;

    var id = req.params.id;
    var sql = format(
        "update room set name=%L, price=%L where room_id=%L",
        name, price, id
    );
    var client = getPgClient();
    await client.connect();
    var result = await client.query(sql);
    await client.end();

    var found = result.rowCount > 0;

    if (found) {
        res.send({
            success: true, code: 200, message: ""
        });
    } else {
        res.send({
            success: true, code: 404, message: "Cannot update room with id " + id + ". Does not exist."
        });
    }
});

router.applyRoutes(server);

var PORT = 8080;
server.listen(PORT, function() {
    console.log('%s listening at %s', server.name, server.url);
});