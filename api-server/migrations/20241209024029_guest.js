exports.up = function (knex) {
  return knex.schema.raw(`
    CREATE TABLE "Guest" (
      "GuestID" SERIAL PRIMARY KEY,
      "CustomerID" INTEGER REFERENCES "Customer"("CustomerID"),
      "FirstName" VARCHAR(50) NOT NULL,
      "MiddleName" VARCHAR(50),
      "LastName" VARCHAR(50) NOT NULL,
      "DateOfBirth" DATE NOT NULL CHECK ("DateOfBirth" <= CURRENT_DATE),
      "IDNumber" CHAR(15) NOT NULL UNIQUE,
      "GuardianIDNumber" CHAR(15) CHECK (
        "DateOfBirth" <= CURRENT_DATE - INTERVAL '18 years' OR "GuardianIDNumber" IS NOT NULL
      )
    );
  `);
};

exports.down = function (knex) {
  return knex.schema.raw('DROP TABLE "Guest";');
};
