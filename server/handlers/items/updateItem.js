const { MongoClient } = require("mongodb");
const { validateLocation } = require("../../helpers/constants");

const errorMessages = [
  "Cannot change the id.",
  "Item not found.",
  "Missing information.",
  "Invalid data.",
];

require("dotenv").config();

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

/**
 * updates/modifies an item and can also overwrite it
 * @param request
 * @param response
 */
const updateItem = async (request, response) => {
  const client = new MongoClient(MONGO_URI, options);
  const _id = request.params.itemId;

  try {
    await client.connect();
    const db = client.db("Dev");

    // check if item exists
    const checkItem = await db.collection("items").findOne({ _id: _id });
    if (!checkItem) {
      response.status(404).json({
        status: 404,
        message: "Item not found.",
      });
      throw new Error("Item not found.");
    }

    const item = request.body;

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
    const updatedItem = {
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

    await db.collection("items").updateOne(
      { _id: _id },
      {
        $set: {
          ...updatedItem,
        },
      }
    );

    response.status(200).json({
      status: 200,
      message: "Updated item.",
      data: updatedItem,
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

module.exports = { updateItem };
