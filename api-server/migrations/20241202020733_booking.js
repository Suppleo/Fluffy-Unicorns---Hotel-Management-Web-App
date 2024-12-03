exports.up = async function(knex) {
    await knex.raw(`
        CREATE TABLE booking(
            booking_id int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,   
            username text,
            booking_date timestamp,
            checkin_date timestamp,
            checkout_date timestamp,
            total_price int
        );
        COMMENT ON TABLE booking IS 'Thông tin đặt phòng';
        COMMENT ON COLUMN booking.username IS 'Tên người đặt';
        COMMENT ON COLUMN booking.booking_date IS 'Ngày đặt phòng';
        COMMENT ON COLUMN booking.checkin_date IS 'Ngày nhận phòng';
        COMMENT ON COLUMN booking.checkout_date IS 'Ngày trả phòng';
        COMMENT ON COLUMN booking.total_price IS 'Tổng tiền dự kiến';
    `);
};

exports.down = async function(knex) {
    await knex.raw(`
        DROP TABLE booking;
    `);
};