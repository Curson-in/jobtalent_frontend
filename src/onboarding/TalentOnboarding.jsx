import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import * as profileService from '../services/profileService';
import "../assets/css/onboarding.css";

import {
  Briefcase,
  MapPin,
  Target,
  Upload,
  FileText,
  X,
  CheckCircle,
  Loader2
} from 'lucide-react';

export default function TalentOnboarding() {
  const [form, setForm] = useState({
    city: '',
    desired_role: '',
    experience: '',
    skills: '',
    education: '',
    resume: null,
  });

  const [errors, setErrors] = useState({});
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) handleFile(file);
  };

  const handleFile = (file) => {
    if (file.type !== 'application/pdf') {
      setErrors((p) => ({ ...p, resume: 'Only PDF files are allowed.' }));
      return;
    }
    setForm((p) => ({ ...p, resume: file }));
    setErrors((p) => ({ ...p, resume: '' }));
  };

  // Drag and Drop Handlers
  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const removeResume = (e) => {
    e.stopPropagation(); // Prevent triggering file input
    setForm((p) => ({ ...p, resume: null }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.city.trim()) newErrors.city = 'City is required';
    if (!form.desired_role.trim()) newErrors.desired_role = 'Role is required';
    if (!form.experience) newErrors.experience = 'Experience is required';
    if (!form.skills.trim()) newErrors.skills = 'Skills are required';
    if (!form.education.trim()) newErrors.education = 'Education is required';
    
    // 🔥 REQUIRED RESUME VALIDATION
    if (!form.resume) newErrors.resume = 'You must upload a resume to continue.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      // Simulate API delay for better UX if needed, or just call directly
      const res = await profileService.createTalentProfile({
        city: form.city,
        desired_role: form.desired_role,
        experience: form.experience,
        skills: form.skills.split(',').map(s => s.trim()),
        education: form.education,
        resume: form.resume,
      });

      setUser(prev => {
        const mergedUser = { ...prev, isOnboarded: true };
        localStorage.setItem('user', JSON.stringify(mergedUser));
        return mergedUser;
      });

      navigate('/talent/dashboard', { replace: true });
    } catch (err) {
      console.error('Onboarding failed', err);
      alert('Failed to complete onboarding');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="onboarding-page">
      <div className="onboarding-bg-shape"></div>
      <div className="onboarding-card">
        <div className="onboarding-header">
          <h1 className="onboarding-title">Let's build your profile</h1>
          <p className="onboarding-subtitle">
            Help us match you with the best engineering teams.
          </p>
        </div>

        <div className="onboarding-form">
          {/* CITY */}
          <div className="input-group">
            <label className="onboarding-label">
              <MapPin size={16} className="icon-subtle" /> Current City
            </label>
            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              className={`onboarding-input ${errors.city ? 'error' : ''}`}
              placeholder="e.g. Pune, Bangalore"
            />
            {errors.city && <span className="error-msg">{errors.city}</span>}
          </div>

          {/* ROLE */}
          <div className="input-group">
            <label className="onboarding-label">
              <Target size={16} className="icon-subtle" /> Desired Role
            </label>
            <input
              name="desired_role"
              value={form.desired_role}
              onChange={handleChange}
              className={`onboarding-input ${errors.desired_role ? 'error' : ''}`}
              placeholder="e.g. Frontend Developer"
            />
            {errors.desired_role && <span className="error-msg">{errors.desired_role}</span>}
          </div>

          {/* EXPERIENCE */}
          <div className="input-group">
            <label className="onboarding-label">
              <Briefcase size={16} className="icon-subtle" /> Experience
            </label>
            <select
              name="experience"
              value={form.experience}
              onChange={handleChange}
              className={`onboarding-select ${errors.experience ? 'error' : ''}`}
            >
              <option value="">Select Experience Level</option>
              <option value="Fresher">Fresher (0 years)</option>
              <option value="0-1 years">0-1 years</option>
              <option value="1-3 years">1-3 years</option>
              <option value="3-5 years">3-5 years</option>
              <option value="5+ years">5+ years</option>
            </select>
            {errors.experience && <span className="error-msg">{errors.experience}</span>}
          </div>

          {/* EDUCATION */}
          <div className="input-group">
            <label className="onboarding-label">Education</label>
            <input
              name="education"
              value={form.education}
              onChange={handleChange}
              className={`onboarding-input ${errors.education ? 'error' : ''}`}
              placeholder="Degree"
            />
            {errors.education && <span className="error-msg">{errors.education}</span>}
          </div>

          {/* SKILLS - Full Width */}
          <div className="input-group full-width">
            <label className="onboarding-label">Skills</label>
            <input
              name="skills"
              value={form.skills}
              onChange={handleChange}
              className={`onboarding-input ${errors.skills ? 'error' : ''}`}
              placeholder="React, Java, SQL, Python..."
            />
            {errors.skills && <span className="error-msg">{errors.skills}</span>}
          </div>

          {/* RESUME UPLOAD - Drag & Drop */}
          <div className="input-group full-width">
            <label className="onboarding-label">Resume (PDF)</label>
            
            {!form.resume ? (
              <label 
                className={`file-upload-zone ${isDragging ? 'dragging' : ''} ${errors.resume ? 'error-border' : ''}`}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
              >
                <div className="upload-content">
                  <div className="icon-circle">
                    <Upload size={24} color="#6366f1" />
                  </div>
                  <div className="upload-text">
                    <span className="link-text">Click to upload</span> or drag and drop
                  </div>
                  <span className="upload-subtext">PDF only (Max 5MB)</span>
                </div>
                <input
                  type="file"
                  name="resume"
                  accept=".pdf"
                  onChange={handleFileChange}
                  hidden
                />
              </label>
            ) : (
              <div className="file-uploaded-state">
                <div className="file-info">
                  <FileText size={24} className="file-icon" />
                  <div className="file-details">
                    <span className="file-name">{form.resume.name}</span>
                    <span className="file-size">{(form.resume.size / 1024 / 1024).toFixed(2)} MB</span>
                  </div>
                </div>
                <button onClick={removeResume} className="remove-file-btn">
                  <X size={18} />
                </button>
              </div>
            )}
            
            {errors.resume && <span className="error-msg center-text">{errors.resume}</span>}
          </div>

          {/* SUBMIT */}
          <button
            className="onboarding-submit"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={20} /> Creating Profile...
              </>
            ) : (
              <>Complete Profile & View Jobs</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}