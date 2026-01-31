const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const path = require("path");

const app = express();

// ===== Middleware =====
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "..")));

// ===== Rate limit =====
const contactLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: "Too many requests, try again later"
});

// ===== Routes =====
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "index.html"));
});

app.use("/api/contact", contactLimiter, require("./routes/contact"));
app.use("/api/skills", require("./routes/skills"));
app.use("/api/projects", require("./routes/projects"));
app.use("/api/contributions", require("./routes/contributions"));
app.use("/api/quotes", require("./routes/quotes"));
app.use("/api/admin", require("./routes/admin"));

// ===== API test =====
app.get("/api", (req, res) => {
  res.json({ message: "Habiba Portfolio API is running" });
});

// ===== 404 (API only) =====
app.use("/api", (req, res) => {
  res.status(404).json({ message: "API route not found" });
});

// ===== Error handler =====
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server error" });
});

module.exports = app;
