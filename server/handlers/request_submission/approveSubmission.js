const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();
const { MONGO_URI } = process.env;

const errorMessages = ["Submission not found."];

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

/**
 * Aprovves a submission
 * @param request
 * @param response
 */
const approveSubmission = async (request, response) => {
  const client = new MongoClient(MONGO_URI, options);
  const submissionId = request.params.submissionId;

  try {
    await client.connect();
    const db = client.db("Dev");

    // check if submission exists
    const submission = await db
      .collection("submissions")
      .findOne({ _id: submissionId });
    if (!submission) {
      response.status(404).json({
        status: 404,
        message: "Submission not found.",
      });
      throw new Error("Submission not found.");
    }

    const checkIfItem = await db
      .collection("items")
      .findOne({ name: submission.name });
    // check if the item is already in the collection
    if (checkIfItem) {
      response.status(400).json({
        status: 400,
        message: "Submmission with the same name is in items.",
      });
      throw new Error("Submmission with the same name is in items.");
    }

    // information to add submission as item
    const newItem = {
      _id: uuidv4(),
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

    // Add submission to items
    const result = await db.collection("items").insertOne(newItem);

    // Remove the submission from the submissions collection
    await db.collection("submissions").deleteOne({ _id: submissionId });

    response.status(200).json({
      status: 200,
      message: "New item added from submission.",
      data: newItem,
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

module.exports = { approveSubmission };
