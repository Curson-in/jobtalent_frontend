import api from "./api";

export const enhanceResume = async (file) => {
  const formData = new FormData();
  formData.append("resume", file);

  const res = await api.post("/resume/enhance", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

  return res.data;
};
