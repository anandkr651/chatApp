const SummaryApi = {
  login: {
    url: "/api/v1/user/login",
    method: "post",
  },
  register: {
    url: "/api/v1/user/register",
    method: "post",
  },
  allUserExceptOnline: {
    url: "/api/v1/user/allUserExceptOnline",
    method: "get",
  },
  userDetails: {
    url: "/api/v1/user/userDetails",
    method: "get",
  },
  updateProfile: {
    url: "/api/v1/user/updateProfile",
    method: "post",
  },
  updateAvatar: {
    url: "/api/v1/user/updateAvatar",
    method: "post",
  },
  logout: {
    url: "/api/v1/user/logout",
    method: "get",
  },
};
export default SummaryApi;
