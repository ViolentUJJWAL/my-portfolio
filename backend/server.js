
const express = require("express");
const app = express();
const cors = require("cors");
const colors = require("colors");
const connectDB = require("./database/db");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const URL = process.env.DB_URL;
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["*", "http://localhost:5173"],
    credentials: true,
  })
);


// Routes




app.listen(PORT, async () => {
  await connectDB(URL);
  console.log(`Server running on Post- ${PORT}`.bgBlue.black);
});
