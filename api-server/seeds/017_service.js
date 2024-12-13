exports.seed = async function (knex) {
  await knex("Service").del();
  await knex("Service").insert([
    {
      ServiceID: 1,
      ServiceName: "Laundry",
      ServiceType: "Laundry",
      Unit: "Load",
      UnitPrice: 25.0,
      Description: "Professional laundry and dry cleaning service"
    },
    {
      ServiceID: 2,
      ServiceName: "In-room dining",
      ServiceType: "Food Service",
      Unit: "Order",
      UnitPrice: 35.0,
      Description: "24/7 room service dining"
    },
    {
      ServiceID: 3,
      ServiceName: "Spa treatments",
      ServiceType: "Wellness",
      Unit: "Session",
      UnitPrice: 80.0,
      Description: "Massage and spa therapy services"
    },
    {
      ServiceID: 4,
      ServiceName: "Airport shuttle",
      ServiceType: "Transportation",
      Unit: "Trip",
      UnitPrice: 30.0,
      Description: "Round-trip airport transfer service"
    },
    {
      ServiceID: 5,
      ServiceName: "Bike Rentals",
      ServiceType: "Recreation",
      Unit: "Day",
      UnitPrice: 15.0,
      Description: "City bikes available for guest use"
    }
  ]);
};
