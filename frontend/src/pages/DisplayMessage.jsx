import { jwtDecode } from "jwt-decode";

function DisplayMessage({ messageFromSender }) {
  const authUser = jwtDecode(localStorage.getItem("accessToken"));
  // console.log(authUser);

  const itsMe = authUser._id === messageFromSender.senderId;
  const createdAt = new Date(messageFromSender.createdAt);
  const formattedTime = createdAt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`flex ${itsMe ? "justify-end" : "justify-start"} mx-2`}>
      <div className="flex-col">
        <div className={`max-w-xs px-4 py-2 rounded-lg shadow-md text-white ${itsMe ? "bg-blue-500" : "bg-gray-700"}`}>
          <div className="font-medium">{messageFromSender.message}</div>
        </div>
        <div className="text-xs text-gray-500 text-right mb-3">
          {formattedTime}
        </div>
      </div>
    </div>
  );
}

export default DisplayMessage;
