import { Conversation } from "../model/conversation.model.js";
import { Message } from "../model/message.model.js";
import { getReciverSocketId, io } from "../SocketIO/server.js";

const sendMessage = async (req, res) => {
  try {
    // const message = req.body.message OR
    const { message } = req.body;
    const { id: reciverId } = req.params;
    const senderId = req.user.id; //current login user

    if (!message) {
      return res.status(500).json({
        message: "type something",
        error: true,
        success: false,
      });
    }

    let conversation = await Conversation.findOne({
      members: { $all: [senderId, reciverId] }, //members comes from conversation model.
    });
    if (!conversation) {
      conversation = await Conversation.create({
        members: [senderId, reciverId],
      });
    }
    const newMessage = new Message({
      senderId,
      reciverId,
      message,
    });
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // await conversation.save()
    // await newMessage.save()
    await Promise.all([conversation.save(), newMessage.save()]);

    const receiverSocketId = getReciverSocketId(reciverId); //comes from server.js
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    return res.status(200).json({
      data: newMessage,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

const getMessage = async (req, res) => {
  try {
    const { id: reciverId } = req.params;
    const senderId = req.user.id;

    // let conversation = await Conversation.findOne({
    //     members: { $all: [senderId, reciverId] },
    // })
    // const message = conversation.messages;  //only give message id

    //  {
    //   "data": [
    //       "6836e0b926b067787da06abe"
    //   ],
    //   "success": true,
    //   "error": false
    //  }

    // let conversation = await Conversation.findOne({
    //     members: { $all: [senderId, reciverId] },
    // }).populate("messages");
    // const message = conversation;

    // {
    // "data": {
    //     "_id": "6836e0b926b067787da06abc",
    //     "members": [
    //         "6836dd005142e193c838b298",
    //         "6836dd1d5142e193c838b2a3"
    //     ],
    //     "messages": [
    //         {
    //             "_id": "6836e0b926b067787da06abe",
    //             "senderId": "6836dd005142e193c838b298",
    //             "reciverId": "6836dd1d5142e193c838b2a3",
    //             "message": "egghgdhgydyged",
    //             "createdAt": "2025-05-28T10:08:57.805Z",
    //             "updatedAt": "2025-05-28T10:08:57.805Z",
    //             "__v": 0
    //         }
    //     ],
    //     "createdAt": "2025-05-28T10:08:57.724Z",
    //     "updatedAt": "2025-05-28T10:08:57.805Z",
    //     "__v": 1
    // },
    // "success": true,
    // "error": false
    // }

    let conversation = await Conversation.findOne({
      members: { $all: [senderId, reciverId] },
    }).populate("messages");
    if (!conversation) {
      return res.status(200).json([]);
    }
    const message = conversation.messages;

    // {
    // "data": [
    //     {
    //         "_id": "6836e0b926b067787da06abe",
    //         "senderId": "6836dd005142e193c838b298",
    //         "reciverId": "6836dd1d5142e193c838b2a3",
    //         "message": "egghgdhgydyged",
    //         "createdAt": "2025-05-28T10:08:57.805Z",
    //         "updatedAt": "2025-05-28T10:08:57.805Z",
    //         "__v": 0
    //     }
    // ],
    // "success": true,
    // "error": false
    // }

    return res.status(200).json({
      data: message,
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export { sendMessage, getMessage };
