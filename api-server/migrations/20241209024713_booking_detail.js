exports.up = function (knex) {
  return knex.schema.raw(`
    CREATE TABLE "BookingDetail" (
      "BookingDetailID" SERIAL PRIMARY KEY,
      "BookingID" INTEGER NOT NULL REFERENCES "Booking"("BookingID"),
      "RoomID" INTEGER NOT NULL REFERENCES "Room"("RoomID"),
      "GuestID" INTEGER NOT NULL REFERENCES "Guest"("GuestID")
    );
  `);
};

exports.down = function (knex) {
  return knex.schema.raw('DROP TABLE "BookingDetail";');
};
