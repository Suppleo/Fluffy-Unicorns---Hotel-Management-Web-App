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