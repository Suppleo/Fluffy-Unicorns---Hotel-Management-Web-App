exports.up = function (knex) {
  return knex.schema.raw(`
    CREATE TABLE "Account" (
      "AccountID" SERIAL PRIMARY KEY,
      "FirstName" VARCHAR(50) NOT NULL,
      "MiddleName" VARCHAR(50),
      "LastName" VARCHAR(50) NOT NULL,
      "Username" VARCHAR(50) NOT NULL UNIQUE CHECK (LENGTH("Username") >= 5),
      "Password" TEXT NOT NULL,
      "Status" VARCHAR(10) NOT NULL CHECK ("Status" IN ('Active', 'Locked')),
      "DateOfBirth" DATE CHECK ("DateOfBirth" <= CURRENT_DATE),
      "Gender" CHAR(1) CHECK ("Gender" IN ('M', 'F', 'O')),
      "Email" VARCHAR(100) NOT NULL UNIQUE CHECK ("Email" ~ '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'),
      "Phone" VARCHAR(15) CHECK ("Phone" ~ '[0-9]+'),
      "Address" TEXT,
      "IDNumber" CHAR(15) UNIQUE,
      "Role" VARCHAR(20) NOT NULL
    );
  `);
};

exports.down = function (knex) {
  return knex.schema.raw('DROP TABLE "Account";');
};
