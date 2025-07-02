import axios from "axios";

const baseURL= "https://devapi.mirar.ai";
const X_API_KEY="42bef730-7a95-475e-990f-ec4e3d450b24"


export const getEmailVerifyService = async (token) => {
  const res = await axios.get(`${baseURL}/api/v1/auth/verifyEmailToken/${token}`, {
    headers: {
      "x-api-key": X_API_KEY,
    },
  });
  return res;
};


export const resetPasswordService = async (userdetails, id, token) => {
  console.log(userdetails,id,token);
  const res = await axios.post(`${baseURL}/api/v1/auth/resetPassword/${id}/${token}`, userdetails, {
    headers: {
      "x-api-key": X_API_KEY,
    },
  });
  return res;
};


