const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const { DB_PASSWORD, DB_USER } = process.env;

const dbURL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.qejqc.mongodb.net/test?retryWrites=true&w=majority`;
// once 
mongoose
  .connect(dbURL, {
    serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Failed:", err));