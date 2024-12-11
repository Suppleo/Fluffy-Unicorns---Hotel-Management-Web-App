exports.seed = async function (knex) {
  await knex("ServiceUsage").del();
  await knex("ServiceUsage").insert([
    {
      ServiceUsageID: 1,
      BookingDetailID: 1, // Booking 1, Room 101
      ServiceID: 1, // Housekeeping
      Amount: 1,
      UsageDate: "2024-12-10"
    },
    {
      ServiceUsageID: 2,
      BookingDetailID: 2, // Booking 1, Room 102
      ServiceID: 2, // Laundry Services
      Amount: 2,
      UsageDate: "2024-12-11"
    },
    {
      ServiceUsageID: 3,
      BookingDetailID: 3, // Booking 2, Room 201
      ServiceID: 3, // Airport Shuttle
      Amount: 1,
      UsageDate: "2024-12-12"
    },
    {
      ServiceUsageID: 4,
      BookingDetailID: 4, // Booking 2, Room 202
      ServiceID: 4, // Wake-up Call
      Amount: 1,
      UsageDate: "2024-12-13"
    },
    {
      ServiceUsageID: 5,
      BookingDetailID: 5, // Booking 3, Room 301
      ServiceID: 5, // Pet-Friendly Services
      Amount: 1,
      UsageDate: "2024-12-14"
    }
  ]);
};
