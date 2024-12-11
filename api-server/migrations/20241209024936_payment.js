exports.up = function (knex) {
  return knex.schema.raw(`
    CREATE TABLE "Payment" (
      "PaymentID" SERIAL PRIMARY KEY,
      "BookingID" INTEGER NOT NULL REFERENCES "Booking"("BookingID"),
      "Amount" NUMERIC(10, 2) NOT NULL CHECK ("Amount" > 0),
      "PaymentMethod" VARCHAR(20) NOT NULL CHECK ("PaymentMethod" IN ('Credit Card', 'Cash', 'Bank Transfer')),
      "TransactionNumber" VARCHAR(50),
      "PaymentDate" DATE NOT NULL
    );
  `);
};

exports.down = function (knex) {
  return knex.schema.raw('DROP TABLE "Payment";');
};
