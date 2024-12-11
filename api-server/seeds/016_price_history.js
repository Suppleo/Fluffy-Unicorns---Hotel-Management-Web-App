exports.seed = async function (knex) {
  await knex("PriceHistory").del();
  await knex("PriceHistory").insert([
    {
      PriceHistoryID: 1,
      RoomTypeID: 1,
      Price: 100.0,
      EffectiveDate: "2024-12-01"
    },
    {
      PriceHistoryID: 2,
      RoomTypeID: 2,
      Price: 150.0,
      EffectiveDate: "2024-12-01"
    },
    {
      PriceHistoryID: 3,
      RoomTypeID: 3,
      Price: 120.0,
      EffectiveDate: "2024-12-01"
    },
    {
      PriceHistoryID: 4,
      RoomTypeID: 4,
      Price: 200.0,
      EffectiveDate: "2024-12-01"
    },
    {
      PriceHistoryID: 5,
      RoomTypeID: 5,
      Price: 250.0,
      EffectiveDate: "2024-12-01"
    },
    {
      PriceHistoryID: 6,
      RoomTypeID: 6,
      Price: 300.0,
      EffectiveDate: "2024-12-01"
    }
  ]);
};
