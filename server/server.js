const express = require("express");
const path = require("path");
const videoRoutes = require("./routes/videoRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Serve HTML files from root
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "../index.html")));
app.get("/upload", (req, res) =>
  res.sendFile(path.join(__dirname, "../upload.html")),
);
app.get("/video/:id", (req, res) =>
  res.sendFile(path.join(__dirname, "../video.html")),
);

// API routes
app.use("/videos", videoRoutes);
app.use("/users", userRoutes);

app.listen(3000, () => console.log("Server running at http://localhost:3000"));
