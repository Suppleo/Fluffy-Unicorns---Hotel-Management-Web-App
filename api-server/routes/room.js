var Router = require('restify-router').Router;
const router = new Router();
var format = require('pg-format');
var {authenticated} = require('./middleware/authenticate'); 
const {authorized} = require('./middleware/authorize');
const {validated} = require('./middleware/validated');
const Room = require('../models/room');
const {getPgClient} = require('../models/db')

router.get('/room', async (req, res) => {
    const result = await Room.all();

    res.send( {
        rooms: result
    });
});

router.get('/room/:id', [validated], async (req, res) => {
    const id = req.params.id;
    
    const {found, data} = await Room.byId(id);

    if (found) {
        res.send({
            success: true, code: 200, message: "",
            data: data
        });
    } else {
        res.send({
            success: false, code: 404,
            message: "Cannot find room with id: " + id
        });
    }   
});


router.post('/room', [authenticated, authorized, validated], async (req, res) => {
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

router.del('/room/:id', [authenticated, authorized, validated], async(req, res) => {
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

router.patch('/room/:id', [authenticated, authorized, validated], async(req, res) => { 
    const {id} = req.params;
    const result = await Room.updateById(id, req);
    res.send(result); 
});

module.exports = router;