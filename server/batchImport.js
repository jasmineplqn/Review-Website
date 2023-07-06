const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const { MONGO_URI } = process.env;
const DB_NAME = "Dev";
// to require the Fs in order for readfilesync to work
const fs = require("fs");

// Read the JSON files
const itemsData = fs.readFileSync("./data/items.json", "utf8");

// Parse the JSON data
const items = JSON.parse(itemsData);

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const batchImport = async () => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    console.log("Connecting to the client");
    // connecting the server
    await client.connect();
    console.log("Connected");

    const db = client.db(DB_NAME);
    console.log("Inserting data");

    // Insert items, mapping one item at a time
    const itemsArray = Object.keys(items).map((item) => ({
      _id: uuidv4(),
      name: items[item].name,
      category: items[item].category,
      location: items[item].location,
      imageSrc: items[item].imageSrc,
      description: items[item].description,
      skinType: items[item].skinType,
      care: items[item].care,
      frequency: items[item].frequency,
      url: items[item].url,
    }));

    await db.collection("items").insertMany(itemsArray);

    console.log("Data insertion successful");
  } catch (err) {
    console.error(err.message);
  } finally {
    client.close();
  }
};

batchImport();
