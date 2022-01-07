const express = require("express");
const dotenv = require("dotenv");
const chats  = require("./data/data");

const app = express();
dotenv.config();

//callback takes request, response
app.get("/", (req, res) => {
    res.send("API Running");
})

app.get('/api/chat', (req, res) => {
    res.send(chats);
})

app.get('/api/chat/:id', (req, res) => {
    const singleChat = chats.find((c)=>c._id == req.params.id);
    res.send(singleChat);
})

const PORT = process.env.PORT || 5000

//start server
app.listen(PORT, console.log(`Server Begin on PORT ${PORT}`))
