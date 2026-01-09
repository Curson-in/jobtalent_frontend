import api from "./api";

export const sendFollowUp = (data) => {
  console.log("📤 Sending follow-up payload:", data);
  return api.post("/messages", data);
};


export const getFollowUpsForJob = (jobId) =>
  api.get(`/messages/job/${jobId}`);
