require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

const rootRouter = require("./routes/index");

app.use(rootRouter);

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});

// process.on("SIGINT", function () {
//   client.close(() => {
//     console.log("MongoDb disconnected on app termination");
//     process.exit(0);
//   });
// });
