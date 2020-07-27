const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());
const posts = {};

const handleEvent = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }
  if ((type === "commentCreated")) {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    post.comments.push({ id, content, status });
  }
  if ((type === "commentUpdated")) {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    const comment = post.comments.find((c) => c.id === id);
    comment.status = status;
    comment.content = content;
  }
}

app.get("/posts", (req, res) => {
  res.send(posts);
});
app.post("/events", (req, res) => {
  const { type, data } = req.body;
  handleEvent(type, data)
  console.log(JSON.stringify(posts, undefined, 2))
  res.send({ status: "success" });
});
app.listen(4002, async () => {
  const res = await axios.get('http://localhost:4005/events');
  for (let event of res.data) {
    console.log('Processing Event');
    handleEvent(event.type, event.data)
  }
  console.log("listening on 4002");
});
