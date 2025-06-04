import { CiLogout } from "react-icons/ci";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/userSlice";

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.logout,
      });
      if (response.data.success) {
        dispatch(logout());
        localStorage.clear();
        toast.success(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  return (
    <div className="flex justify-between p-4 absolute bottom-0 text-3xl w-full bg-neutral-800 text-gray-400">
      <CiLogout onClick={handleLogout} />
    </div>
  );
}

export default Logout;
