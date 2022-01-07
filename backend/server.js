const express = require("express");
const dotenv = require("dotenv");
const chats  = require("./data/data");
const connectDB = require("./config/database");
const userRoutes = require('./routes/userRoutes')

dotenv.config();

connectDB();

const app = express();

//allows acceptance of JSON data
app.use(express.json());

//callback takes request, response
 
//add endpoint for user
app.use('/api/user', userRoutes)

app.get('/api/chat/:id', (req, res) => {
    const singleChat = chats.find((c)=>c._id == req.params.id);
    res.send(singleChat);
})

const PORT = process.env.PORT || 5000

//start server
app.listen(PORT, console.log(`Server Begin on PORT ${PORT}`))
