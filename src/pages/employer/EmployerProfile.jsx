import { useEffect, useState } from 'react';
import {
  getEmployerProfile,
  updateEmployerProfile
} from '../../services/employerService';
import api from '../../services/api'; 
import NavbarPremium from "../../components/NavbarPremium"; 
import { Building2, Globe, MapPin, Users, Mail, Edit2, CheckCircle, Save, X, Camera } from 'lucide-react';
import '../../assets/css/employerprofile.css';

export default function EmployerProfile() {
  const [company, setCompany] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await getEmployerProfile();
      setCompany(res.data);
      setForm(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

// ... existing imports

  // ✅ FIX: Update the upload function
  const uploadLogo = async () => {
    if (!logoFile) return form.logo_url;

    const formData = new FormData();
    // ⚠️ CRITICAL: Backend expects 'photo', not 'file'
    formData.append('photo', logoFile); 

    try {
      // ✅ FIX: Use the existing route defined in your backend
      const res = await api.post('/profile/photo', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      // The backend likely returns the URL in res.data.profile_picture_url or res.data.url
      // We check both just in case
      return res.data.url || res.data.profile_picture_url;
      
    } catch (err) {
      console.error("Logo upload failed", err);
      alert("Failed to upload logo. Please check your connection.");
      return null;
    }
  };

  // ... rest of the component
  const handleSave = async () => {
    setUploading(true);
    try {
      let finalLogoUrl = form.logo_url;

      // 1. Upload Logo if changed
      if (logoFile) {
        const uploadedUrl = await uploadLogo();
        if (uploadedUrl) {
          finalLogoUrl = uploadedUrl;
        } else {
          setUploading(false);
          return; // Stop if upload failed
        }
      }

      // 2. Update Profile
      const updatedForm = { ...form, logo_url: finalLogoUrl };
      await updateEmployerProfile(updatedForm);
      
      setCompany(updatedForm);
      setForm(updatedForm);
      setEditing(false);
      setLogoFile(null);
      // Keep preview until page refresh or just use the new URL
      setLogoPreview(null); 
      
    } catch (err) {
      console.error(err);
      alert("Failed to save profile.");
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <div className="profile-loading"><div className="spinner"></div></div>;
  if (!company) return <div className="profile-error">Failed to load profile.</div>;

  return (
    <>
      <div className="ep-container">
        <div className="ep-wrapper">
          
          <div className="ep-header">
            <div className="ep-cover-photo"></div>
            
            <div className="ep-header-content">
              <div className="ep-logo-wrapper">
                {logoPreview || company.logo_url ? (
                  <img 
                    src={logoPreview || company.logo_url} 
                    alt="Logo" 
                    className="ep-logo-img" 
                  />
                ) : (
                  <div className="ep-logo-placeholder">
                    {company.name?.[0]?.toUpperCase() || "C"}
                  </div>
                )}

                {editing && (
                  <div className="ep-logo-edit">
                    <label htmlFor="logo-upload" className="ep-logo-label">
                      <Camera size={14} /> Change
                    </label>
                    <input 
                      id="logo-upload" 
                      type="file" 
                      accept="image/*"
                      hidden 
                      onChange={handleLogoChange} 
                    />
                  </div>
                )}
              </div>

              <div className="ep-info">
                <div className="ep-title-row">
                  {editing ? (
                    <input 
                      className="ep-input-title" 
                      name="name" 
                      value={form.name || ''} 
                      onChange={handleChange} 
                      placeholder="Company Name"
                    />
                  ) : (
                    <h1 className="ep-name">
                      {company.name} 
                      <CheckCircle size={20} className="ep-verified-icon" fill="#3b82f6" color="white" />
                    </h1>
                  )}
                  
                  {!editing && (
                    <button className="ep-btn-edit" onClick={() => setEditing(true)}>
                      <Edit2 size={16} /> Edit Profile
                    </button>
                  )}
                </div>

                <p className="ep-tagline">
                  {editing ? (
                    <input className="ep-input-sub" name="industry" value={form.industry || ''} onChange={handleChange} placeholder="E.g. SaaS" />
                  ) : (
                    company.industry || "Add Industry"
                  )}
                  <span> • </span>
                  {editing ? (
                     <input className="ep-input-sub" name="location" value={form.location || ''} onChange={handleChange} placeholder="HQ Location" />
                  ) : (
                    company.location || "Add Location"
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="ep-grid">
            {/* LEFT COLUMN */}
            <div className="ep-main-col">
              <div className="ep-card">
                <h3 className="ep-card-title">About</h3>
                {editing ? (
                  <textarea
                    className="ep-textarea"
                    name="description"
                    value={form.description || ''}
                    onChange={handleChange}
                    rows={8}
                    placeholder="Tell candidates about your company..."
                  />
                ) : (
                  <p className="ep-description">
                    {company.description || <span className="ep-placeholder-text">No description added yet.</span>}
                  </p>
                )}
              </div>

              {editing && (
                <div className="ep-edit-actions">
                  <button className="ep-btn-cancel" onClick={() => { 
                    setEditing(false); 
                    setForm(company); 
                    setLogoFile(null);
                    setLogoPreview(null);
                  }}>
                    <X size={18} /> Cancel
                  </button>
                  <button className="ep-btn-save" onClick={handleSave} disabled={uploading}>
                    {uploading ? "Saving..." : <><Save size={18} /> Save Changes</>}
                  </button>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN */}
            <div className="ep-sidebar">
              <div className="ep-card ep-details-card">
                <h3 className="ep-card-title">Company Details</h3>
                
                <div className="ep-detail-item">
                  <Globe size={18} className="ep-icon" />
                  <div className="ep-detail-content">
                    <span className="ep-label">Website</span>
                    {editing ? (
                      <input className="ep-input-sm" name="website" value={form.website || ''} onChange={handleChange} placeholder="https://..." />
                    ) : (
                      <a href={company.website} target="_blank" rel="noreferrer" className="ep-link">
                        {company.website || "Add website"}
                      </a>
                    )}
                  </div>
                </div>

                <div className="ep-detail-item">
                  <Users size={18} className="ep-icon" />
                  <div className="ep-detail-content">
                    <span className="ep-label">Company Size</span>
                    {editing ? (
                      <select className="ep-select-sm" name="company_size" value={form.company_size || ''} onChange={handleChange}>
                        <option value="">Select size</option>
                        <option value="1-10">1-10 Employees</option>
                        <option value="11-50">11-50 Employees</option>
                        <option value="51-200">51-200 Employees</option>
                        <option value="200+">200+ Employees</option>
                      </select>
                    ) : (
                      <span>{company.company_size || "Add size"}</span>
                    )}
                  </div>
                </div>

                <div className="ep-detail-item">
                  <MapPin size={18} className="ep-icon" />
                  <div className="ep-detail-content">
                    <span className="ep-label">Headquarters</span>
                    {editing ? (
                      <input className="ep-input-sm" name="location" value={form.location || ''} onChange={handleChange} />
                    ) : (
                      <span>{company.location || "Add location"}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* ✅ FIX 2: Gmail Redirection */}
              <div className="ep-card ep-support-card">
                <div className="ep-support-header">
                  <div className="ep-support-icon"><Mail size={20} /></div>
                  <div>
                    <h4>Need Help?</h4>
                    <p>Contact Curson Support</p>
                  </div>
                </div>
                <p className="ep-support-text">
                  Facing issues with your profile or job postings? Our team is here to help.
                </p>
                <a 
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=admin@curson.in" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="ep-btn-support"
                >
                  Contact Support
                </a>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}