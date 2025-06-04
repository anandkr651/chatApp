import Axios from "./Axios";
import SummaryApi from "../common/SummaryApi";

const fetchUserDetails = async () => {
  try {
    const response = await Axios({
      ...SummaryApi.userDetails,
    });
    return response;
  } catch (error) {
    // console.log(error);
  }
};
export default fetchUserDetails;
