const { protect } = require("../middleware/authMiddleware");
const {
  allMessages,
  sendMessage,
} = require("../controllers/messageControllers");

const express = require("express");

const router = express.Router();

//include protect param to require user to be logged in to access this route
router.route("/").post(protect, sendMessage);

router.route("/:chatId").get(protect, allMessages);

module.exports = router;
