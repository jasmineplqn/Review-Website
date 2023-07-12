const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
("use strict");

/**
 * gets the user with the provided email and validates that the password is the same.
 * @param request
 * @param response
 */
const authenticateUser = async (request, response) => {
  const client = new MongoClient(MONGO_URI, options);
  const { email, password } = request.body;

  try {
    await client.connect();
    const db = client.db("Dev");

    const result = await db.collection("users").findOne({ email: email });

    if (!result) {
      response
        .status(404)
        .json({
          status: 404,
          message: "Email is not connected to any account.",
        });
      client.close();
      return;
    }

    if (bcrypt.compareSync(password, result.passwordHash)) {
      response.status(200).json({
        status: 200,
        data: {
          _id: result._id,
          name: result.name,
          email: result.email,
          isAdmin: result.isAdmin,
          favorites: result.favorites,
          reviews: result.reviews,
        },
        authenticated: true,
        message: "Authentication successful.",
      });
    } else {
      response.status(401).json({
        status: 401,
        authenticated: false,
        message: "Password incorrect.",
      });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
  client.close();
};

module.exports = { authenticateUser };
