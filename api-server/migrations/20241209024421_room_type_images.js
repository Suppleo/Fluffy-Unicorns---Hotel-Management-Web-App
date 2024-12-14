exports.up = function (knex) {
  return knex.schema.raw(`
    CREATE TABLE "RoomTypeImages" (
      "RoomTypeID" INTEGER REFERENCES "RoomType"("RoomTypeID"),
      "ImageID" VARCHAR(50),
      PRIMARY KEY ("RoomTypeID", "ImageID")
    );
  `);
};

exports.down = function (knex) {
  return knex.schema.raw('DROP TABLE "RoomTypeImages";');
};
  