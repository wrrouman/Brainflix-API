const express = require("express");
const app = express();
const videos = require("./routes/videos");
const cors = require("cors");

// Configuration
require("dotenv").config();
const PORT = process.env.PORT || 8080;

//middlewaere

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});


app.use("/videos", videos);
app.use(express.static('public'))
app.listen(PORT, () => console.log(`Listening on the ${PORT}`));
