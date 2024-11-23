const Router = require('restify-router').Router;
const router = new Router();
const { authenticated } = require('./middleware/authenticate');
const { authorized } = require('./middleware/authorize');
const { validated } = require('./middleware/validated');

const Customer = require('../models/customer');

// Endpoint GET /customer - Lấy danh sách khách hàng
router.get('/customer', [authenticated, authorized], async (req, res) => {
    try {
        const result = await Customer.getAll(req);

        if (result.length > 0) {
            res.send({
                success: true,
                code: 200,
                data: result,
            });
        } else {
            res.send({
                success: true,
                code: 404,
                message: 'No customers found',
            });
        }
    } catch (error) {
        res.send({
            success: false,
            code: 500,
            message: 'Internal Server Error',
            error: error.message,
        });
    }
});

router.post('/customer', [validated], async (req, res) => {
    try {
        const { username, password } = req.body;

        // Gọi hàm tạo tài khoản
        const result = await Customer.create(username, password);

        if (result.success) {
            res.send({
                success: true,
                code: 201,
                message: 'Customer account created successfully',
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
        console.error('Error creating customer:', error);
        res.send({
            success: false,
            code: 500,
            message: 'Internal Server Error',
            error: error.message
        });
    }
});


router.get('/customer/:username', [authenticated, authorized], async (req, res) => {
    try {
        const { username } = req.params;
        const context = req.user;

        // Gọi hàm lấy thông tin một khách hàng từ model
        const result = await Customer.getOne(context, username);

        if (result) {
            res.send({
                success: true,
                code: 200,
                data: result
            });
        } else {
            res.send({
                success: false,
                code: 404,
                message: `Customer with username '${username}' not found.`
            });
        }
    } catch (error) {
        console.error('Error fetching customer:', error);
        res.send({
            success: false,
            code: 500,
            message: 'Internal Server Error',
            error: error.message
        });
    }
});

router.patch('/customer/:username', [authenticated, authorized, validated], async (req, res) => {
    try {
        const { username } = req.params;
        const context = req.user;
        const patch = req.body;

        const result = await Customer.update(context, username, patch);

        if (result.success) {
            res.send({
                success: true,
                code: 200,
                message: 'Customer information updated successfully',
                data: result.data
            });
        } else {
            res.send({
                success: false,
                code: 404,
                message: `Customer with username '${username}' not found`
            });
        }
    } catch (error) {
        console.error('Error updating customer:', error);
        res.send({
            success: false,
            code: 500,
            message: 'Internal Server Error',
            error: error.message
        });
    }
});

router.del('/customer/:username', [authenticated, authorized, validated], async (req, res) => {
    try {
        const { username } = req.params;
        const context = req.user;

        // Gọi hàm xóa khách hàng từ model
        const result = await Customer.deleteOne(context, username);

        if (result.success) {
            res.send({
                success: true,
                code: 200,
                message: `Customer '${username}' deleted successfully.`
            });
        } else {
            res.send({
                success: false,
                code: 404,
                message: `Customer with username '${username}' not found.`
            });
        }
    } catch (error) {
        console.error('Error deleting customer:', error);
        res.send({
            success: false,
            code: 500,
            message: 'Internal Server Error',
            error: error.message
        });
    }
});

module.exports = router;
