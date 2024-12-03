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
            "deleteOne": (knex) => knex
        },
        "manager": {
            "getAll": (knex) => knex,
            "getOne": (knex) => knex,
            "update": (knex) => knex,
            "deleteOne": (knex) => knex
        },
        "customer": {
            "getAll": (knex, user) => 
                knex.where({ username: user.username }),
            "getOne": (knex, user) => 
                knex.where({ username: user.username }),
            "update": (knex, context) =>
                knex.where({ username: context.username }),
            "deleteOne": (knex) => knex.whereRaw('0 = 1')
        }
    },
    "booking": {
        "admin": {
            "getBookings": (knex) => knex,
            "getBookingDetails": (knex) => knex,
            "createBooking": (knex) => knex,
            "updateBooking": (knex) => knex,
            "updateBookingDetail": (knex) => knex,
            "deleteBookingDetail": (knex) => knex,
            "deleteBooking": (knex) => knex,
        },
        "manager": {
            "getBookings": (knex) => knex,
            "getBookingDetails": (knex) => knex,
            "createBooking": (knex) => knex,
            "updateBooking": (knex) => knex,
            "updateBookingDetail": (knex) => knex,
            "deleteBookingDetail": (knex) => knex,
            "deleteBooking": (knex) => knex,
        },
        "customer": {
            "getBookings": (knex, user) => knex.where({ username: user.username }),
            "getBookingDetails": (knex, user) => knex.where({ username: user.username }),
            "createBooking": (knex, user) => knex.where({ username: user.username }),
            "updateBooking": (knex, user) => knex.where({ username: user.username }),
            "updateBookingDetail": (knex, user) => knex.where({ username: user.username }),
            "deleteBookingDetail": (knex, user) => knex.where({ username: user.username }),
            "deleteBooking": (knex, user) => knex.where({ username: user.username }),
        }
    }
};

module.exports = {
    rowFilter: function(query, action, table, context) {
        if (!policies[table] || !policies[table][context.role] || !policies[table][context.role][action]) {
            console.warn(`No policy found for table: ${table}, role: ${context.role}, action: ${action}`);
            return query;  // Return unmodified query if no policy is found
        }
        return policies[table][context.role][action](query, context);
    }
};