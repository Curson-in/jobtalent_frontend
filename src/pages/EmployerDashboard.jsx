

import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import * as jobService from '../services/jobService.js';
import * as applicationService from '../services/applicationService.js';
import '../assets/css/employer.css';
import { useNavigate } from 'react-router-dom';
import EmployerProfile from './employer/EmployerProfile.jsx';
import { getFollowUpsForJob } from "../services/messageService";
import api, { API_URL } from "../services/api";




export default function EmployerDashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('jobs');
  const [showPostForm, setShowPostForm] = useState(false);
  const [followUps, setFollowUps] = useState([]);

  const followUpsByUser = React.useMemo(() => {
  const map = {};
  followUps.forEach(msg => {
    map[msg.sender_id] = msg;
  });
  return map;
}, [followUps]);




  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    salary: '',
    jobType: 'full-time',
    skills: '',
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
  try {
    setLoading(true);
    const response = await jobService.getEmployerJobs();
    setJobs(response.jobs || []);
  } finally {
    setLoading(false);
  }
};


  const fetchApplications = async (jobId) => {
  try {
    setLoading(true);

    const appsRes = await applicationService.getApplicationsForJob(jobId);
    setApplications(appsRes.applications || []);
    setSelectedJobId(jobId);

    const msgRes = await getFollowUpsForJob(jobId);
    setFollowUps(msgRes.data.messages || []);

  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  if (activeTab === "applications" && selectedJobId) {
    getFollowUpsForJob(selectedJobId)
      .then(res => setFollowUps(res.data.messages || []))
      .catch(console.error);
  }
}, [activeTab, selectedJobId]);



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePostJob = async (e) => {
    e.preventDefault();
    try {
      await jobService.createJob({
        ...formData,
        skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
      });

      setShowPostForm(false);
      setFormData({
        title: '',
        description: '',
        location: '',
        salary: '',
        jobType: 'full-time',
        skills: '',
      });

      fetchJobs();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to post job');
    }
  };

  const handleDeleteJob = async (jobId) => {
  if (!window.confirm('Delete this job?')) return;

  await jobService.deleteJob(jobId);
  fetchJobs();
};



  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const downloadResume = async (filename) => {
  if (!filename) {
    alert("Resume not uploaded");
    return;
  }

  const token = localStorage.getItem("auth_token");

  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/files/resume/${filename}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) throw new Error("Download failed");

  const blob = await res.blob();
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url);
};



  return (
    // Replace ONLY the className attributes with these:
<div className="emp-dashboard-premium">
  {/* NAVBAR */}
  <header className="emp-header-premium">
    <div className="emp-header-inner">
      <div className="emp-logo-premium">Curson</div>
      <div className="emp-user-section">
       
        
        <button className="emp-logout-text" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  </header>

  <main className="emp-main-content">
    {/* TABS */}
   <div className="emp-tabs-section">
  <div className="emp-tabs-nav">
    <button
      className={`emp-tab-btn ${activeTab === 'jobs' ? 'active' : ''}`}
      onClick={() => setActiveTab('jobs')}
    >
      My Jobs
    </button>

    <button
      className={`emp-tab-btn ${activeTab === 'applications' ? 'active' : ''}`}
      onClick={() => setActiveTab('applications')}
      disabled={!selectedJobId}
    >
      Applications
    </button>

    <button
      className={`emp-tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
      onClick={() => setActiveTab('profile')}
    >
      Company Profile
    </button>
  </div>

  <button
    className="emp-post-job-btn"
    onClick={() => setShowPostForm(!showPostForm)}
  >
    + Post Job
  </button>
</div>


    {/* POST JOB FORM */}
    {showPostForm && (
      <section className="emp-job-form-card">
        <div className="emp-form-header">
          <h3>Create Job Posting</h3>
          <button className="emp-form-close" onClick={() => setShowPostForm(false)}>×</button>
        </div>
        <form onSubmit={handlePostJob}>
          <div className="emp-form-row">
            <div className="emp-input-group">
              <label>Job Title</label>
              <input name="title" value={formData.title} onChange={handleInputChange} required />
            </div>
            <div className="emp-input-group">
              <label>Location</label>
              <input name="location" value={formData.location} onChange={handleInputChange} required />
            </div>
          </div>
          <div className="emp-form-row">
            <div className="emp-input-group">
              <label>Salary Range</label>
              <input name="salary" value={formData.salary} onChange={handleInputChange} />
            </div>
            <div className="emp-input-group">
              <label>Job Type</label>
              <select name="jobType" value={formData.jobType} onChange={handleInputChange}>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="freelance">Freelance</option>
              </select>
            </div>
          </div>
          <div className="emp-input-group">
            <label>Description</label>
            <textarea name="description" value={formData.description} onChange={handleInputChange} rows="4" required />
          </div>
          <div className="emp-input-group">
            <label>Skills (comma separated)</label>
            <input name="skills" value={formData.skills} onChange={handleInputChange} />
          </div>
          <div className="emp-form-actions">
            <button type="button" className="emp-btn-secondary" onClick={() => setShowPostForm(false)}>Cancel</button>
            <button type="submit" className="emp-btn-primary">Post Job</button>
          </div>
        </form>
      </section>
    )}

    {/* JOBS CONTENT */}
    {activeTab === 'jobs' && (
      <>
        <h1 className="emp-page-title">Your Job Postings</h1>
        {loading ? (
          <div className="emp-empty-state">
            <div className="emp-loading"></div>
            <p>Loading...</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="emp-empty-state">
           
            <h3>No postings yet</h3>
            <p>Post your first job to attract candidates</p>
          </div>
        ) : (
          <div className="emp-jobs-grid">
            {jobs.map(job => (
              <div key={job.id} className="emp-job-card">
                <div className="emp-job-header">
                  <h3 className="emp-job-title">{job.title}</h3>
                  <div className="emp-job-type">{job.jobType || 'Full-time'}</div>
                </div>
                <div className="emp-job-details">
                  <div className="emp-job-location">{job.location}</div>
                  {job.salary && <div className="emp-job-salary">{job.salary}</div>}
                </div>
                <p className="emp-job-description">{job.description?.substring(0, 100)}...</p>
                <div className="emp-job-actions">
                  <button className="emp-btn-primary" onClick={() => {
                    setActiveTab('applications');
                    fetchApplications(job.id);
                  }}>
                    View Applications
                  </button>
                  <button
  className="emp-btn-danger"
  onClick={() => handleDeleteJob(job.id)}
>
  Delete
</button>

                </div>
              </div>
            ))}
          </div>
        )}
      </>
    )}

    {/* APPLICATIONS CONTENT */}
    {activeTab === 'applications' && (
      <>
        <h1 className="emp-page-title">Job Applications</h1>
        {loading ? (
          <div className="emp-empty-state">
            <div className="emp-loading"></div>
            <p>Loading...</p>
          </div>
        ) : applications.length === 0 ? (
          <div className="emp-empty-state">
            <div className="emp-empty-graphic"></div>
            <h3>No applications</h3>
            <p>Applications will appear here</p>
          </div>
        ) : (
          <div className="emp-applications-table">
            <div className="emp-table-header">
              <h3>Applications ({applications.length})</h3>
            </div>
            <div className="emp-table-body">
            {applications.map(app => {
  const followUp = followUpsByUser[app.user_id];

  return (
    <div key={app.id} className="emp-table-row">

      {/* Candidate Info */}
      <div className="emp-applicant-info">
        <div className="emp-avatar-sm">
          {app.first_name?.[0]}{app.last_name?.[0]}
        </div>
        <div>
          <div className="emp-applicant-name">
            {app.first_name} {app.last_name}
          </div>
          <div className="emp-applicant-email">{app.email}</div>
        </div>
      </div>

      {/* Status */}
      <div className="emp-table-status">
        <span className="emp-status-badge">
          {app.status || "Pending"}
        </span>
      </div>

      {/* Applied Date */}
      <div className="emp-table-date">
        {new Date(app.created_at).toLocaleDateString()}
      </div>

      {/* Actions */}
    <div className="emp-table-action">
  <button
    className="emp-btn-outline"
    onClick={() => downloadResume(app.resume_file)}
  >
    Download Resume
  </button>

  {followUp && (
    <div className="emp-followup-box">
      <strong>Candidate Follow-Up</strong>
      <p>{followUp.message_text}</p>
      <span className="emp-followup-time">
        {new Date(followUp.created_at).toLocaleString()}
      </span>
    </div>
  )}
</div>


    </div>
  );
})}


            </div>
          </div>
        )}
      </>
    )}

    {/* COMPANY PROFILE TAB */}
{activeTab === 'profile' && (
  <>
    <h1 className="emp-page-title">Company Profile</h1>
    <EmployerProfile />
  </>
)}

  </main>
</div>

  );
}