const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
const { validateLocation } = require("../../helpers/constants");

const errorMessages = [
  "Missing information.",
  "Invalid data.",
  "Item has already been added.",
];

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
("use strict");

/**
 * add new item to the website
 * @param request
 * @param response
 */
const addItem = async (request, response) => {
  const client = new MongoClient(MONGO_URI, options);
  const item = request.body;

  try {
    // check if missing field
    if (
      !item.name ||
      !item.category ||
      !item.location ||
      !item.imageSrc ||
      !item.description ||
      !item.skinType ||
      !item.care ||
      !item.frequency ||
      !item.url
    ) {
      response.status(400).json({
        status: 400,
        message: "Missing information.",
      });
      throw new Error("Missing information.");
    }

    // check if category is an array and if location and category matches the ones valid with the helper function
    if (!validateLocation(item.category, item.location)) {
      response.status(400).json({
        status: 400,
        message: "Invalid data.",
      });
      throw new Error("Invalid data.");
    }

    // information to add item
    const newItem = {
      _id: uuidv4(),
      name: item.name,
      category: item.category,
      location: item.location,
      imageSrc: item.imageSrc,
      description: item.description,
      skinType: item.skinType,
      care: item.care,
      frequency: item.frequency,
      url: item.url,
    };

    await client.connect();
    const db = client.db("Dev");

    const checkIfItem = await db
      .collection("items")
      .findOne({ name: item.name });
    // check if the item is already in the collection
    if (checkIfItem) {
      response.status(400).json({
        status: 400,
        message: "Item is already added.",
      });
      throw new Error("Item has already been added.");
    }

    const result = await db.collection("items").insertOne(newItem);

    response.status(200).json({
      status: 200,
      message: "New item added.",
      data: newItem,
    });
  } catch (error) {
    console.error(error);
    if (!errorMessages.includes(error.message)) {
      response.status(500).json({
        status: 500,
        message: "Server error",
      });
    }
  } finally {
    client.close();
  }
};

module.exports = { addItem };
