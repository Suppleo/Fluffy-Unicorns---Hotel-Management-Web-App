exports.up = function (knex) {
  return knex.schema.raw(`
    CREATE TABLE "Shift" (
      "ShiftID" SERIAL PRIMARY KEY,
      "EmployeeID" INTEGER NOT NULL REFERENCES "Employee"("EmployeeID"),
      "StartTime" TIMESTAMP NOT NULL,
      "EndTime" TIMESTAMP NOT NULL CHECK ("StartTime" < "EndTime")
    );
  `);
};

exports.down = function (knex) {
  return knex.schema.raw('DROP TABLE "Shift";');
};
