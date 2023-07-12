const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const DB_NAME = "Dev";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
/**
 * retrieves all reviews from database
 * @param request
 * @param response
 */
const getReviews = async (request, response) => {
  const client = new MongoClient(MONGO_URI, options);
  const { itemId, userId } = request.query;

  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const reviewsCollection = db.collection("reviews");

    // Fetch all reviews from the collection
    let reviews = await reviewsCollection.find().toArray();

    // to get all reviews depending on the query
    if (userId) {
      reviews = reviews.filter((review) => review.userId === userId);
    }
    if (itemId) {
      reviews = reviews.filter((review) => review.itemId === itemId);
    }

    // Send the reviews as a JSON response.
    response.status(200).json({ status: 200, reviews });
  } catch (error) {
    console.error("An error occurred while retrieving the reviews:", error);
    response
      .status(500)
      .json({ status: 500, message: "Internal server error" });
  } finally {
    client.close();
  }
};

module.exports = { getReviews };
