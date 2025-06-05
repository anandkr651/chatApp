import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import SummaryApi from "../common/SummaryApi";
import { MdOutlineMailOutline } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { setUserDetails } from "../store/userSlice";
import { useDispatch } from "react-redux";
import fetchUserDetails from "../utils/fetchUserDetails";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const valideValue = Object.values(data).every((el) => el);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({
        ...SummaryApi.login,
        data: data,
      });

      if (response.data.success) {
        toast.success(response.data.message);

        localStorage.setItem("accessToken", response.data.data);
        
        const userDetails = await fetchUserDetails();
        dispatch(setUserDetails(userDetails.data.data));

        setData({
          email: "",
          password: "",
        });
        navigate("/");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  return (
    <div className="w-full container mx-auto px-5 h-screen flex items-center justify-between">
      <div className="my-4 w-full max-w-lg mx-auto rounded p-7 border">
        <form onSubmit={handleSubmit}>
          <h1 className="text-center text-3xl font-extrabold text-green-800 ">
            Text App
          </h1>
          <h2 className="text-2xl font-extrabold text-gray-700 py-2">Login</h2>
          <div className="grid gap-3">
            <div className="flex items-center justify-centre gap-2">
              <label htmlFor="email">
                <MdOutlineMailOutline size={35} />
              </label>
              <input
                type="email"
                id="email"
                className="bg-blue-50 p-2 border rounded outline-none focus:border-[#ffbf00] w-full text-gray-800"
                name="email"
                value={data.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>
            <div className="flex items-center justify-center gap-2">
              <label htmlFor="password">
                <TbLockPassword size={35} />
              </label>
              <input
                type="password"
                id="password"
                className="bg-blue-50 p-2 border rounded outline-none focus:border-[#ffbf00] w-full text-gray-800"
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
            </div>
            <button
              disabled={!valideValue}
              className={`${
                valideValue
                  ? "bg-green-800 hover:bg-green-700"
                  : "bg-gray-500 cursor-not-allowed"
              } text-white py-2 rounded font-semibold my-3 tracking-wide`}
            >
              Login
            </button>
          </div>
        </form>

        <p>
          Don't have account?{" "}
          <Link
            to={"/Register"} //go to pages/Register
            className="font-semibold text-green-700 hover:text-green-800"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
