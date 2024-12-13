exports.seed = async function (knex) {
  await knex("Amenity").del();
  await knex("Amenity").insert([
    { AmenityID: 1, AmenityName: "Free Wi-Fi" },
    { AmenityID: 2, AmenityName: "Mini-bar / Fridge" },
    { AmenityID: 3, AmenityName: "Hairdryer" },
    { AmenityID: 4, AmenityName: "Bathtub" }
  ]);
};
