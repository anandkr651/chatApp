import { useState } from "react";
import { IoSend } from "react-icons/io5";
import AxiosToastError from "../utils/AxiosToastError";
import { useDispatch } from "react-redux";
import { setSendMessage } from "../store/messageSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import { useGlobalContext } from "../provider/globalProvider";

function TypeSend() {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const selectconversation = useSelector((state) => state.conversation.value);
  const { getMessage } = useGlobalContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const accessToken = await localStorage.getItem("accessToken");
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/message/sender/${selectconversation._id}`,{ message },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.data.success) {
        dispatch(setSendMessage(response.data.data.message));
        getMessage();
        setMessage("");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <div className="bg-slate-800 fixed bottom-0 sm:w-[70%] w-full p-2 flex items-center">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type here"
            className="p-2 outline-none w-[100%] rounded-lg border border-blue-500"
          />
          <div className="text-3xl px-4">
            <IoSend onClick={handleSubmit} />
          </div>
        </div>
      </form>
    </div>
  );
}

export default TypeSend;
