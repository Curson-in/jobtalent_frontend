import React, { useEffect, useState, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as profileService from '../services/profileService.js';
import { AuthContext } from '../context/AuthContext.jsx';
import SubscriptionCard from '../components/subscription/SubscriptionCard.jsx';
import NavbarPremium from "../components/NavbarPremium";
import '../assets/css/TalentProfile.css'




export default function TalentProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);
  const fileInputRef = useRef(null);
  const resumeInputRef = useRef(null);
  const [notification, setNotification] = useState(null);
 
const { subscription } = useContext(AuthContext);

const isFreePlan =
  !subscription ||
  !subscription.plan ||
  subscription.plan.toLowerCase() === "free";


  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const safeSetProfile = (updater) => {
  setProfile((prev) => ({
    ...prev,
    ...updater
  }));
};

const showToast = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  useEffect(() => {
    const load = async () => {
      try {
        const res = await profileService.getTalentProfile();
        console.log('PROFILE FROM API:', res.profile);
        setProfile(res.profile);
      } catch (err) {
        console.error('Failed to load profile', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file');
      return;
    }

    setUploadingPhoto(true);
    try {
      const res = await profileService.uploadProfilePhoto(file);
      setProfile((prev) => ({
        ...prev,
        profile_picture_url: res.profile_picture_url
      }));
    } catch (err) {
      console.error('Photo upload failed:', err);
      alert('Failed to upload photo. Please try again.');
    } finally {
      setUploadingPhoto(false);
    }
  };



  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert('Only PDF resumes are allowed');
      return;
    }

    setUploadingResume(true);
    try {
      const res = await profileService.uploadResume(file);
      setProfile((prev) => ({
        ...prev,
        resume: res.resume
      }));
    } catch (err) {
      console.error('Resume upload failed:', err);
      alert('Failed to upload resume. Please try again.');
    } finally {
      setUploadingResume(false);
    }
  };

 const handleBoostProfile = async () => {
    if (isFreePlan) {
      navigate("/pricing");
      return;
    }

    try {
      const res = await profileService.boostProfile();

      safeSetProfile({
        is_boosted: true,
        boost_expires_at: res.expires_at,
      });

      // ✅ Use Toast instead of Alert
      showToast("🚀 Profile boosted successfully!", "success");
    } catch (err) {
      showToast(err.response?.data?.message || "Boost failed", "error");
    }
  };

 const calculateCompletion = (profile) => {
  if (!profile) return 0;

  const fields = [
    profile.desired_role,
    profile.city,
    profile.experience,
    profile.education,
    profile.summary,
    profile.projects,
    profile.experience_details,
    profile.resume,
    profile.profile_picture_url,
    profile.skills?.length > 0,
    profile.github_url || profile.linkedin_url || profile.portfolio_url
  ];

  return Math.round(
    (fields.filter(Boolean).length / fields.length) * 100
  );
};


  if (loading) {
    return (
      <div className="profile-container">
        <div className="container-premium">
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading your profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="profile-container">
        <div className="container-premium">
          <div className="empty-state">
            <svg className="empty-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h3>No profile found</h3>
            <p>Unable to load your profile information</p>
          </div>
        </div>
      </div>
    );
  }

  const completion = calculateCompletion(profile);

  return (

    <> 
    <NavbarPremium active="write" />

    <div className="profile-container">
      <div className="container-premium">
        {/* Back Navigation */}
        <div className="profile-nav">
  <Link
    to="/talent/dashboard"
    className="back-link"
  >
    <svg className="back-icon" viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
        clipRule="evenodd"
      />
    </svg>
    Back to Dashboard
  </Link>
</div>

        {/* Profile Header */}
       <div className="profile-header">

  {/* LEFT SIDE */}
  <div className="profile-header-left">
  <div
    className="profile-avatar-large"
    onClick={() => !uploadingPhoto && fileInputRef.current.click()}
  >
    {profile.profile_picture_url ? (
      /* --- CASE 1: PHOTO EXISTS --- */
      <>
        <img
          src={profile.profile_picture_url}
          className="profile-avatar-img"
          alt="Profile"
        />
        {/* Overlay only appears on hover to Change */}
        <div className="avatar-overlay">
          <span className="overlay-btn"> Change</span>
        </div>
      </>
    ) : (
      /* --- CASE 2: NO PHOTO (Empty State) --- */
      <div className="avatar-empty-state">
        <svg className="avatar-placeholder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
        </svg>
        <span className="upload-text-label">Upload Photo</span>
      </div>
    )}

    <input
      type="file"
      ref={fileInputRef}
      hidden
      accept="image/*"
      onChange={handlePhotoUpload}
    />
  </div>

  <div className="profile-header-content">
    <h1 className="profile-name">
      {profile?.user?.first_name
        ? `${profile.user.first_name} ${profile.user.last_name}`
        : 'Your Profile'}
    </h1>

    <div className="completion-badge-wrapper">
      <div className="completion-badge">
        <span>{completion}% Complete</span>
      </div>
    </div>
  </div>
</div>

  {/* RIGHT SIDE – SUBSCRIPTION + BOOST */}
  
  <div className="profile-header-right">
<div
  className={`premium-cards premium-cards-dense ${
    isFreePlan ? "single-card" : ""
  }`}
>
    {/* Subscription Card */}
   {!isFreePlan && profile?.subscription && (
  <SubscriptionCard subscription={profile.subscription} />
)}



{/* Profile Boost */}
{profile?.subscription && (
  <>
    {profile.is_boosted ? (
      // 🔥 Compact Active State (No changes here)
      <div className="profile-card boost-card-active">
        <div className="boost-active-content">
          <div className="boost-icon-pulse">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
          <div className="boost-text-wrapper">
            <h4 className="boost-active-title">Boost Active</h4>
            <p className="boost-active-sub">Priority visibility enabled</p>
          </div>
        </div>
      </div>
    ) : (
      // Standard State (Not Boosted) - ✅ POINTS ADDED BACK HERE
      <div className="profile-card boost-card premium-card">
        <div className="boost-header">
          <h3 className="boost-title">Profile Boost</h3>
        </div>
        
        <p className="boost-desc">
          Your profile gets <strong>priority placement</strong>, increasing visibility and response rate.
        </p>

        {/* 👇 Added these benefits back */}
        <ul className="boost-benefits">
          <li>✔ Priority recruiter visibility</li>
          <li>✔ Higher ranking in search</li>
          <li>✔ Faster responses</li>
          <li>✔ Shown before free profiles</li>
        </ul>

        <button className="btn-boost-primary btn-primary btn-muted" onClick={handleBoostProfile}>
          Boost Profile
        </button>
      </div>
    )}
  </>
)}
</div>
  </div>
</div>

 <div className="profile-card">
            <div className="card-header">
              <div className="card-header-content">
                <svg className="card-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 10V3L4 14H11L11 21L20 10L13 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <h2 className="card-title">Quick Actions</h2>
              </div>
            </div>
            
            <div className="card-content">
              <div className="action-list">
                <button
                  className="action-item"
                  onClick={() => navigate('/profile/edit')}
                >
                  <div className="action-icon-wrapper action-icon-blue">
                    <svg className="action-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11 5H6C5.46957 5 4.96086 5.21071 4.58579 5.58579C4.21071 5.96086 4 6.46957 4 7V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20H17C17.5304 20 18.0391 19.7893 18.4142 19.4142C18.7893 19.0391 19 18.5304 19 18V13M17.5 3.5C17.8978 3.1022 18.4374 2.87868 19 2.87868C19.5626 2.87868 20.1022 3.1022 20.5 3.5C20.8978 3.8978 21.1213 4.43739 21.1213 5C21.1213 5.56261 20.8978 6.1022 20.5 6.5L12 15H9V12L17.5 3.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="action-content">
                    <div className="action-title">Edit Profile</div>
                    <div className="action-description">Update your information</div>
                  </div>
                  <svg className="action-arrow" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                <button
  className="action-item"
  onClick={() => !uploadingResume && resumeInputRef.current.click()}
  disabled={uploadingResume}
>
  <div className="action-icon-wrapper action-icon-purple">
    <svg className="action-icon" viewBox="0 0 24 24" fill="none">
      <path
        d="M21 15V19C21 19.53 20.79 20.04 20.41 20.41C20.04 20.79 19.53 21 19 21H5C4.47 21 3.96 20.79 3.59 20.41C3.21 20.04 3 19.53 3 19V15M17 8L12 3M12 3L7 8M12 3V15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>

  <div className="action-content">
    <div className="action-title">
      {profile.resume ? 'Change Resume' : 'Upload Resume'}
    </div>
    <div className="action-description">
      {profile.resume
        ? 'Replace your existing resume'
        : 'Upload your resume (PDF)'}
    </div>
  </div>
  <input
  type="file"
  ref={resumeInputRef}
  hidden
  accept="application/pdf"
  onChange={handleResumeUpload}
/>


  {uploadingResume ? (
    <div className="action-spinner" />
  ) : (
    <svg className="action-arrow" viewBox="0 0 24 24" fill="none">
      <path
        d="M9 18L15 12L9 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )}
</button>

              </div>
            </div>
          </div>
          

        {/* Profile Grid - Better Organization */}
        <div className="profile-grid">
          <div className="profile-column-left">
             {/* Professional Summary */}
<div className="profile-card">
  <div className="card-header">
    <div className="card-header-content">
      <h2 className="card-title">Professional Summary</h2>
    </div>
  </div>

  <div className="card-content">
    <p className="field-value">
      {profile.summary || (
        <span className="field-empty">
          Add a short summary about your skills and career goals.
        </span>
      )}
    </p>
  </div>
</div>

{/* Projects */}
<div className="profile-card">
  <div className="card-header">
    <div className="card-header-content">
      <h2 className="card-title">Projects</h2>
    </div>
  </div>

  <div className="card-content">
    {profile.projects ? (
      <p className="field-value" style={{ whiteSpace: 'pre-line' }}>
        {profile.projects}
      </p>
    ) : (
      <span className="field-empty">No projects added yet</span>
    )}
  </div>
</div>

         {/* Experience */}
<div className="profile-card">
  <div className="card-header">
    <div className="card-header-content">
      <h2 className="card-title">Experience</h2>
    </div>
  </div>

  <div className="card-content">
    {profile.experience_details ? (
      <p className="field-value" style={{ whiteSpace: 'pre-line' }}>
        {profile.experience_details}
      </p>
    ) : (
      <span className="field-empty">
        Fresher / Open to opportunities
      </span>
    )}
  </div>
</div>





          </div>


       <div className="profile-column-right">
        {/* Professional Information Card - 8 columns */}
          <div className="profile-card">
            <div className="card-header">
              <div className="card-header-content">
                <svg className="card-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <h2 className="card-title">Professional Information</h2>
              </div>
            </div>
            
            <div className="card-content">
              <div className="profile-field">
                <label className="field-label">Desired Role</label>
                <div className="field-value">
                  {profile.desired_role || (
                    <span className="field-empty">
                      <svg className="empty-icon-sm" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                      </svg>
                      Not set
                    </span>
                  )}
                </div>
              </div>

              <div className="profile-field">
                <label className="field-label">Location</label>
                <div className="field-value field-with-icon">
                  <svg className="field-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor"/>
                  </svg>
                  {profile.city || (
                    <span className="field-empty">
                      <svg className="empty-icon-sm" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                      </svg>
                      Not set
                    </span>
                  )}
                </div>
              </div>

              <div className="profile-field">
                <label className="field-label">Experience</label>
                <div className="field-value">
                  {profile.experience || (
                    <span className="field-empty">
                      <svg className="empty-icon-sm" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                      </svg>
                      Not set
                    </span>
                  )}
                </div>
              </div>

              <div className="profile-field">
                <label className="field-label">Education</label>
                <div className="field-value">
                  {profile.education || (
                    <span className="field-empty">
                      <svg className="empty-icon-sm" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                      </svg>
                      Not set
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

 {/* Quick Actions Card - 4 columns */}
         

 {/* Resume Card - 6 columns */}
          

{/* Skills Card - 6 columns */}
          <div className="profile-card">
            <div className="card-header">
              <div className="card-header-content">
                <svg className="card-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <h2 className="card-title">Skills</h2>
              </div>
            </div>
            
            <div className="card-content">
              {profile.skills?.length ? (
                <div className="skills-list">
                  {profile.skills.map((skill, index) => (
                    <span key={index} className="skill-chip">
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="field-empty">
                  <svg className="empty-icon-sm" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                  </svg>
                  No skills added yet
                </span>
              )}
            </div>
          </div>


          {/* Online Profiles */}
<div className="profile-card">
  <div className="card-header">
    <div className="card-header-content">
      <svg className="card-icon" viewBox="0 0 24 24" fill="none">
        <path
          d="M10 13a5 5 0 007.07 0l1.41-1.41a5 5 0 00-7.07-7.07L10 5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M14 11a5 5 0 00-7.07 0L5.51 12.41a5 5 0 007.07 7.07L14 19"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <h2 className="card-title">Add Links</h2>
    </div>
  </div>

  <div className="card-content">
    {(profile.github_url || profile.linkedin_url || profile.portfolio_url) ? (
      <div className="online-links">
        {profile.github_url && (
          <a className="online-link" href={profile.github_url} target="_blank">
            GitHub
          </a>
        )}
        {profile.linkedin_url && (
          <a className="online-link" href={profile.linkedin_url} target="_blank">
            LinkedIn
          </a>
        )}
        {profile.portfolio_url && (
          <a className="online-link" href={profile.portfolio_url} target="_blank">
            Portfolio
          </a>
        )}
      </div>
    ) : (
      <div className="online-empty">
        <p className="field-empty">No links added yet</p>

        <button
          className="add-profile-btn"
          onClick={() => navigate('/profile/edit')}
        >
          + Add Portfolio Link
        </button>
      </div>
    )}
  </div>
</div>

        </div>

        </div> 
 
          

          



        {/* Profile Stats */}
        <div className="profile-stats">
          <div className="stat-card">
            <div className="stat-icon-wrapper stat-icon-emerald">
              <svg className="stat-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="stat-content">
              <div className="stat-value">{completion}%</div>
              <div className="stat-label">Profile Complete</div>
              <div className="progress-bar-wrapper">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${completion}%` }}
                />
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper stat-icon-blue">
              <svg className="stat-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="stat-content">
              <div className="stat-value">{profile.skills?.length || 0}</div>
              <div className="stat-label">Skills Added</div>
            </div>
          </div>

          <div
  className={`stat-card ${profile.resume ? 'stat-card-clickable' : ''}`}
  onClick={() => {
    if (profile.resume) {
      window.open(profile.resume, '_blank');
    }
  }}
  style={{ cursor: profile.resume ? 'pointer' : 'default' }}
>
  <div className="stat-icon-wrapper stat-icon-purple">
    <svg
      className="stat-icon"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 12H15M9 16H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L18.7071 8.70711C18.8946 8.89464 19 9.149 19 9.41421V19C19 20.1046 18.1046 21 17 21Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>

  <div className="stat-content">
    <div className="stat-value">
      {profile.resume ? 'Yes' : 'No'}
    </div>
    <div className="stat-label">Resume Uploaded</div>
  </div>
</div>

        </div>
      </div>
    </div>

    {notification && (
        <div className={`toast-notification ${notification.type}`}>
          <div className="toast-content">
            {notification.type === 'success' ? (
              <svg className="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            )}
            <span>{notification.message}</span>
          </div>
          <button onClick={() => setNotification(null)} className="toast-close">×</button>
        </div>
      )}

    </>
  );
}