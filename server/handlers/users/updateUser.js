const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");
const { validatePassword } = require("../../helpers/constants");

const errorMessages = [
  "User not found.",
  "Missing information.",
  "Invalid paswword.",
];

require("dotenv").config();

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

/**
 * updates/modifies a users information.
 * @param request
 * @param response
 */
const updateUser = async (request, response) => {
  const client = new MongoClient(MONGO_URI, options);
  const _id = request.params.userId;

  try {
    await client.connect();
    const db = client.db("Dev");

    // check if user exists
    const checkUser = await db.collection("users").findOne({ _id: _id });
    if (!checkUser) {
      response.status(404).json({
        status: 404,
        message: "User not found.",
      });
      throw new Error("User not found.");
    }

    const user = request.body;

    if (!user.name || !user.email) {
      response.status(400).json({
        status: 400,
        message: "Missing information.",
      });
      throw new Error("Missing information.");
    }

    let passwordHash = checkUser.passwordHash;
    if (user.password) {
      // Validate password
      const passwordErrors = validatePassword(user.password);
      if (passwordErrors.length !== 0) {
        response.status(400).json({
          status: 400,
          message: passwordErrors.join(" "),
        });
        throw new Error("Invalid paswword.");
      }

      passwordHash = bcrypt.hashSync(user.password, 16);
    }

    const updatedUser = {
      email: user.email,
      passwordHash: passwordHash,
      name: user.name,
    };

    await db.collection("users").updateOne(
      { _id: _id },
      {
        $set: {
          ...updatedUser,
        },
      }
    );

    response.status(200).json({
      status: 200,
      message: "Updated user.",
      data: updatedUser,
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

module.exports = { updateUser };
