var restify = require('restify');

var server = restify.createServer();

const { Client } = require('pg');

server.get('/', async function(req, res) {
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

var PORT = 8080;
server.listen(PORT, function() {
    console.log('%s listening at %s', server.name, server.url);
});