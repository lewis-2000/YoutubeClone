const express = require("express");
const path = require("path");
const cors = require("cors");
const videoRoutes = require("./routes/videoRoutes");
const userRoutes = require("./routes/userRoutes");
const mockRoutes = require("./routes/mockRoutes");

const app = express();

app.use(
  cors({
    origin: "http://127.0.0.1:5501",
  }),
);

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

//For testing with mock data
app.use("/api/mock", mockRoutes);

app.listen(3000, () => console.log("Server running at http://localhost:3000"));
