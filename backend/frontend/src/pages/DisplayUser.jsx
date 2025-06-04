import { useDispatch, useSelector } from "react-redux";
import { setConversation } from "../store/conversationSlice";
import dummyAvatar from "../assets/user.png";
import { useGlobalContext } from "../provider/globalProvider";
import { RiCheckboxBlankCircleFill } from "react-icons/ri";

function DisplayUser({ user }) {
  const dispatch = useDispatch();
  const selectedConversation = useSelector((state) => state.conversation.value);
  const isSelected = selectedConversation?._id === user._id;

  const handleSelectConversation = () => {
    dispatch(setConversation(user));
  };

  const { onlineUser } = useGlobalContext();
  const isOnline = onlineUser.includes(user._id);
  // console.log(isOnline);

  return (
    <div
      className={`hover:bg-slate-600 ${isSelected ? "bg-slate-700" : ""}`}
      onClick={handleSelectConversation}
    >
      <div className="px-5 py-2 grid gap-4">
        <div className="flex items-center">
          <div className="w-12 relative">
            <img
              className="rounded-full object-scale-down "
              src={user.avatar || dummyAvatar}
              alt="avatar"
            />
            {isOnline && (
              <RiCheckboxBlankCircleFill className="absolute bottom-0 right-0 text-green-400 " />
            )}
          </div>
          <div className="ml-2">
            <h1 className="text-xl italic font-bold text-ellipsis line-clamp-1 ">
              {user.fullname}
            </h1>
            <span className="font-medium text-ellipsis line-clamp-1 ">
              {user.email}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DisplayUser;
