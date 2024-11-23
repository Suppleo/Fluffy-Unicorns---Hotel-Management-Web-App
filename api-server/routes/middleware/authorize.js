let table_policies =  { // TODO: Tạo từ CSDL
    "/room": {
        "admin": {
            "GET": true,
            "POST": true,
       },
        "manager": {
            "GET": true,
            "POST": false,
       }
   },
   "/room/:id": {
        "admin": {
           "GET": true,
           "DELETE": true,
           "PATCH": true,
       },
        "manager": {
           "GET": true,
           "DELETE": false,
           "PATCH": false,
       }
   },
   "/manager": {
        "admin": {
            "GET": true,
        },
        "manager": {
            "GET": true,
        },
    },
    "/manager/:username": {
        "admin": {
            "PATCH": true,
        },
        "manager": {
            "PATCH": true
        },
    },
    "/customer": {
        "admin": {
            "GET": true,
            "POST": false
        },
        "manager": {
            "GET": true,
            "POST": false
        },
        "customer": {
            "GET": true,
            "POST": false
        },
    },
    "/customer/:username": {
        "admin": {
            "GET": true,
            "PATCH": true,
            "DELETE": true
        },
        "manager": {
            "GET": true,
            "PATCH": true,
            "DELETE": true
        },
        "customer": {
            "GET": true,
            "PATCH": true,
            "DELETE": false
        }
    }

};

module.exports.authorized = function(req, res, next) {
    const {method, path} = req.getRoute();
    if (!table_policies[path][req.user.role][method]) {
        res.send({
            success: false, code: 401, message: "Unauthorized access - Insufficient priviledge"
        }); 
        return next(false);
    }
    return next();
}