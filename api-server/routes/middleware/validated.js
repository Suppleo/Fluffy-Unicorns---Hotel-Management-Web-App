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
    },
    "/customer/:username/booking": {
        "GET": {
            username: "required|string"
        }
    },
    "/booking/:id": {
        "GET": {
            id: "required|integer|min:1",
        },
        "PATCH": {
            id: "required|integer|min:1",
            checkin_date: "date",
            checkout_date: "date|after:checkin_date"
        },
        "DELETE": {
            id: "required|integer|min:1"
        },
    },
    "/booking": {
        "POST": {
            checkin_date: "required|date",
            checkout_date: "required|date|after:checkin_date",
            total_price: "required|numeric|min:0",
            rooms: "required|array|min:1",
            "rooms.*.room_id": "required|integer|min:1",
            "rooms.*.price_per_day": "required|numeric|min:0",
            "rooms.*.total_price": "required|numeric|min:0"
        }
    },
    "/detail/:id": {
        "PATCH": {
            id: "required|integer|min:1",
            username: "required|string",
            booking_id: "required|integer|min:1",
            room_id: "integer|min:1",
            price_per_day: "numeric|min:0",
            total_price: "numeric|min:0"
        },
        "DELETE": {
            id: "required|integer|min:1"
        }
    },
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