import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import fetchUserDetails from "../utils/fetchUserDetails";
import { setUserDetails } from "../store/userSlice";
import AxiosToastError from "../utils/AxiosToastError";
import DummyAvatar from "../assets/user.png";
import { IoCameraReverse, IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import UserProfileAvatarEdit from "./UserProfileAvatarEdit";

function Profile() {
  const user = useSelector((state) => state.user);
  const [openProfileAvatar, setOpenProfileAvatar] = useState(false);
  const [userData, setUserData] = useState({
    fullname: user.fullname,
    email: user.email,
    mobile: user.mobile,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    setUserData({
      fullname: user.fullname,
      email: user.email,
      mobile: user.mobile,
    });
  }, [user]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({
        ...SummaryApi.updateProfile,
        data: userData,
      });
      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        const userData = await fetchUserDetails();
        dispatch(setUserDetails(userData.data.data));
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 p-4 bg-gray-800 bg-opacity-90 flex items-center justify-center flex-col">
      <div className="bg-white max-w-xl w-full p-4 rounded">
        <Link to={"/"}>
          <button className="w-fit block ml-auto">
            <IoClose />
          </button>
        </Link>
        <div className="flex flex-col justify-center items-center">
          <div className="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center relative ">
            {openProfileAvatar && (
              <UserProfileAvatarEdit close={() => setOpenProfileAvatar(false)} />
            )}
            <img
              src={user.avatar || DummyAvatar}
              alt={user.fulname}
              className="w-full h-full "
            />
            <IoCameraReverse
              size={23}
              className="absolute bottom-1 right-2 hover:text cursor-pointer "
              onClick={() => setOpenProfileAvatar(true)}
            />
          </div>
        </div>

        {/*fullname, mobile , email*/}
        <form className="my-4 grid gap-4" onSubmit={handleSubmit}>
          <div className="grid">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="p-2 bg-blue-50 outline-none border focus-within:border-primary-200 rounded"
              value={userData.fullname}
              name="fullname"
              onChange={handleOnChange}
              required
            />
          </div>
          <div className="grid">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="p-2 bg-blue-50 outline-none border focus-within:border-primary-200 rounded"
              value={userData.email}
              name="email"
              onChange={handleOnChange}
              required
            />
          </div>
          <div className="grid">
            <label htmlFor="mobile">Mobile</label>
            <input
              type="text"
              id="mobile"
              placeholder="Enter your mobile"
              className="p-2 bg-blue-50 outline-none border focus-within:border-primary-200 rounded"
              value={userData.mobile}
              name="mobile"
              onChange={handleOnChange}
              required
            />
          </div>

          <button className="border px-4 py-2 font-semibold hover:bg-primary-100 border-primary-100 text-primary-200 hover:text-neutral-800 rounded">
            submit
          </button>
        </form>
      </div>
    </section>
  );
}

export default Profile;
