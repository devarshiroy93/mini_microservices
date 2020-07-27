const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const { randomBytes } = require("crypto");
const cors = require("cors");

const app = express();

const commentsByPostId = {};

app.use(bodyParser.json());
app.use(cors());

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id || []]);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;
  const comment = commentsByPostId[req.params.id] || [];
  comment.push({ id: commentId, content, status: "pending" });
  await axios.post("http://localhost:4005/events", {
    type: "commentCreated",
    data: {
      id: commentId,
      content,
      postId: req.params.id,  
      status: "pending",
    },
  });
  commentsByPostId[req.params.id] = comment;
  res.status(201).send(commentsByPostId);
});
app.post("/events", async (req, res) => {
  console.log("receivedevent", req.body.type);
  const { type, data } = req.body;
  if (type === "commentModerated") {
    const { id, postId, status } = data;
    const comments = commentsByPostId[postId];

    const comment = comments.find((c) => c.id === id);
    console.log('comment',comment)
    comment.status = status;
    comment.postId = postId;
    await axios.post("http://localhost:4005/events", {
      type: "commentUpdated",
      data: comment,
    });
  }

  res.send({});
});
app.listen(4001, () => {
  console.log("comments listening at port 4001");
});
