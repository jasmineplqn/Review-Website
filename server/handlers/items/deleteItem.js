const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const errorMessages = ["Item not found."];

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

/**
 * Deletes an item
 * @param request
 * @param response
 */
const deleteItem = async (request, response) => {
  const client = new MongoClient(MONGO_URI, options);
  const itemId = request.params.itemId;

  try {
    await client.connect();
    const db = client.db("Dev");

    // check if item exists
    const checkItem = await db.collection("items").findOne({ _id: itemId });
    if (!checkItem) {
      response.status(404).json({
        status: 404,
        message: "Item not found.",
      });
      throw new Error("Item not found.");
    }

    // Deletes the item
    await db.collection("items").deleteOne({ _id: itemId });

    response.status(200).json({
      status: 200,
      message: "Item deleted.",
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

module.exports = { deleteItem };
