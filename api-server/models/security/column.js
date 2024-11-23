let policies = {
    "manager": {
        "admin": {
            "update": ['fullname', 'base_salary']
        },
        "manager": {
            "update": ['fullname']            
        }
    },
    "customers": {
        "admin": {
            "update": ['fullname', 'email', 'tel']
        },
        "manager": {
            "update": ['fullname', 'email', 'tel']
        },
        "customer": {
            "update": ['fullname', 'email', 'tel'] // Không cho phép sửa username
        }
    } 
};

module.exports.columnFilter = function(table, role, action) {
    return policies[table][role][action];
}