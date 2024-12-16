// test/api-server/models/booking.js
const { getKnex } = require('./db.js');
const { rowFilter } = require('./security/row.js');
const { columnFilter } = require('./security/column.js');

const getCustomerBookings = async (customerId) => {
    const knex = getKnex();
    try {
        const bookings = await knex('Booking')
            .join('BookingDetail', 'Booking.BookingID', '=', 'BookingDetail.BookingID')
            .join('Room', 'BookingDetail.RoomID', '=', 'Room.RoomID')
            .join('RoomType', 'Room.RoomTypeID', '=', 'RoomType.RoomTypeID')
            .join('Guest', 'BookingDetail.GuestID', '=', 'Guest.GuestID')
            .join('Customer', 'Booking.CustomerID', '=', 'Customer.CustomerID')
            .join('Account', 'Customer.AccountID', '=', 'Account.AccountID')
            .select(
                'Booking.BookingID',
                'Account.FirstName',
                'Account.MiddleName',
                'Account.LastName',
                'Customer.CustomerID',
                'Booking.BookingDate',
                'Booking.CheckInDate',
                'Booking.CheckOutDate',
                'Booking.TotalAmount',
                'Booking.Status',
                'Booking.PaymentStatus',
                'Room.RoomNumber',
                'RoomType.TypeName',
                knex.raw(`
                    json_agg(
                        json_build_object(
                            'GuestID', "Guest"."GuestID",
                            'FirstName', "Guest"."FirstName",
                            'MiddleName', "Guest"."MiddleName",
                            'LastName', "Guest"."LastName",
                            'DateOfBirth', "Guest"."DateOfBirth",
                            'IDNumber', "Guest"."IDNumber",
                            'GuardianIDNumber', "Guest"."GuardianIDNumber"
                        )
                    ) as guests
                `)
            )
            .where('Booking.CustomerID', customerId)
            .groupBy(
                'Booking.BookingID',
                'Room.RoomNumber',
                'RoomType.TypeName',
                'Account.FirstName',
                'Account.MiddleName',
                'Account.LastName',
                'Customer.CustomerID',
            )
            .orderBy('Booking.BookingDate', 'desc');

        return { success: true, data: bookings };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

module.exports = {
    getCustomerBookings
};