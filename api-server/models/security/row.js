let policies = {
    "manager": {
        "admin": {
            "getAll": (knex) => knex,
            "update": (knex) => knex,
        },
        "manager": {
            "getAll": (knex, user) => 
                knex.where({username: user.username}),
            "update": (knex, user) => 
                knex.where({username: user.username}),            
        }
    },
    "customers": {
        "admin": {
            "getAll": (knex) => knex,
            "getOne": (knex) => knex,
            "update": (knex) => knex,
            "delete": (knex) => knex
        },
        "manager": {
            "getAll": (knex) => knex,
            "getOne": (knex) => knex,
            "update": (knex) => knex,
            "delete": (knex) => knex
        },
        "customer": {
            "getAll": (knex, user) => 
                knex.where({ username: user.username }),
            "getOne": (knex, user) => 
                knex.where({ username: user.username }),
            "update": (knex, context) =>
                knex.where({ username: context.username }),
            "delete": (knex) => knex.whereRaw('0 = 1')
        }
    } 
};

module.exports.rowFilter = function(knex, action, table, context) {
    return policies[table][context.role][action](knex, context);
}