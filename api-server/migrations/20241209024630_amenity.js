exports.up = function (knex) {
  return knex.schema.raw(`
    CREATE TABLE "Amenity" (
      "AmenityID" SERIAL PRIMARY KEY,
      "AmenityName" VARCHAR(50) NOT NULL,
      "AmenityPrice" NUMERIC(10, 2) DEFAULT 0 CHECK ("AmenityPrice" >= 0)
    );
  `);
};

exports.down = function (knex) {
  return knex.schema.raw('DROP TABLE "Amenity";');
};
