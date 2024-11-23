let Validator = require('validatorjs');
let rules = {
    "/room/:id": {
        "GET":  {
            id: "required|integer|min:1"
        },
        "DELETE": {
            id: "required|integer|min:1"
        },
        "PATCH": {
		    id: "required|integer|min:1",
            name: "string",
            price: "integer|min:0"   
        }
    },
    "/room": {
        "POST": {
            name: "required|string",
            price: "required|integer|min:0"
        }
    },
    "/manager/:username": {
        "PATCH": {
		    username: "string",
            fullname: "string",
            base_salary: "integer|min:0"
        }
    },
    "/customer": {
        "POST": {
            username: "required|string|min:3|max:20",
            password: "required|string|min:3|max:50"
        }
    },
    "/customer/:username": {
        "PATCH": {
            fullname: "string",
            base_salary: "integer|min:0"
        },
        "DELETE": {
            username: "required|string" // `username` phải là chuỗi và không được bỏ trống
        }
    }
};

module.exports.validated = function (req, res, next) {
    let {method, path} = req.getRoute();
    let rule = rules[path][method];
    let validation = new Validator(req.params, rule);

    if (validation.fails()) {
        res.send({
            success: false, code: 400, message: "Bad request", 
            data: validation.errors
        }); return next(false);
    }

    return next();
}