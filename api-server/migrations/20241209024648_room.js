exports.up = function (knex) {
  return knex.schema.raw(`
    CREATE TABLE "Room" (
      "RoomID" SERIAL PRIMARY KEY,
      "RoomTypeID" INTEGER NOT NULL REFERENCES "RoomType"("RoomTypeID"),
      "RoomNumber" VARCHAR(10) NOT NULL UNIQUE,
      "Status" VARCHAR(15) NOT NULL CHECK ("Status" IN ('Available', 'Booked', 'Maintenance'))
    );
  `);
};

exports.down = function (knex) {
  return knex.schema.raw('DROP TABLE "Room";');
};
