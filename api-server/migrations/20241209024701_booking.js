exports.up = function (knex) {
  return knex.schema.raw(`
    CREATE TABLE "Booking" (
      "BookingID" SERIAL PRIMARY KEY,
      "CustomerID" INTEGER NOT NULL REFERENCES "Customer"("CustomerID"),
      "EmployeeID" INTEGER NOT NULL REFERENCES "Employee"("EmployeeID"),
      "BookingDate" DATE NOT NULL,
      "CheckInDate" DATE NOT NULL CHECK ("CheckInDate" <= "CheckOutDate"),
      "CheckOutDate" DATE NOT NULL,
      "TotalAmount" NUMERIC(10, 2) DEFAULT 0 CHECK ("TotalAmount" >= 0),
      "Status" VARCHAR(15) NOT NULL CHECK ("Status" IN ('Confirmed', 'Cancelled', 'Completed')),
      "PaymentStatus" VARCHAR(10) NOT NULL CHECK ("PaymentStatus" IN ('Paid', 'Unpaid'))
    );
  `);
};

exports.down = function (knex) {
  return knex.schema.raw('DROP TABLE "Booking";');
};
