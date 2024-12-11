exports.up = function (knex) {
    return knex.schema.raw(`
      CREATE TABLE "ReceptionistLanguages" (
        "ReceptionistID" INTEGER NOT NULL REFERENCES "Receptionist"("ReceptionistID"),
        "Language" VARCHAR(50) NOT NULL,
        PRIMARY KEY ("ReceptionistID", "Language")
      );
    `);
  };
  
  exports.down = function (knex) {
    return knex.schema.raw('DROP TABLE "ReceptionistLanguages";');
  };
  