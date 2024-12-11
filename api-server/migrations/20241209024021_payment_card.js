exports.up = function (knex) {
  return knex.schema.raw(`
    CREATE TABLE "PaymentCard" (
      "CardID" SERIAL PRIMARY KEY,
      "CustomerID" INTEGER NOT NULL REFERENCES "Customer"("CustomerID"),
      "EncryptedCardNumber" TEXT NOT NULL UNIQUE,
      "BankName" VARCHAR(50) NOT NULL,
      "ExpiryDate" DATE NOT NULL CHECK ("ExpiryDate" > CURRENT_DATE)
    );
  `);
};

exports.down = function (knex) {
  return knex.schema.raw('DROP TABLE "PaymentCard";');
};
