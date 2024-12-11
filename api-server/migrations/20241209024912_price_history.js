exports.up = function (knex) {
  return knex.schema.raw(`
    CREATE TABLE "PriceHistory" (
      "PriceHistoryID" SERIAL PRIMARY KEY,
      "RoomTypeID" INTEGER NOT NULL REFERENCES "RoomType"("RoomTypeID"),
      "Price" NUMERIC(10, 2) NOT NULL CHECK ("Price" > 0),
      "EffectiveDate" DATE NOT NULL CHECK ("EffectiveDate" <= CURRENT_DATE)
    );
  `);
};

exports.down = function (knex) {
  return knex.schema.raw('DROP TABLE "PriceHistory";');
};
