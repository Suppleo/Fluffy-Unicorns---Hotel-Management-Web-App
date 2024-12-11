exports.up = function (knex) {
    return knex.schema.raw(`
      CREATE TABLE "RoomTypeImages" (
        "RoomTypeID" INTEGER NOT NULL REFERENCES "RoomType"("RoomTypeID"),
        "ImageID" VARCHAR(50) NOT NULL,
        PRIMARY KEY ("RoomTypeID", "ImageID")
      );
    `);
  };
  
  exports.down = function (knex) {
    return knex.schema.raw('DROP TABLE "RoomTypeImages";');
  };
  