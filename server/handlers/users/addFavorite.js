const { MongoClient } = require("mongodb");

const errorMessages = ["User not found.", "Item not found."];

require("dotenv").config();

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

/**
 * adds and removes item to favorites.
 * @param request
 * @param response
 */
const addFavorite = async (request, response) => {
  const client = new MongoClient(MONGO_URI, options);
  const userId = request.params.userId;
  const itemId = request.params.itemId;

  try {
    await client.connect();
    const db = client.db("Dev");

    // check if user exists
    const user = await db.collection("users").findOne({ _id: userId });
    if (!user) {
      response.status(404).json({
        status: 404,
        message: "User not found.",
      });
      throw new Error("User not found.");
    }

    // check if item exists
    const checkItem = await db.collection("items").findOne({ _id: itemId });
    if (!checkItem) {
      response.status(404).json({
        status: 404,
        message: "Item not found.",
      });
      throw new Error("Item not found.");
    }

    // adding and removing from favorites
    if (!user.favorites.includes(itemId)) {
      await db.collection("users").updateOne(
        { _id: userId },
        {
          $push: {
            favorites: itemId,
          },
        }
      );

      user.favorites.push(itemId);

      response.status(200).json({
        status: 200,
        message: "Successfully added item to favorites",
        data: user,
      });
    } else {
      await db.collection("users").updateOne(
        { _id: userId },
        {
          $pull: {
            favorites: itemId,
          },
        }
      );

      user.favorites.splice(user.favorites.indexOf(itemId), 1);

      response.status(200).json({
        status: 200,
        message: "Successfully removed from favorites",
        data: user,
      });
    }
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

module.exports = { addFavorite };
