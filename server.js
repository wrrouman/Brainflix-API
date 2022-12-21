const express = require("express");
const app = express();
const port = process.env.PORT || process.argv[2] || 8080;
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const fs = require("fs");
const uniqid = require("uniqid");

// Configuration
require("dotenv").config();
const PORT = process.env.PORT || 8080;

//middlewaere

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World333");
});

// Function to read trees
function readVideos() {
  const videosFile = fs.readFileSync('./data/videos.json');
  const videosData = JSON.parse(videosFile);
  return videosData;
}

// Function to write trees
function writevideos(data) {
  const stringifiedData = JSON.stringify(data);
  fs.writeFileSync("./data/videos.json", stringifiedData);
}

app.get("/videos", (_req, res) => {
  const videosData = readVideos();

  const strippedData = videosData.map((videos) => {
    return {
      id: videos.id,
      title: videos.title,
    };
    // 3. Respond with that data
  });
  res.json(strippedData);
});

app.listen(port, () => console.log(`Listening on the ${port}`));
