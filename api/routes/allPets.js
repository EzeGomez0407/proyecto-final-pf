const { Router } = require("express");
const allPets = Router();

allPets.get("/", async (req, res) => {
  try {
    let pets = await Pet.find();
    res.status(200).send(pets);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = allPets;
