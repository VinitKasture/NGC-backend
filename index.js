require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Middleware
const errorMiddleware = require("./middleware/error.middleware");

const app = express();

app.use(cors());
app.set("port", process.env.PORT || 4001);
app.use(express.json());
app.use(require("./Routes/admin"));
app.use(express.urlencoded({ extended: true }));

app.use(errorMiddleware);

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("=========== Connected to Backend Database ============");
  } catch (err) {
    console.log("============ Error Connecting To Database ============ ");
    console.error(err);
    throw err;
  }
})();

app.listen(app.get("port"), () => {
  console.log("Listening....");
});
