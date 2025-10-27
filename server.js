const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, "public")));

// Routes without .html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/:page", (req, res, next) => {
  const page = req.params.page;
  const filePath = path.join(__dirname, "public", `${page}.html`);
  res.sendFile(filePath, (err) => {
    if (err) next(); // if page not found, go to next
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

app.listen(PORT, () => console.log(`🚀 AAHES running at http://localhost:${PORT}`));
