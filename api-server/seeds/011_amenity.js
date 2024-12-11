exports.seed = async function (knex) {
  await knex("Amenity").del();
  await knex("Amenity").insert([
    { AmenityID: 1, AmenityName: "Free Wi-Fi", AmenityPrice: 0.0 },
    { AmenityID: 2, AmenityName: "Swimming Pool", AmenityPrice: 20.0 },
    { AmenityID: 3, AmenityName: "Gym Access", AmenityPrice: 15.0 },
    { AmenityID: 4, AmenityName: "Breakfast Included", AmenityPrice: 10.0 },
    { AmenityID: 5, AmenityName: "Spa and Wellness Facilities", AmenityPrice: 25.0 }
  ]);
};
