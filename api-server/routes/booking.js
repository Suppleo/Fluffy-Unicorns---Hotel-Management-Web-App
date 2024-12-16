const Router = require('restify-router').Router;
const router = new Router();
const { authenticated } = require('./middleware/authenticate');
const { authorized } = require('./middleware/authorize');
const { validated } = require('./middleware/validated');
const Booking = require('../models/booking');

router.get('/booking/customer/:id', async (req, res) => {
    try {
        const customerId = parseInt(req.params.id);
        const result = await Booking.getCustomerBookings(customerId);
        
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