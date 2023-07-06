const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const errorMessages = ["Submission not found."];

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

/**
 * Deletes a submission
 * @param request
 * @param response
 */
const deleteSubmission = async (request, response) => {
  const client = new MongoClient(MONGO_URI, options);
  const submissionId = request.params.submissionId;

  try {
    await client.connect();
    const db = client.db("Dev");

    // check if submission exists
    const checkIfSubmission = await db
      .collection("submissions")
      .findOne({ _id: submissionId });
    if (!checkIfSubmission) {
      response.status(404).json({
        status: 404,
        message: "Submission not found.",
      });
      throw new Error("Submission not found.");
    }

    // Deletes the submission
    await db.collection("submissions").deleteOne({ _id: submissionId });

    response.status(200).json({
      status: 200,
      message: "Submission deleted.",
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

module.exports = { deleteSubmission };
