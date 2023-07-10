const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const { validatePassword } = require("../../helpers/constants");

const errorMessages = [
  "Missing information.",
  "Invalid data.",
  "User has already been added.",
  "Invalid paswword.",
];

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
("use strict");

/**
 * adds new a user.
 * @param request
 * @param response
 */
const addUser = async (request, response) => {
  const client = new MongoClient(MONGO_URI, options);
  const user = request.body;

  try {
    // check if missing field
    if (!user.name || !user.email || !user.password) {
      response.status(400).json({
        status: 400,
        message: "Missing information.",
      });
      throw new Error("Missing information.");
    }

    // Validate password
    const passwordErrors = validatePassword(user.password);
    if (passwordErrors.length !== 0) {
      response.status(400).json({
        status: 400,
        message: passwordErrors.join(" "),
      });
      throw new Error("Invalid paswword.");
    }

    let passwordHash = bcrypt.hashSync(user.password, 16);

    // information to add user
    const newUser = {
      _id: uuidv4(),
      name: user.name,
      email: user.email,
      passwordHash: passwordHash,
      isAdmin: false,
      favorites: [],
      reviews: [],
    };

    await client.connect();
    const db = client.db("Dev");

    const checkIfUser = await db
      .collection("users")
      .findOne({ email: user.email });
    // check if the user is already in the collection
    if (checkIfUser) {
      response.status(400).json({
        status: 400,
        message: "User is already added.",
      });
      throw new Error("User has already been added.");
    }

    const result = await db.collection("users").insertOne(newUser);

    response.status(200).json({
      status: 200,
      message: "New user added.",
      data: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        favorites: newUser.favorites,
        reviews: newUser.reviews,
      },
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

module.exports = { addUser };
