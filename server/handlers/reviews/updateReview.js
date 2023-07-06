const { MongoClient } = require("mongodb");
const { validateLocation } = require("../../helpers/constants");

const errorMessages = ["Review not found.", "Missing information."];

require("dotenv").config();

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

/**
 * updates/modifies a review
 * @param request
 * @param response
 */
const updateReview = async (request, response) => {
  const client = new MongoClient(MONGO_URI, options);
  const _id = request.params.reviewId;

  try {
    await client.connect();
    const db = client.db("Dev");

    // check if review exists
    const checkReview = await db.collection("reviews").findOne({ _id: _id });
    if (!checkReview) {
      response.status(404).json({
        status: 404,
        message: "Review not found.",
      });
      throw new Error("Review not found.");
    }

    const review = request.body;

    if (!review.text || !review.traits || !review.rating) {
      response.status(400).json({
        status: 400,
        message: "Missing information.",
      });
      throw new Error("Missing information.");
    }

    /**
     * {
     *      hair: {
     *          string thickness: fine, medium, coarse
     *          string color: none, light, medium, dark,
     *          string density: (low, medium, high)
     *      }
     *      skin : {
     *          string tone: 1 to 6,
     *          array- type: [normal, dry, aged, combination, sensitive, aging, acne-prone]
     *      }
     * }
     */

    const updatedReview = {
      text: review.text,
      rating: review.rating,
      traits: review.traits,
    };

    await db.collection("reviews").updateOne(
      { _id: _id },
      {
        $set: {
          ...updatedReview,
        },
      }
    );

    response.status(200).json({
      status: 200,
      message: "Updated review.",
      data: updatedReview,
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

module.exports = { updateReview };
