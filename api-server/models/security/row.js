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
    }    
};

module.exports.rowFilter = function(knex, action, table, context) {
    return policies[table][context.role][action](knex, context);
}