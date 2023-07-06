const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
const { validateLocation } = require("../../helpers/constants");

const errorMessages = [
  "Missing information.",
  "Invalid data.",
  "Submission already made.",
];

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
("use strict");

/**
 * make a new submission
 * @param request
 * @param response
 */
const addSubmission = async (request, response) => {
  const client = new MongoClient(MONGO_URI, options);
  const submission = request.body;

  try {
    // check if missing field
    if (
      !submission.userId ||
      !submission.name ||
      !submission.category ||
      !submission.location ||
      !submission.imageSrc ||
      !submission.description ||
      !submission.skinType ||
      !submission.care ||
      !submission.frequency ||
      !submission.url
    ) {
      response.status(400).json({
        status: 400,
        message: "Missing information.",
      });
      throw new Error("Missing information.");
    }

    // check if category is an array and if location and category matches the ones valid with the helper function
    if (!validateLocation(submission.category, submission.location)) {
      response.status(400).json({
        status: 400,
        message: "Invalid data.",
      });
      throw new Error("Invalid data.");
    }

    // information to add submission
    const newSubmission = {
      _id: uuidv4(),
      userId: submission.userId,
      name: submission.name,
      category: submission.category,
      location: submission.location,
      imageSrc: submission.imageSrc,
      description: submission.description,
      skinType: submission.skinType,
      care: submission.care,
      frequency: submission.frequency,
      url: submission.url,
    };

    await client.connect();
    const db = client.db("Dev");

    const checkIfSubmission = await db
      .collection("submissions")
      .findOne({ name: submission.name });
    // check if the submission is already in the collection
    if (checkIfSubmission) {
      response.status(400).json({
        status: 400,
        message: "Submission already made.",
      });
      throw new Error("Submission already made.");
    }

    const result = await db.collection("submissions").insertOne(newSubmission);

    response.status(200).json({
      status: 200,
      message: "New submission added.",
      data: newSubmission,
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

module.exports = { addSubmission };
