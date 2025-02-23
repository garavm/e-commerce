const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const dns = require("dns");
dns.setDefaultResultOrder("ipv4first"); // Fixes DNS resolution issue

const { DB_PASSWORD, DB_USER, DB_NAME } = process.env;

const dbURL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.65e5f.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;
// once 
mongoose
  .connect(dbURL, {
    serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Failed:", err));