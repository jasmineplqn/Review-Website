const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const DB_NAME = "Dev";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
/**
 * retrieves all items from database
 * @param request
 * @param response
 */
const getAllItems = async (request, response) => {
  const client = new MongoClient(MONGO_URI, options);
  const { category, location } = request.query;

  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const itemsCollection = db.collection("items");

    // Fetch all items from the collection
    let items = await itemsCollection.find().toArray();

    // to get all items depending on the query
    if (category) {
      items = items.filter((item) => item.category.includes(category));
    }
    if (location) {
      items = items.filter((item) => item.location === location);
    }

    // Send the items as a JSON response.
    response.status(200).json({ status: 200, items });
  } catch (error) {
    console.error("An error occurred while retrieving the items:", error);
    response
      .status(500)
      .json({ status: 500, message: "Internal server error" });
  } finally {
    client.close();
  }
};

module.exports = { getAllItems };
