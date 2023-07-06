const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const errorMessages = ["Review not found."];

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

/**
 * Deletes a review
 * @param request
 * @param response
 */
const deleteReview = async (request, response) => {
  const client = new MongoClient(MONGO_URI, options);
  const reviewId = request.params.reviewId;

  try {
    await client.connect();
    const db = client.db("Dev");

    // check if review exists
    const review = await db.collection("reviews").findOne({ _id: reviewId });
    if (!review) {
      response.status(404).json({
        status: 404,
        message: "Review not found.",
      });
      throw new Error("Review not found.");
    }

    // Remove review from users
    await db.collection("users").updateOne(
      { _id: review.userId },
      {
        $pull: {
          reviews: reviewId,
        },
      }
    );

    // Deletes the review
    await db.collection("reviews").deleteOne({ _id: reviewId });

    response.status(200).json({
      status: 200,
      message: "Review deleted.",
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

module.exports = { deleteReview };
