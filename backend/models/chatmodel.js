const mongoose = require('mongoose')

//mongoose connects and makes queries to MongoDB database

//name of chat, whether is group chat, users, recent message, group admin

const chatModel = mongoose.Schema(
    {
        chatName: { type: String, trim: true },

        isGroupChat: { type: Boolean, default: false },
        
        users: [
            {

            //contains ID to a particular user
            type:mongoose.Schema.Types.ObjectId,

            //reference to user model
            ref:"User",
        },
    ],
    latestMessage: {
        type:mongoose.Schema.Types.ObjectId,

        //reference to message model
        ref: "Message",
    },
    groupAdmin: {
        type: mongoose.Schema.Types.ObjectId,
    },
},
 {
     // field so that mongoose adds timestamp
     timestamps: true,
 }
);

const Chat = mongoose.model("Chat", chatModel)

module.exports = Chat;
