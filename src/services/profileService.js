import api from './api.js';

/* ===================== TALENT ===================== */

// 🔹 GET talent profile
export const getTalentProfile = async () => {
  const response = await api.get('/profile/talent');
  return response.data;
};

// 🔹 UPDATE talent profile (JSON)
export const updateTalentProfile = async (profileData) => {
  const response = await api.put('/profile/talent', profileData);
  return response.data;
};

// 🔹 CREATE talent profile (ONBOARDING + RESUME)
export const createTalentProfile = async (data) => {
  const formData = new FormData();

  formData.append('city', data.city);
  formData.append('desired_role', data.desired_role); // 🔥 THIS WAS MISSING
  formData.append('experience', data.experience);
  formData.append('education', data.education);

  if (Array.isArray(data.skills)) {
    data.skills.forEach(skill => {
      formData.append('skills', skill);
    });
  }

  if (data.resume) {
    formData.append('resume', data.resume);
  }

  return (await api.post('/profile/talent', formData)).data;
};



/* ===================== COMPANY ===================== */

export const getCompanyProfile = async () => {
  const response = await api.get('/profile/company');
  return response.data;
};

export const createCompanyProfile = async (companyData) => {
  const response = await api.post('/profile/company', companyData);
  return response.data;
};

export const updateCompanyProfile = async (companyData) => {
  const response = await api.put('/profile/company', companyData);
  return response.data;
};

export const uploadProfilePhoto = async (file) => {
  const formData = new FormData();
  formData.append('photo', file);

  const response = await api.post('/profile/photo', formData);
  return response.data;
};

export const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append('resume', file);

  const response = await api.post('/profile/resume', formData);
  return response.data;
};

export const boostProfile = async () => {
  const res = await api.post("/boosts/activate");
  return res.data;
};
