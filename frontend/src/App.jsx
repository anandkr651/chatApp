import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import { Toaster } from "react-hot-toast";
import Profile from "./pages/Profile.jsx";
import { useDispatch, useSelector } from "react-redux";
import GlobalProvider from "./provider/globalProvider.jsx";
import fetchUserDetails from "./utils/fetchUserDetails.js";
import { setUserDetails } from "./store/userSlice.js";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  //why i can use this function "fetchUser". i can store the user data in redux at the time of login.
  //after login - because when i refresh the user data of the redux is empty. so when refresh "fetchUserDetails()" is call. "userDetails" controller can access the cookies. one problem is solve, it can navigate to "/".
  //second problem - when i chat to any person then i refresh then it navigate to "/"
  const fetchUser = async () => {
    try {
      const userDetails = await fetchUserDetails();
      dispatch(setUserDetails(userDetails.data.data));
    } catch (error) {
      // console.log(error);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={user._id ? <Home /> : <Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={user._id ? <Profile /> : <Navigate to="/login" />}/>
      </>
    )
  );

  return (
    <>
      <GlobalProvider>
        <RouterProvider router={router} />
        <Toaster />
      </GlobalProvider>
    </>
  );
}

export default App;
