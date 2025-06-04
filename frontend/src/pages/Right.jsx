import ChatUser from "./ChatUser";
import Message from "./Message";
import NoChat from "./NoChat";
import TypeSend from "./TypeSend";
import { useSelector } from "react-redux";

function Right() {
  const selectedConversation = useSelector((state) => state.conversation.value);
  return (
    <div className="sm:w-[70%] w-[100%] text-gray-300 max-h-screen sm:overflow-scroll">
      {!selectedConversation ? (
        <NoChat />
      ) : (
        <div>
          <ChatUser />
          <div className="mb-10 mt-20">
            <Message />
          </div>
          <TypeSend />
        </div>
      )}
    </div>
  );
}

export default Right;
