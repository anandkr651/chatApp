import mongooes from "mongoose";
import { User } from "./user.model.js";
import { Message } from "./message.model.js";
const conversationSchema = new mongooes.Schema(
  {
    members: [
      {
        type: mongooes.Schema.Types.ObjectId,
        ref: User,
      },
    ],
    messages: [
      {
        type: mongooes.Schema.Types.ObjectId,
        ref: Message,
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Conversation = mongooes.model("Conversation", conversationSchema);
