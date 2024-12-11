exports.seed = async function (knex) {
  await knex("RoomTypeAmenities").del();
  await knex("RoomTypeAmenities").insert([
    { RoomTypeID: 1, AmenityID: 1 },
    { RoomTypeID: 1, AmenityID: 4 },
    { RoomTypeID: 2, AmenityID: 1 },
    { RoomTypeID: 2, AmenityID: 2 },
    { RoomTypeID: 3, AmenityID: 1 },
    { RoomTypeID: 3, AmenityID: 3 },
    { RoomTypeID: 4, AmenityID: 2 },
    { RoomTypeID: 4, AmenityID: 4 },
    { RoomTypeID: 5, AmenityID: 5 },
    { RoomTypeID: 5, AmenityID: 3 },
    { RoomTypeID: 6, AmenityID: 1 },
    { RoomTypeID: 6, AmenityID: 5 }
  ]);
};
