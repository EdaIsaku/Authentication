require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = process.env.PORT || 3000;
const rootRouter = require("./routes/index");
app.use(rootRouter);
const DateTime = require("luxon").DateTime;

const getTime = () => {
  return DateTime.local().toFormat("HH:mm:ss");
};

io.on("connection", (socket) => {
  const userConnectionTime = getTime();
  console.log(`User connected at ${userConnectionTime}!`);
  socket.on("disconnect", () => {
    const userDisconnectionTime = getTime();
    console.log(`User disconnected at ${userDisconnectionTime}!`);
  });
  socket.on("location message", (location) => {
    console.log("Current location from user: ", location);
  });
});

server.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});

// process.on("SIGINT", function () {
//   client.close(() => {
//     console.log("MongoDb disconnected on app termination");
//     process.exit(0);
//   });
// });
