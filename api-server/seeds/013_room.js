exports.seed = async function (knex) {
  await knex("Room").del();
  await knex("Room").insert([
    { RoomID: 1, RoomTypeID: 1, RoomNumber: "101", Status: "Available" },
    { RoomID: 2, RoomTypeID: 1, RoomNumber: "102", Status: "Available" },
    { RoomID: 3, RoomTypeID: 2, RoomNumber: "201", Status: "Booked" },
    { RoomID: 4, RoomTypeID: 2, RoomNumber: "202", Status: "Maintenance" },
    { RoomID: 5, RoomTypeID: 3, RoomNumber: "301", Status: "Available" },
    { RoomID: 6, RoomTypeID: 3, RoomNumber: "302", Status: "Booked" },
    { RoomID: 7, RoomTypeID: 4, RoomNumber: "401", Status: "Available" },
    { RoomID: 8, RoomTypeID: 4, RoomNumber: "402", Status: "Maintenance" },
    { RoomID: 9, RoomTypeID: 5, RoomNumber: "501", Status: "Available" },
    { RoomID: 10, RoomTypeID: 5, RoomNumber: "502", Status: "Booked" },
    { RoomID: 11, RoomTypeID: 6, RoomNumber: "601", Status: "Available" },
    { RoomID: 12, RoomTypeID: 6, RoomNumber: "602", Status: "Booked" }
  ]);
};
