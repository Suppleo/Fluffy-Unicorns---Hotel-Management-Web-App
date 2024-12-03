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
    },
    "booking": {
        "admin": {
            "getAll": ['booking_id', 'username', 'booking_date', 'checkin_date', 'checkout_date', 'total_price'],
            "getOne": ['booking_id', 'username', 'booking_date', 'checkin_date', 'checkout_date', 'total_price', 'room_id', 'price_per_day', 'room_total_price'],
            "update": ['checkin_date', 'checkout_date']
        },
        "manager": {
            "getAll": ['booking_id', 'username', 'booking_date', 'checkin_date', 'checkout_date', 'total_price'],
            "getOne": ['booking_id', 'username', 'booking_date', 'checkin_date', 'checkout_date', 'total_price', 'room_id', 'price_per_day', 'room_total_price'],
            "update": ['checkin_date', 'checkout_date']
        },
        "customer": {
            "getAll": ['booking_id', 'booking_date', 'checkin_date', 'checkout_date', 'total_price'],
            "getOne": ['booking_id', 'booking_date', 'checkin_date', 'checkout_date', 'total_price', 'room_id', 'price_per_day', 'room_total_price'],
            "update": ['checkin_date', 'checkout_date']
        }
    },
    "booking_detail": {
        "admin": {
            "update": ['room_id', 'price_per_day', 'total_price']
        },
        "manager": {
            "update": ['room_id', 'price_per_day', 'total_price']
        },
        "customer": {
            "update": ['room_id']
        }
    },
};

module.exports.columnFilter = function(table, role, action) {
    return policies[table][role][action];
}