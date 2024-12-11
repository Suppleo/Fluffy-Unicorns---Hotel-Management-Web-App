exports.seed = async function (knex) {
  await knex("RoomTypeImages").del();
  await knex("RoomTypeImages").insert([
    { RoomTypeID: 1, ImageID: "image1_single" },
    { RoomTypeID: 1, ImageID: "image2_single" },
    { RoomTypeID: 2, ImageID: "image1_double" },
    { RoomTypeID: 2, ImageID: "image2_double" },
    { RoomTypeID: 3, ImageID: "image1_twin" },
    { RoomTypeID: 3, ImageID: "image2_twin" },
    { RoomTypeID: 4, ImageID: "image1_king" },
    { RoomTypeID: 4, ImageID: "image2_king" },
    { RoomTypeID: 5, ImageID: "image1_family" },
    { RoomTypeID: 5, ImageID: "image2_family" },
    { RoomTypeID: 6, ImageID: "image1_deluxe" },
    { RoomTypeID: 6, ImageID: "image2_deluxe" }
  ]);
};
