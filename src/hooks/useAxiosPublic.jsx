import axios from "axios";
import React from "react";

const axiosPublic = axios.create({
  baseURL: "https://restaurant-website-foody-server.vercel.app/",
});

function useAxiosPublic() {
  return axiosPublic;
}

export default useAxiosPublic;
