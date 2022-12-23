const express = require("express");
const router = express.Router();
const fs = require("fs");
const uniqid = require("uniqid");
const url = require("url");

// Function to read videos
function readVideos() {
  const videosFile = fs.readFileSync("./data/videos.json");
  const videosData = JSON.parse(videosFile);
  return videosData;
}

router.get("/", (_req, res) => {
  const videosData = readVideos();

  const strippedData = videosData.map((videos) => {
    return {
      id: videos.id,
      title: videos.title,
      image: videos.image,
    };
    // 3. Respond with that data
  });
  res.json(strippedData);
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const videosData = readVideos();
  const videoData = videosData.find((video) => video.id === id);
  res.json(videoData);
});

// Function to write videos
function writevideos(data) {
  const stringifiedData = JSON.stringify(data);
  fs.writeFileSync("./data/videos.json", stringifiedData);
}

router.post("/upload", (req, res) => {
  // {title: "movie", description: "so cool wow"}
  // 1. create a variable that will contain the data sent to us from the frontend, accessed in req.body
  const data = req.body;
  // 2. make an object that has all the same properties as every other video object in videos.json so it matches
  const newVideo = {
    id: uniqid(),
    title: data.title,
    description: data.description,
    image: "image0.jpeg",
    views: "2004",
    likes: "56,696",
    duration: "4:01",
    timestamp: new Date().getTime(), // 1671594755802
    channel: "New Video uploaded",
    video: "https://project-2-api.herokuapp.com/stream",
    comments: [],
  };

  const videoData = readVideos();
  videoData.push(newVideo);
  writevideos(videoData);
  res.json({'status': "success!"})

  // 3. videosData = readVideos()
  // push newVideo into videosData
  // writeVideos(videosData)

  // fs.writeFileSync OVERWRITES (deletes) anything that is in the file already when it writes
  // to prevent losing all the existing video data, first have to use readVideos() to get that data into memory
  // use push to add the new video to the end of the array
  // then we store the ENTIRE ARRAY (+ the new video information) back into videos.json

  // videos.json (old data)
  // videos.json all contents are deleted
  // videos.json (written with the new videoData)
});

module.exports = router;


