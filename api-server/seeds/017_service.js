exports.seed = async function (knex) {
  await knex("Service").del();
  await knex("Service").insert([
    {
      ServiceID: 1,
      ServiceName: "Housekeeping",
      ServiceType: "Room Service",
      Unit: "Day",
      UnitPrice: 20.0,
      Description: "Daily cleaning and tidying of rooms."
    },
    {
      ServiceID: 2,
      ServiceName: "Laundry Services",
      ServiceType: "Laundry",
      Unit: "Service",
      UnitPrice: 15.0,
      Description: "Dry cleaning and laundry facilities for guests."
    },
    {
      ServiceID: 3,
      ServiceName: "Airport Shuttle",
      ServiceType: "Transportation",
      Unit: "Ride",
      UnitPrice: 25.0,
      Description: "Transportation to and from the airport."
    },
    {
      ServiceID: 4,
      ServiceName: "Wake-up Call",
      ServiceType: "Guest Service",
      Unit: "Call",
      UnitPrice: 5.0,
      Description: "A service to ensure guests are awake at their desired time."
    },
    {
      ServiceID: 5,
      ServiceName: "Pet-Friendly Services",
      ServiceType: "Guest Service",
      Unit: "Stay",
      UnitPrice: 30.0,
      Description: "Accommodations for guests traveling with pets."
    }
  ]);
};
