import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import DisplayMessage from "./DisplayMessage";
import { useGlobalContext } from "../provider/globalProvider";

function Message() {
  const selectconversation = useSelector((state) => state.conversation.value);
  const lastMsgRef = useRef();
  const { getMessage, messages } = useGlobalContext();

  useEffect(() => {
    if (selectconversation?._id) {
      getMessage();
    }
  }, [selectconversation]);

  useEffect(() => {
    setTimeout(() => {
      if (lastMsgRef.current) {
        lastMsgRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 1000);
  }, [messages]);

  return (
    <div className="overflow-y-auto h-[calc(120vh-10rem)] scrollbar-none scroll-smooth">
      {messages ? (
        <div className="">
          {messages.map((dispMessage) => {
            return (
              <div key={dispMessage._id} ref={lastMsgRef}>
                <DisplayMessage messageFromSender={dispMessage} />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center mt-[20%] font-bold text-3xl italic">
          <p>say hii to start the conversation</p>
        </div>
      )}
    </div>
  );
}

export default Message;
