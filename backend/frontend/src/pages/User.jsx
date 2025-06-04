import DisplayUser from "./DisplayUser.jsx";
import { RxCross2 } from "react-icons/rx";
import { useGlobalContext } from "../provider/globalProvider.jsx";

function User({ close }) {
  const { allUser } = useGlobalContext();
  return (
    <div className="">
      <div className="px-4 py-2 text-white bg-slate-900 text-xl flex justify-between items-center">
        <h1>Message</h1>
        <RxCross2 onClick={close} className="md:hidden" />
      </div>
      <div className="max-h-[70vh] overflow-y-scroll scrollbar-none scroll-smooth">
        {allUser.map((user, index) => (
          <div key={index}>
            <DisplayUser user={user} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default User;
