const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const errorMessages = ["User not found."];

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

/**
 * Deletes a user.
 * @param request
 * @param response
 */
const deleteUser = async (request, response) => {
  const client = new MongoClient(MONGO_URI, options);
  const userId = request.params.userId;

  try {
    await client.connect();
    const db = client.db("Dev");

    // check if user exists
    const checkUser = await db.collection("users").findOne({ _id: userId });
    if (!checkUser) {
      response.status(404).json({
        status: 404,
        message: "User not found.",
      });
      throw new Error("User not found.");
    }

    // Deletes the User
    await db.collection("users").deleteOne({ _id: userId });

    response.status(200).json({
      status: 200,
      message: "User deleted.",
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

module.exports = { deleteUser };
