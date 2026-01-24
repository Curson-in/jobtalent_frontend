import axios from "axios";

export const createRazorpayOrder = async (plan) => {
  const token = localStorage.getItem("auth_token");

  const { data } = await axios.post(
    `${import.meta.env.VITE_API_URL}/razorpay/create-order`,
    { plan },
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );

  return data;
};

export const verifyRazorpayPayment = async (payload) => {
  const token = localStorage.getItem("auth_token");

  const { data } = await axios.post(
    `${import.meta.env.VITE_API_URL}/razorpay/verify`,
    payload,
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );

  return data;
};
