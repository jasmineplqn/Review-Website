const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
("use strict");

/**
 *  fetches a submission using the submissionId set from the request
 *  parameter from MongoDB and returns in the response the submission.
 * @param request
 * @param response
 */
const getOneSubmission = async (request, response) => {
  const client = new MongoClient(MONGO_URI, options);
  const submissionId = request.params.submissionId;

  try {
    await client.connect();
    const db = client.db("Dev");

    const result = await db
      .collection("submissions")
      .findOne({ _id: submissionId });
    result
      ? response
          .status(200)
          .json({ status: 200, data: result, message: "submission details" })
      : response.status(404).json({ status: 404, message: "Not Found" });
  } catch (error) {
    console.error(error);
    response.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
  client.close();
};

module.exports = { getOneSubmission };
