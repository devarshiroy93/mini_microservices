const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());
const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});
app.post("/events", (req, res) => {
  const { type, data } = req.body;
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }
  if ((type === "commentCreated")) {
    const { id, content, postId ,status} = data;
    const post = posts[postId];
    post.comments.push({ id, content ,status});
  }
  if ((type === "commentUpdated")) {
    const { id, content, postId ,status} = data;
    const post = posts[postId];
    const comment = post.comments.find((c)=>c.id === id);
    comment.status= status;
    comment.content = content;
  }
  console.log(JSON.stringify(posts,undefined,2))

  res.send({ status: "success" });
});
app.listen(4002, () => {
  console.log("listening on 4002");
});
