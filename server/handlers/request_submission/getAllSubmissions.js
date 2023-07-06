const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const DB_NAME = "Dev";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
/**
 * retrieves all submissions from database
 * @param request
 * @param response
 */
const getAllSubmissions = async (request, response) => {
  const client = new MongoClient(MONGO_URI, options);
  const { category, location } = request.query;

  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const submissionsCollection = db.collection("submissions");

    // Fetch all submissions from the collection
    let submissions = await submissionsCollection.find().toArray();

    // to get all submissions depending on the query
    if (category) {
      submissions = submissions.filter((submission) =>
        submission.category.includes(category)
      );
    }
    if (location) {
      submissions = submissions.filter(
        (submission) => submission.location === location
      );
    }

    // Send the submissions as a JSON response.
    response.status(200).json({ status: 200, submissions });
  } catch (error) {
    console.error("An error occurred while retrieving the submissions:", error);
    response
      .status(500)
      .json({ status: 500, message: "Internal server error" });
  } finally {
    client.close();
  }
};

module.exports = { getAllSubmissions };
