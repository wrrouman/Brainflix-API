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

  // pseudocode of what we need to do
  // 1. use readVideos function to get the video data, and store that in a variable, like on like 15
  const videosData = readVideos();
  // 2. use videosData.find() to pull out from that array, the object with an id matching the id variable from the req
  // so .find is kinda like forEach, or map, so inside .find the first part is the name for each object.. so since it is an array of videos, we can use video singular
  // after video, we use the arrow function syntax. so in full videosData.find((video) => then we write our condition here to match id)
  // the second part of your comparison should be for the id you pulled out of req.params. same variable name.
  // const videoData = videosData.find(video => video.id === id)
  const videoData = videosData.find((video) => video.id === id);
  // const videoId = id.find()
  // 3. use the res.json method to send a JSON object back to the user, containing the videoData object
  // /videos/84e96018-4022-434e-80bf-000ce4cd12b8 should get us BMX Rampage: 2021 Highlights
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
  // 2. we need to make an object that has all the same properties as every other video object in videos.json so it matches
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
  // to prevent losing all our existing video data, we first have to use readVideos() to get that data into memory (into this function so we can do work with it)
  // we use push to add the new video to the end of the array
  // then we store the ENTIRE ARRAY (+ the new video information) back into videos.json

  // videos.json (old data)
  // videos.json all contents are deleted
  // videos.json (written with the new videoData)
});

module.exports = router;

//   {
//     "id": "76ca28c0-7dea-4553-887f-8e5129a80fc3",
//     "title": "Train Travel On Track For Safety",
//     "channel": "Scotty Cranmer",
//     "image": "https://i.imgur.com/i6S8m7I.jpg",
//     "description": "Traveling by train can be convenient, enjoyable and economical. You can minimize your risk of injury, illness, and theft by taking a few simple precautions. Before you travel, you should pack only the necessities. This will make your luggage easy to carry and store during your travels. You should always assume that the tap water on the train is not potable. Whenever it is possible, stock up on bottles of water to reduce the risk of dehydration. Remember, never accept food or drinks from strangers!",
//     "views": "3,092,284",
//     "likes": "75,985",
//     "duration": "4:20",
//     "video": "https://project-2-api.herokuapp.com/stream",
//     "timestamp": 1632344461000,
//     "comments": []
//   }
