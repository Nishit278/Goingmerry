import express, { application } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import auth from "./routes/auth.js";
import users from "./routes/users.js";
import hotels from "./routes/hotels.js";
import rooms from "./routes/rooms.js";
import cookieParder from "cookie-parser";
import cors from "cors";
import path from "path";

const port = process.env.PORT || 5000;
const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected");
});

//middlewares
app.use(cors());
app.use(cookieParder());
app.use(express.json());
app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/hotels", hotels);
app.use("/api/rooms", rooms);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

//server production assets
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join("client/build")));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }
if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "staging") {
 app.use(express.static("client/build"));
 app.get("*", (req, res) => {
 res.sendFile(path.join(__dirname + "/client/build/index.html"));
 });
}
app.listen(port, () => {
  connect();
  console.log("Connected to Backend");
});

// middlewares
// app.use("/api/hotels",hotels) - is a middle ware function
// in routes router.get("/", async(req, res, next)=>{}) - next() is a function which says go for the next middleware
// it comes back to index.js look for the next middleware and executes it
