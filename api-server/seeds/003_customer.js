exports.seed = async function (knex) {
  await knex("Customer").del();
  await knex("Customer").insert([
    { CustomerID: 1, AccountID: 5, RewardPoints: 150 },
    { CustomerID: 2, AccountID: 6, RewardPoints: 100 },
    { CustomerID: 3, AccountID: 7, RewardPoints: 200 }
  ]);
};
