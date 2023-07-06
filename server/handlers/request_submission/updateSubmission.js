const { MongoClient } = require("mongodb");
const { validateLocation } = require("../../helpers/constants");

const errorMessages = [
  "Cannot change the id.",
  "Submission not found.",
  "Missing information.",
  "Invalid data.",
];

require("dotenv").config();

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

/**
 * updates/modifies a submission and can also overwrite it
 * @param request
 * @param response
 */
const updateSubmission = async (request, response) => {
  const client = new MongoClient(MONGO_URI, options);
  const _id = request.params.submissionId;

  try {
    await client.connect();
    const db = client.db("Dev");

    // check if submission exists
    const checkIfSubmission = await db
      .collection("submissions")
      .findOne({ _id: _id });
    if (!checkIfSubmission) {
      response.status(404).json({
        status: 404,
        message: "Submission not found.",
      });
      throw new Error("Submission not found.");
    }

    const submission = request.body;

    // check if missing field
    if (
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
    const updatedSubmission = {
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

    await db.collection("submissions").updateOne(
      { _id: _id },
      {
        $set: {
          ...updatedSubmission,
        },
      }
    );

    response.status(200).json({
      status: 200,
      message: "Updated submission.",
      data: updatedSubmission,
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

module.exports = { updateSubmission };
