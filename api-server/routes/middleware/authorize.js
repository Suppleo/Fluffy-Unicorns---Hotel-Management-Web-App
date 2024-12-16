let table_policies =  { // TODO: Tạo từ CSDL
    "/customer": {
        "admin": {
            "GET": true,
        },
        "manager": {
            "GET": true,
        },
        "customer": {
            "GET": true,
        },
    },
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