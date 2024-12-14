const Router = require('restify-router').Router;
const router = new Router();
const { authenticated } = require('./middleware/authenticate');
const { authorized } = require('./middleware/authorize');
const { validated } = require('./middleware/validated');
const {sign} = require('./middleware/authenticate');
const Account = require('../models/account');
var jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    try {
        const { FirstName, LastName, Username, Phone, Password } = req.body;
        const result = await Account.register(FirstName, LastName, Username, Phone, Password);

        if (result.success) {
            res.send({
                success: true,
                code: 201,
                message: 'Account registered successfully',
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
        res.send({
            success: false,
            code: 500,
            message: 'Internal Server Error',
            error: error.message
        });
    }
});

router.post('/login', async (req, res) => {
    var {username = "", password = ""} = req.body;

    if ((username.length == 0)
        || (password.length == 0)
    ) {
        res.send({
            success: false,
            code: 401,
            message: "Invalid username or password"
        })
    }

    const {success, error_code, message, data} = 
	    await Account.login(username, password);

    if (success) {
        const token = sign(username, data.role);
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


module.exports = router;