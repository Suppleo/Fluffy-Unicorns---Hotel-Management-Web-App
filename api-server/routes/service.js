var Router = require('restify-router').Router;
const router = new Router();
var {getPgClient} = require('../models/db');
const Service = require('../models/service');

router.get('/service', async (req, res) => {
    try {
        const result = await Service.getAllServices();
        if (result.success) {
            res.send(200, {
                success: true,
                data: result.data
            });
        } else {
            res.send(500, {
                success: false,
                message: result.message
            });
        }
    } catch (error) {
        res.send(500, {
            success: false,
            message: error.message
        });
    }
});

module.exports = router;
