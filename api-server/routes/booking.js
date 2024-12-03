const Router = require('restify-router').Router;
const router = new Router();
const { authenticated } = require('./middleware/authenticate');
const { authorized } = require('./middleware/authorize');
const { validated } = require('./middleware/validated');
const Booking = require('../models/booking');

router.get('/booking/:id', [authenticated, authorized, validated], async (req, res) => {
    try {
        const { id } = req.params;
        const context = req.user;

        const result = await Booking.getBookingDetails(context, id);

        if (result.success) {
            res.send({
                success: true,
                code: 200,
                message: 'Booking details retrieved successfully',
                data: result.data
            });
        } else {
            res.send({
                success: false,
                code: 400,
                message: result.message
            });
        }
    } catch (error) {
        console.error('Error retrieving booking details:', error);
        res.send({
            success: false,
            code: 500,
            message: 'Internal Server Error'
        });
    }
});

router.post('/booking', [authenticated, authorized, validated], async (req, res) => {
    try {
        const bookingData = req.body;
        const context = req.user;

        const result = await Booking.createBooking(context, bookingData);

        if (result.success) {
            res.send({
                success: true,
                code: 201,
                message: 'Booking created successfully',
                data: result.data
            });
        } else {
            res.send({
                success: false,
                code: 400,
                message: result.message
            });
        }
    } catch (error) {
        console.error('Error creating booking:', error);
        res.send({
            success: false,
            code: 500,
            message: 'Internal Server Error',
            error: error.message
        });
    }
});

router.patch('/booking/:id', [authenticated, authorized, validated], async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const context = req.user;

        const result = await Booking.updateBooking(context, id, updateData);

        if (result.success) {
            res.send({
                success: true,
                code: 200,
                message: 'Booking updated successfully',
                data: result.data
            });
        } else {
            res.send({
                success: false,
                code: 400,
                message: result.message
            });
        }
    } catch (error) {
        console.error('Error updating booking:', error);
        res.send({
            success: false,
            code: 500,
            message: 'Internal Server Error',
            error: error.message
        });
    }
});

router.patch('/detail/:id', [authenticated, authorized, validated], async (req, res) => {
    try {
        const { id } = req.params;
        const { username, booking_id, ...updateData } = req.body;
        const context = req.user;

        if (context.role === 'customer' && context.username !== username) {
            return res.send({
                success: false,
                code: 403,
                message: 'You can only update your own booking details'
            });
        }

        const result = await Booking.updateBookingDetail(context, id, booking_id, username, updateData);

        if (result.success) {
            res.send({
                success: true,
                code: 200,
                message: 'Booking detail updated successfully',
                data: result.data
            });
        } else {
            res.send({
                success: false,
                code: 400,
                message: result.message
            });
        }
    } catch (error) {
        console.error('Error updating booking detail:', error);
        res.send({
            success: false,
            code: 500,
            message: 'Internal Server Error',
            error: error.message
        });
    }
});

router.del('/detail/:id', [authenticated, authorized, validated], async (req, res) => {
    try {
        const { id } = req.params;
        const context = req.user;

        const result = await Booking.deleteBookingDetail(context, id);

        if (result.success) {
            res.send({
                success: true,
                code: 200,
                message: 'Booking detail deleted successfully'
            });
        } else {
            res.send({
                success: false,
                code: result.code || 400,
                message: result.message
            });
        }
    } catch (error) {
        console.error('Error deleting booking detail:', error);
        res.send({
            success: false,
            code: 500,
            message: 'Internal Server Error'
        });
    }
});

router.del('/booking/:id', [authenticated, authorized, validated], async (req, res) => {
    try {
        const { id } = req.params;
        const context = req.user;

        const result = await Booking.deleteBooking(context, id);

        if (result.success) {
            res.send({
                success: true,
                code: 200,
                message: 'Booking deleted successfully'
            });
        } else {
            res.send({
                success: false,
                code: result.code || 400,
                message: result.message
            });
        }
    } catch (error) {
        console.error('Error deleting booking:', error);
        res.send({
            success: false,
            code: 500,
            message: 'Internal Server Error'
        });
    }
});


module.exports = router;