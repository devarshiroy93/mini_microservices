const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  if (type === "commentCreated") {
    const status = data.content.includes("orange") ? "rejected" : "approved";
    console.log({...data,status});
    await axios.post('http://localhost:4005/events',{
        type : 'commentModerated',
        data  : {
            ...data,
            status
        }
    })
  }
  res.send({status : 'success'});
});

app.listen(4003, () => {
  console.log("listening to 4003");
});
