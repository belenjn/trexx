import axios from "axios";
import { API_URL, API_KEY, API_HOST } from "../env";

export const fetchData = async (searchParam: string, endpoint: string) => {
  const options = {
    method: "GET",
    url: `${API_URL}${endpoint}`,
    params: { q: `${searchParam}` },
    headers: {
      "X-RapidAPI-Key": `${API_KEY}`,
      "X-RapidAPI-Host": `${API_HOST}`,
    },
  };

  try {
    const response = await axios.request(options);
    return response
  } catch (error) {
    console.error(error);
  }
};
