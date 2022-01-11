const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");

const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  //refer to schema model
  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  //query
  try {
    var message = await Message.create(newMessage);

    //populate contents inside message
    message = await message.populate("sender", "name pic");

    //populate chat
    message = await message.populate("chat");

    //populate each of the users; refer to user schema model
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });

    //updating the latest message to message by the chatID
    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const allMessages = asyncHandler(async (req, res) => {
  try {
    //fetch messages by querying messages by chatID
    const messages = await Message.find({ chat: req.params.chatId })

      .populate("sender", "name pic email")

      .populate("chat");

    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { allMessages, sendMessage };
