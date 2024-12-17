exports.seed = async function (knex) {
  await knex("RoomTypeImages").del();
  await knex("RoomTypeImages").insert([
    { RoomTypeID: 1, ImagePath: "image1_single" },
    { RoomTypeID: 1, ImagePath: "image2_single" },
    { RoomTypeID: 2, ImagePath: "image1_double" },
    { RoomTypeID: 2, ImagePath: "image2_double" },
    { RoomTypeID: 3, ImagePath: "image1_twin" },
    { RoomTypeID: 3, ImagePath: "image2_twin" },
    { RoomTypeID: 4, ImagePath: "image1_king" },
    { RoomTypeID: 4, ImagePath: "image2_king" },
    { RoomTypeID: 5, ImagePath: "image1_family" },
    { RoomTypeID: 5, ImagePath: "image2_family" },
    { RoomTypeID: 6, ImagePath: "image1_deluxe" },
    { RoomTypeID: 6, ImagePath: "image2_deluxe" }
  ]);
};
