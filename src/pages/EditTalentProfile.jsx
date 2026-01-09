import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import * as profileService from '../services/profileService';
import { AuthContext } from '../context/AuthContext';

export default function EditTalentProfile() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext); // ✅ MUST BE HERE

  const [form, setForm] = useState({
  desired_role: '',
  city: '',
  experience: '',
  education: '',
  skills: '',
  linkedin_url: '',
  github_url: '',
  portfolio_url: '',
  summary: '',
  projects: '',
  experience_details: ''
});


  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await profileService.getTalentProfile();
        const p = res.profile;

        setForm({
  desired_role: p.desired_role || '',
  city: p.city || '',
  experience: p.experience || '',
  education: p.education || '',
  skills: p.skills ? p.skills.join(', ') : '',
  linkedin_url: p.linkedin_url || '',
  github_url: p.github_url || '',
  portfolio_url: p.portfolio_url || '',
  summary: p.summary || '',
  projects: p.projects || '',
  experience_details: p.experience_details || ''
});

      } catch (err) {
        console.error('Failed to load profile', err);
      } finally {
        setLoading(false); // ✅ ALWAYS EXECUTES
      }
    };

    loadProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await profileService.updateTalentProfile({
      desired_role: form.desired_role,
      city: form.city,
      experience: form.experience,
      education: form.education,
      summary: form.summary,
      projects: form.projects,
      experience_details: form.experience_details,
      skills: form.skills.split(',').map(s => s.trim()),
      linkedin_url: form.linkedin_url,
      github_url: form.github_url,
      portfolio_url: form.portfolio_url
    });

    // ✅ SAFE NAVIGATION ONLY AFTER SUCCESS
    navigate('/talent/profile', { replace: true });

  } catch (err) {
    console.error('Update failed', err);
    alert('Failed to update profile');
  }
};

  if (loading) return <p style={{ padding: 40 }}>Loading...</p>;

  return (
    <div className="profile-container">
      <div className="container-premium">
        <h2 className="profile-name">Edit Profile</h2>

        <form
          onSubmit={handleSubmit}
          className="profile-card profile-card-main"
          style={{ padding: 24 }}
        >
          <label className="field-label">Desired Role</label>
          <input
            name="desired_role"
            value={form.desired_role}
            onChange={handleChange}
            className="search-input"
          />

          <label className="field-label">City</label>
          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            className="search-input"
          />

          <label className="field-label">Experience</label>
          <input
            name="experience"
            value={form.experience}
            onChange={handleChange}
            className="search-input"
          />

          <label className="field-label">Education</label>
          <input
            name="education"
            value={form.education}
            onChange={handleChange}
            className="search-input"
          />

          <label className="field-label">Skills (comma separated)</label>
          <input
            name="skills"
            value={form.skills}
            onChange={handleChange}
            className="search-input"
          />
         <label className="field-label">LinkedIn Profile</label>
<input
  name="linkedin_url"
  value={form.linkedin_url}
  onChange={handleChange}
  className="search-input"
  placeholder="https://linkedin.com/in/username"
/>

<label className="field-label">GitHub Profile</label>
<input
  name="github_url"
  value={form.github_url}
  onChange={handleChange}
  className="search-input"
  placeholder="https://github.com/username"
/>

<label className="field-label">Portfolio / Website</label>
<input
  name="portfolio_url"
  value={form.portfolio_url}
  onChange={handleChange}
  className="search-input"
  placeholder="https://yourwebsite.com"
/>

<label className="field-label">Professional Summary</label>
<textarea
  name="summary"
  value={form.summary}
  onChange={handleChange}
  className="search-input"
  rows={4}
/>

<label className="field-label">Projects</label>
<textarea
  name="projects"
  value={form.projects}
  onChange={handleChange}
  className="search-input"
  rows={4}
  placeholder="• Project name – tech – what you built"
/>

<label className="field-label">Experience Details</label>
<textarea
  name="experience_details"
  value={form.experience_details}
  onChange={handleChange}
  className="search-input"
  rows={4}
  placeholder="Internship / freelance / practical exposure"
/>


          <div style={{ marginTop: 20, display: 'flex', gap: 12 }}>
            <button type="submit" className="apply-btn">
              Save Changes
            </button>

            <button
              type="button"
              className="nav-btn"
              onClick={() => navigate('/talent/profile')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}