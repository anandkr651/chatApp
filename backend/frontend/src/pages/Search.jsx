import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import dummyAvatar from "../assets/user.png";
import { useGlobalContext } from "../provider/globalProvider";
import toast from "react-hot-toast";

import { useDispatch } from "react-redux";
import { setConversation } from "../store/conversationSlice";

function Search() {
  const [search, setSearch] = useState("");
  const user = useSelector((state) => state.user);
  const { allUser } = useGlobalContext();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    const conversation = allUser.find((user) =>
      user.fullname.toLowerCase().includes(search.toLowerCase())
    );
    if (conversation) {
      dispatch(setConversation(conversation));
      setSearch("");
    } else {
      toast.error("user not found");
      setSearch("");
    }
  };

  return (
    <div className="py-5">
      <div className="flex items-center justify-around ">
        <div className="w-12">
          <Link
            to={"/Profile"} //go to pages/profile
            className="font-semibold text-green-700 hover:text-green-800"
          >
            <img
              src={user.avatar || dummyAvatar}
              alt="avatar"
              className="rounded-full mr-2"
            />
          </Link>
        </div>
        <form onSubmit={handleSubmit}>
          {/* <form > */}
          <div className="flex items-center justify-center">
            <input
              type="text"
              className="px-5 py-2 rounded-xl text-xl outline-none border border-slate-700 w-full"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit">
              <FaSearch className="text-4xl rounded-full duration-100 ml-1" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Search;
