exports.seed = async function (knex) {
  await knex("Room").del();
  await knex("Room").insert([
    {RoomTypeID: 1, RoomNumber: "101", Status: "Available" },
    {RoomTypeID: 1, RoomNumber: "102", Status: "Available" },
    {RoomTypeID: 2, RoomNumber: "201", Status: "Booked" },
    {RoomTypeID: 2, RoomNumber: "202", Status: "Maintenance" },
    {RoomTypeID: 3, RoomNumber: "301", Status: "Available" },
    {RoomTypeID: 3, RoomNumber: "302", Status: "Booked" },
    {RoomTypeID: 4, RoomNumber: "401", Status: "Available" },
    {RoomTypeID: 4, RoomNumber: "402", Status: "Maintenance" },
    {RoomTypeID: 5, RoomNumber: "501", Status: "Available" },
    {RoomTypeID: 5, RoomNumber: "502", Status: "Booked" },
    {RoomTypeID: 6, RoomNumber: "601", Status: "Available" },
    {RoomTypeID: 6, RoomNumber: "602", Status: "Booked" }
  ]);
};
