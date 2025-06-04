import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import sound from "../assets/notification.mp3";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";

export const globalContext = createContext(null);
export const useGlobalContext = () => useContext(globalContext);

const GlobalProvider = ({ children }) => {
  const selectconversation = useSelector((state) => state.conversation.value);
  const [messages, setMessages] = useState([]);
  const [allUser, setAllUser] = useState([]);

  const getMessage = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(`http://localhost:8000/api/v1/message/get/${selectconversation._id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setMessages(response.data.data);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    if (selectconversation) {
      getMessage();
    }
  }, []);

  const [socket, setSocket] = useState(null);
  const user = useSelector((state) => state.user);
  const [onlineUser, setOnlineUser] = useState([]);

  useEffect(() => {
    if (user) {
      const socket = io("http://localhost:8000", {
        query: {
          userId: user._id, //then go to server.js
        },
      });
      setSocket(socket);
      socket.on("getOnlineUser", (users) => {//comes from server.js
        setOnlineUser(users);
      });
      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [user]);

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      const notification = new Audio(sound);
      notification.play();
      setMessages((prev) => [...prev, newMessage]);
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket]);

  const fetchAllUserExcept = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.allUserExceptOnline,
      });
      if (response.data.success) {
        setAllUser(response.data.data);
      }
    } catch (error) {
      // AxiosToastError(error);
      // console.log(error);
    }
  };

  useEffect(() => {
    fetchAllUserExcept();
  }, [user]);

  return (
    <globalContext.Provider
      value={{
        getMessage,
        messages,
        fetchAllUserExcept,
        allUser,
        socket,
        onlineUser,
      }}
    >
      {children}
    </globalContext.Provider>
  );
};

export default GlobalProvider;
