const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
("use strict");

/**
 * getUser fetches a user using the userId set from the request
 *  parameter from MongoDB and returns in the response the user.
 * @param request
 * @param response
 */
const getUser = async (request, response) => {
  const client = new MongoClient(MONGO_URI, options);
  const userId = request.params.userId;

  try {
    await client.connect();
    const db = client.db("Dev");

    const result = await db.collection("users").findOne({ _id: userId });
    result
      ? response
          .status(200)
          .json({ status: 200, data: result, message: "User details" })
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

module.exports = { getUser };
