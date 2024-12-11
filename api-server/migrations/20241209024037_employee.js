exports.up = function (knex) {
  return knex.schema.raw(`
    CREATE TABLE "Employee" (
      "EmployeeID" SERIAL PRIMARY KEY,
      "AccountID" INTEGER NOT NULL REFERENCES "Account"("AccountID"),
      "HireDate" DATE NOT NULL,
      "Salary" NUMERIC(10, 2) NOT NULL CHECK ("Salary" > 0)
    );
  `);
};

exports.down = function (knex) {
  return knex.schema.raw('DROP TABLE "Employee";');
};
