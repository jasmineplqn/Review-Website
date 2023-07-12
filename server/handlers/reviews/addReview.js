const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");

const errorMessages = [
  "Missing information.",
  "User not found.",
  "Item not found.",
];

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
("use strict");

/**
 * adds a new review.
 * @param request
 * @param response
 */
const addReview = async (request, response) => {
  const client = new MongoClient(MONGO_URI, options);
  const review = request.body;

  try {
    // check if missing field
    if (
      !review.userId ||
      !review.itemId ||
      !review.text ||
      !review.client ||
      !review.rating ||
      !review.traits
    ) {
      response.status(400).json({
        status: 400,
        message: "Missing information.",
      });
      throw new Error("Missing information.");
    }

    // information to add user
    const newReview = {
      _id: uuidv4(),
      userId: review.userId,
      itemId: review.itemId,
      rating: review.rating,
      client: review.client,
      text: review.text,
      traits: review.traits,
    };

    await client.connect();
    const db = client.db("Dev");

    // check if user exists
    const user = await db.collection("users").findOne({ _id: review.userId });
    if (!user) {
      response.status(404).json({
        status: 404,
        message: "User not found.",
      });
      throw new Error("User not found.");
    }

    // check if item exists
    const checkItem = await db
      .collection("items")
      .findOne({ _id: review.itemId });
    if (!checkItem) {
      response.status(404).json({
        status: 404,
        message: "Item not found.",
      });
      throw new Error("Item not found.");
    }

    const result = await db.collection("reviews").insertOne(newReview);

    // Add review to users
    await db.collection("users").updateOne(
      { _id: review.userId },
      {
        $push: {
          reviews: newReview._id,
        },
      }
    );

    response.status(200).json({
      status: 200,
      message: "New review added.",
      data: newReview,
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

module.exports = { addReview };
