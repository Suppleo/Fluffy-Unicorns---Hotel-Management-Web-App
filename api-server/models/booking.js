// test/api-server/models/booking.js
const { getKnex } = require('./db.js');
const { rowFilter } = require('./security/row.js');
const { columnFilter } = require('./security/column.js');

const getBookingDetails = async (context, bookingId) => {
    const knex = getKnex();
    
    try {
        let query = knex('booking').where({ booking_id: bookingId });
        query = rowFilter(query, "getBookingDetails", "booking", context);

        const booking = await query.first();

        if (!booking) {
            return {
                success: false,
                message: 'Booking not found or you do not have permission to view it'
            };
        }

        // Fetch booking details
        const bookingDetails = await knex('booking_detail')
            .where({ booking_id: bookingId });

        return {
            success: true,
            data: {
                ...booking,
                details: bookingDetails
            }
        };
    } catch (error) {
        console.error('Error in getBookingDetails:', error);
        return {
            success: false,
            message: 'Failed to retrieve booking details'
        };
    }
};

const createBooking = async (context, bookingData) => {
    const knex = getKnex();
    
    try {
        const result = await knex.transaction(async (trx) => {
            // Apply row-level security
            let query = trx('booking');
            query = rowFilter(query, "createBooking", "booking", context);

            // Insert main booking
            const [bookingIdObj] = await query.insert({
                username: context.username,
                booking_date: new Date(),
                checkin_date: bookingData.checkin_date,
                checkout_date: bookingData.checkout_date,
                total_price: bookingData.total_price
            }).returning('booking_id');

            // Extract the actual booking_id value
            const bookingId = bookingIdObj.booking_id;

            // Insert booking details
            const bookingDetails = bookingData.rooms.map(room => ({
                booking_id: bookingId,
                room_id: room.room_id,
                price_per_day: room.price_per_day,
                total_price: room.total_price
            }));

            await trx('booking_detail').insert(bookingDetails);

            return bookingId;
        });

        return {
            success: true,
            data: { booking_id: result }
        };
    } catch (error) {
        console.error('Error in createBooking:', error);
        return {
            success: false,
            message: 'Failed to create booking'
        };
    }
};

const updateBooking = async (context, bookingId, updateData) => {
    const knex = getKnex();
    
    try {
        // Apply column-level security
        const allowedColumns = columnFilter("booking", context.role, "update");
        const filteredUpdateData = Object.keys(updateData)
            .filter(key => allowedColumns.includes(key))
            .reduce((obj, key) => {
                obj[key] = updateData[key];
                return obj;
            }, {});

        // If no allowed columns to update, return early
        if (Object.keys(filteredUpdateData).length === 0) {
            return {
                success: false,
                message: 'No allowed fields to update'
            };
        }

        // Apply row-level security and update
        let query = knex('booking').where({ booking_id: bookingId });
        query = rowFilter(query, "updateBooking", "booking", context);

        const updatedRows = await query.update(filteredUpdateData);

        if (updatedRows === 0) {
            return {
                success: false,
                message: 'Booking not found or you do not have permission to update it'
            };
        }

        return {
            success: true,
            data: { booking_id: bookingId }
        };
    } catch (error) {
        console.error('Error in updateBooking:', error);
        return {
            success: false,
            message: 'Failed to update booking'
        };
    }
};

const updateBookingDetail = async (context, detailId, bookingId, username, updateData) => {
    const knex = getKnex();
    
    try {
        // Apply row-level security
        let query = knex('booking').where({ booking_id: bookingId });
        query = rowFilter(query, "updateBookingDetail", "booking", context);

        const booking = await query.first();

        if (!booking) {
            return {
                success: false,
                message: 'Booking not found or you do not have permission to update it'
            };
        }

        // Update the booking detail
        // Note: We're using room_id instead of id for the booking_detail table
        const updatedRows = await knex('booking_detail')
            .where({ room_id: detailId, booking_id: bookingId })
            .update(updateData);

        if (updatedRows === 0) {
            return {
                success: false,
                message: 'Booking detail not found or not associated with the specified booking'
            };
        }

        return {
            success: true,
            data: { room_id: detailId }
        };
    } catch (error) {
        console.error('Error in updateBookingDetail:', error);
        return {
            success: false,
            message: 'Failed to update booking detail'
        };
    }
};

const deleteBookingDetail = async (context, detailId) => {
    const knex = getKnex();
    
    try {
        // Start a transaction
        const result = await knex.transaction(async (trx) => {
            // Get the booking detail
            const bookingDetail = await trx('booking_detail')
                .where({ booking_detail_id: detailId })
                .first();

            if (!bookingDetail) {
                throw new Error('Booking detail not found');
            }

            // Get the associated booking
            let query = trx('booking').where({ booking_id: bookingDetail.booking_id });
            query = rowFilter(query, "deleteBookingDetail", "booking", context);

            const booking = await query.first();

            if (!booking) {
                throw new Error('You do not have permission to delete this booking detail');
            }

            // Delete the booking detail
            const deletedRows = await trx('booking_detail')
                .where({ booking_detail_id: detailId })
                .del();

            if (deletedRows === 0) {
                throw new Error('Failed to delete booking detail');
            }

            // Update the total price of the booking
            await trx('booking')
                .where({ booking_id: bookingDetail.booking_id })
                .decrement('total_price', bookingDetail.total_price);

            return { success: true };
        });

        return result;
    } catch (error) {
        console.error('Error in deleteBookingDetail:', error);
        return {
            success: false,
            code: error.message.includes('not found') ? 404 : 400,
            message: error.message
        };
    }
};

const deleteBooking = async (context, bookingId) => {
    const knex = getKnex();
    
    try {
        // Start a transaction
        const result = await knex.transaction(async (trx) => {
            // Get the booking
            let query = trx('booking').where({ booking_id: bookingId });
            query = rowFilter(query, "deleteBooking", "booking", context);

            const booking = await query.first();

            if (!booking) {
                throw new Error('Booking not found or you do not have permission to delete it');
            }

            // Delete associated booking details
            await trx('booking_detail')
                .where({ booking_id: bookingId })
                .del();

            // Delete the booking
            const deletedRows = await trx('booking')
                .where({ booking_id: bookingId })
                .del();

            if (deletedRows === 0) {
                throw new Error('Failed to delete booking');
            }

            return { success: true };
        });

        return result;
    } catch (error) {
        console.error('Error in deleteBooking:', error);
        return {
            success: false,
            code: error.message.includes('not found') ? 404 : 400,
            message: error.message
        };
    }
};

module.exports = {
    getBookingDetails,
    createBooking,
    updateBooking,
    updateBookingDetail,
    deleteBookingDetail,
    deleteBooking
};