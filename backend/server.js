
const express = require("express");
const app = express();
const cors = require("cors");
const colors = require("colors");
const connectDB = require("./database/db");
const cookieParser = require("cookie-parser");


const authRoutes = require("./routes/authRoutes")
const adminRoutes = require("./routes/adminRoutes")
const contectUsRoutes = require("./routes/contectUsRoutes")
const educationRoutes = require("./routes/educationRoutes")
const experienceRoutes = require("./routes/experienceRoutes")
const projectRoutes = require("./routes/projectRoutes")
const skillRoutes = require("./routes/skillRoutes")
const userRoutes = require("./routes/userRoutes")


require("dotenv").config();

const URL = process.env.DB_URL;
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["*", "http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);


// Routes
app.use("/api/auth/", authRoutes)
app.use("/api/admin/", adminRoutes)
app.use("/api/profile/", userRoutes)
app.use("/api/skill/", skillRoutes)
app.use("/api/experience/", experienceRoutes)
app.use("/api/education/", educationRoutes)
app.use("/api/project/", projectRoutes)
app.use("/api/contactUs/", contectUsRoutes)



app.listen(PORT, async () => {
  await connectDB(URL);
  console.log(`Server running on Post- ${PORT}`.bgBlue.black);
});
