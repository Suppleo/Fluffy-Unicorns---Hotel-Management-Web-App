exports.up = function (knex) {
    return knex.schema.raw(`
      CREATE TABLE "Receptionist" (
        "ReceptionistID" INTEGER PRIMARY KEY REFERENCES "Employee"("EmployeeID"),
        "ManagerID" INTEGER NOT NULL REFERENCES "Manager"("ManagerID")
      );
    `);
  };
  
  exports.down = function (knex) {
    return knex.schema.raw('DROP TABLE "Receptionist";');
  };
  