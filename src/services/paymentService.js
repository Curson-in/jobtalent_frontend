import api from "./api";

export const createSubscription = async (plan) => {
  const res = await api.post("/create-subscription", { plan });
  return res.data;
};
