exports.up = function (knex) {
    return knex.schema.raw(`
      CREATE TABLE "RoomType" (
        "RoomTypeID" SERIAL PRIMARY KEY,
        "TypeName" VARCHAR(50) NOT NULL,
        "BasePrice" NUMERIC(10, 2) NOT NULL CHECK ("BasePrice" > 0),
        "MaxOccupancy" INTEGER NOT NULL CHECK ("MaxOccupancy" > 0),
        "Area" NUMERIC(10, 2) NOT NULL
      );
    `);
  };
  
  exports.down = function (knex) {
    return knex.schema.raw('DROP TABLE "RoomType";');
  };
  