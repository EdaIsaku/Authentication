const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

async function main() {
  await client.connect();
  console.log("Db connected succcessfully");
}

main();

module.exports = client;
