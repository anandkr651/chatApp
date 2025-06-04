import Search from "./Search";
import User from "./User";
import Logout from "./Logout";

function Left() {
  return (
    <div className="md:w-[30%] h-screen hidden md:block bg-neutral-900 text-gray-400 relative">
      <Search />
      <User />
      <Logout />
    </div>
  );
}

export default Left;
