var Router = require('restify-router').Router;
const router = new Router();
var {getPgClient} = require('../models/db');
const Service = require('../models/service');

router.get('/api/service', async (req, res) => {
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

router.get('/api/service-usages', async (req, res) => {
    try {
        const result = await Service.getAllServiceUsages();
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

router.get('/api/service-usages/booking/:bookingId', async (req, res) => {
    try {
        const bookingId = parseInt(req.params.bookingId);
        const result = await Service.getServiceUsagesByBookingId(bookingId);
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

router.post('/api/service-usages', async (req, res) => {
    try {
        const result = await Service.createServiceUsage(req.body);
        if (result.success) {
            res.send(201, {
                success: true,
                data: result.data
            });
        } else {
            res.send(400, {
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
