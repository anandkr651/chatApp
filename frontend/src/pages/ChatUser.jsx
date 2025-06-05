import { useSelector } from "react-redux";
import dummyAvatar from "../assets/user.png";
import { useGlobalContext } from "../provider/globalProvider";
import { useState } from "react";
import Search from "./Search";
import User from "./User";
import Logout from "./Logout";
import { RiMenu3Fill } from "react-icons/ri";

function ChatUser() {
  const selectconversation = useSelector((state) => state.conversation.value);
  const { onlineUser } = useGlobalContext();
  const [openMenu, setOpenMenu] = useState(false);

  const getOnlineUserStatus = (userId) => {
    return onlineUser.includes(userId) ? "online" : `${selectconversation.lastLoginDate}`;
  };

  return (
    < div className="bg-slate-800 fixed top-0 sm:w-[70%] w-full z-10 flex items-center">
      {!openMenu &&(
        <div>
          <RiMenu3Fill
            className="md:hidden"
            size={25}
            onClick={() => setOpenMenu(true)}
          />
        </div>)}
      {openMenu ?(
        <div className="h-screen bg-neutral-900 text-gray-400 relative w-full">
          <Search />
          <User close={() => setOpenMenu(false)} />
          <Logout />
        </div>):
      (<div className="flex items-center justify-center mx-12">
          <div className="avatar">
            <div className="w-10">
              <img
                src={selectconversation.avatar || dummyAvatar}
                className="rounded-full "
                />
            </div>
          </div>
          <div className="px-2">
            <h1 className="font-bold ">{selectconversation.fullname}</h1>
            <span>{getOnlineUserStatus(selectconversation._id)}</span>
          </div>
        </div>)}
      </div>
  );
}

export default ChatUser;

