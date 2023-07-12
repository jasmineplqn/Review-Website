const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const DB_NAME = "Dev";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
/**
 * retrieves review from database
 * @param request
 * @param response
 */
const getReview = async (request, response) => {
  const client = new MongoClient(MONGO_URI, options);
  const reviewId = request.params.reviewId;

  try {
    await client.connect();
    const db = client.db("Dev");

    const result = await db.collection("reviews").findOne({ _id: reviewId });
    result
      ? response.status(200).json({
          status: 200,
          data: result,
          message: "Review details",
        })
      : response.status(404).json({ status: 404, message: "Not Found" });
  } catch (error) {
    console.error("An error occurred while retrieving the reviews:", error);
    response
      .status(500)
      .json({ status: 500, message: "Internal server error" });
  } finally {
    client.close();
  }
};

module.exports = { getReview };
