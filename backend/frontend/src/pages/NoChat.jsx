import { useSelector } from "react-redux";
import { RiMenu3Fill } from "react-icons/ri";
import { useState } from "react";
import Search from "./Search";
import User from "./User";
import Logout from "./Logout";

function NoChat() {
  const [openMenu, setOpenMenu] = useState(false);
  const user = useSelector((state) => state.user);
  return (
    <div>
      {!openMenu &&(
      <div className="px-2 py-2">
        <RiMenu3Fill
          className="shadow-xl text-blue-950 md:hidden"
          size={25}
          onClick={() => setOpenMenu(true)}
        />
      </div>
      )}
      {openMenu ? (
        <div className="h-screen bg-neutral-900 text-gray-400 relative">
          <Search />
          <User close={()=>setOpenMenu(false)}/>
          <Logout />
        </div>
      ) : (
        <div className="text-center sm:px-20 italic max-h-screen overflow-hidden pt-40 px-20">
          <h1 className="font-bold text-4xl italic ">
            welcome <span className="text-green-500">{user.fullname}</span>
          </h1>
          <p className="font-medium text-xl sm:text-orange-200 dark:text-black">
            No chat selected, please start conversation by selecting anyone from your contact
          </p>
        </div>
      )}
    </div>
  );
}

export default NoChat;
