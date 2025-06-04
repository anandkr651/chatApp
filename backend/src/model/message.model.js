import mongooes from "mongoose";
const messageSchema = new mongooes.Schema(
  {
    senderId: {
      type: mongooes.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    reciverId: {
      type: mongooes.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    message: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);
export const Message = mongooes.model("Message", messageSchema);
