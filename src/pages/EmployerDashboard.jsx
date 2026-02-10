import React, { useState, useEffect, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import * as jobService from '../services/jobService.js';
import * as applicationService from '../services/applicationService.js';
import { getFollowUpsForJob } from "../services/messageService";
import api from "../services/api";

// Styles & Components
import '../assets/css/employer.css';
import EmployerNavbar from '../components/EmployerNavbar.jsx';
import EmployerProfile from './employer/EmployerProfile.jsx';

// --- INTERNAL COMPONENTS ---

const Toast = ({ message, type, onClose }) => {
  if (!message) return null;
  return (
    <div 
      className={`toast show align-items-center text-white border-0 position-fixed top-0 end-0 m-4 shadow-lg`} 
      style={{ zIndex: 1060, backgroundColor: type === 'error' ? '#ef4444' : '#10b981', borderRadius: '10px' }}
    >
      <div className="d-flex">
        <div className="toast-body px-4 py-3 fw-medium">
          {type === 'success' ? <i className="bi bi-check-circle-fill me-2"></i> : <i className="bi bi-exclamation-circle-fill me-2"></i>}
          {message}
        </div>
        <button type="button" className="btn-close btn-close-white me-3 m-auto" onClick={onClose}></button>
      </div>
    </div>
  );
};

const ConfirmModal = ({ show, title, message, confirmText, onConfirm, onCancel, isDestructive }) => {
  if (!show) return null;
  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(2px)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
          <div className="modal-body p-4 text-center">
            <div className={`mb-3 rounded-circle d-inline-flex align-items-center justify-content-center ${isDestructive ? 'bg-danger bg-opacity-10 text-danger' : 'bg-primary bg-opacity-10 text-primary'}`} style={{ width: '60px', height: '60px', fontSize: '1.5rem' }}>
              <i className={`bi ${isDestructive ? 'bi-trash3-fill' : 'bi-send-fill'}`}></i>
            </div>
            <h5 className="fw-bold mb-2">{title}</h5>
            <p className="text-muted mb-4">{message}</p>
            <div className="d-flex gap-2 justify-content-center">
              <button className="btn btn-light rounded-pill px-4 fw-medium" onClick={onCancel}>Cancel</button>
              <button 
                className={`btn rounded-pill px-4 fw-medium ${isDestructive ? 'btn-danger' : 'btn-primary'}`} 
                onClick={onConfirm}
              >
                {confirmText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function EmployerDashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // --- STATE ---
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('jobs');
  const [showPostForm, setShowPostForm] = useState(false);
  const [editingJobId, setEditingJobId] = useState(null);
  const [followUps, setFollowUps] = useState([]);
  
  const [toast, setToast] = useState({ message: '', type: '' });
  const [modalConfig, setModalConfig] = useState({ show: false, type: '', data: null });

  // Premium State
  const [planUsage, setPlanUsage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [savedCandidates, setSavedCandidates] = useState([]);
  const [isSearchMasked, setIsSearchMasked] = useState(false);

  const [formData, setFormData] = useState({
    title: '', description: '', location: '', salary: '', jobType: 'full-time', skills: '',
  });

  // Follow-ups Memo
  const followUpsByUser = useMemo(() => {
    const map = {};
    followUps.forEach(msg => { map[msg.sender_id] = msg; });
    return map;
  }, [followUps]);

  // --- INITIAL LOAD ---
  useEffect(() => {
    fetchJobs();
    fetchPlanUsage();
    fetchSavedCandidates();
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: '' }), 3000);
  };

  // --- API CALLS ---
  const fetchPlanUsage = async () => {
    try {
      const res = await api.get('/employer/usage');
      setPlanUsage(res.data);
    } catch (err) { console.error("Failed to load plan usage", err); }
  };

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await jobService.getEmployerJobs();
      setJobs(response.jobs || []);
    } finally { setLoading(false); }
  };

  const fetchApplications = async (jobId) => {
    try {
      setLoading(true);
      const appsRes = await applicationService.getApplicationsForJob(jobId);
      setApplications(appsRes.applications || []);
      setSelectedJobId(jobId);
      const msgRes = await getFollowUpsForJob(jobId);
      setFollowUps(msgRes.data.messages || []);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  const fetchSavedCandidates = async () => {
    try {
      const res = await api.get('/employer/saved-candidates');
      setSavedCandidates(res.data.candidates || []);
    } catch (err) { console.error("Failed to fetch saved candidates"); }
  };

  // --- HANDLERS ---
  const handleEditClick = (job) => {
    setEditingJobId(job.id);
    setFormData({
        title: job.title,
        description: job.description,
        location: job.location,
        salary: job.salary || '',
        jobType: job.jobType || job.job_type || 'full-time',
        skills: Array.isArray(job.skills) ? job.skills.join(', ') : (job.skills || '')
    });
    setShowPostForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePostJob = async (e) => {
    e.preventDefault();
    try {
       const payload = { 
         ...formData, 
         skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean) 
       };

       if (editingJobId) {
           await jobService.updateJob(editingJobId, payload);
           showToast("Job Updated Successfully!");
       } else {
           await jobService.createJob(payload);
           showToast("Job Posted Successfully!");
       }

       setShowPostForm(false);
       setEditingJobId(null);
       setFormData({ title: '', description: '', location: '', salary: '', jobType: 'full-time', skills: '' });
       fetchJobs();
       fetchPlanUsage();
    } catch (err) { showToast(err.response?.data?.message || 'Failed to save job', "error"); }
  };

  const cancelEdit = () => {
      setShowPostForm(false);
      setEditingJobId(null);
      setFormData({ title: '', description: '', location: '', salary: '', jobType: 'full-time', skills: '' });
  };

  const handleSearchCandidates = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await api.get(`/employer/search-candidates?query=${searchQuery}`);
      let results = res.data.candidates || [];
      results = results.filter(c => !c.has_invited);
      results.sort((a, b) => {
        const hasResumeA = a.resume_file ? 1 : 0;
        const hasResumeB = b.resume_file ? 1 : 0;
        if (hasResumeA !== hasResumeB) return hasResumeB - hasResumeA;
        const hasExpA = (a.experience && a.experience !== '-' && a.experience !== 'N/A') ? 1 : 0;
        const hasExpB = (b.experience && b.experience !== '-' && b.experience !== 'N/A') ? 1 : 0;
        return hasExpB - hasExpA; 
      });
      setSearchResults(results);
      setIsSearchMasked(res.data.masked);
      fetchPlanUsage();
    } catch (err) { showToast("Search failed", "error"); } finally { setLoading(false); }
  };

  const handleSaveCandidate = async (candidateId) => {
    try {
      await api.post('/employer/save-candidate', { candidateId });
      showToast("Candidate Saved Successfully!");
      fetchSavedCandidates();
      fetchPlanUsage();
    } catch (err) { showToast("Already Saved or Limit Reached", "error"); }
  };

  const initiateInvite = (candidateId) => {
    setModalConfig({ show: true, type: 'INVITE', data: candidateId });
  };

  const confirmInvite = async () => {
    const candidateId = modalConfig.data;
    try {
      await api.post('/employer/invite-candidate', { candidateId });
      showToast("Invitation Sent Successfully!");
      setSearchResults(prev => prev.filter(c => c.id !== candidateId));
      setSavedCandidates(prev => prev.map(c => c.id === candidateId ? { ...c, has_invited: true } : c));
      fetchPlanUsage();
    } catch (err) {
      showToast(err.response?.data?.error === 'LIMIT_REACHED' ? "Invite Limit Reached! Please Upgrade." : "Failed to send invite.", "error");
    } finally {
        setModalConfig({ show: false, type: '', data: null });
    }
  };

  const initiateDeleteJob = (job) => {
    setModalConfig({ show: true, type: 'DELETE_JOB', data: job });
  };

  const confirmDeleteJob = async () => {
      const job = modalConfig.data;
      try {
        await jobService.deleteJob(job.id);
        showToast("Job Deleted Successfully");
        fetchJobs();
      } catch (err) {
        showToast("Failed to delete job", "error");
      } finally {
        setModalConfig({ show: false, type: '', data: null });
      }
  };

  const downloadResume = async (filename) => {
    if (!filename) return showToast("No resume uploaded", "error");
    const token = localStorage.getItem("auth_token");
    const res = await fetch(`${import.meta.env.VITE_API_URL}/files/resume/${filename}`, { headers: { Authorization: `Bearer ${token}` } });
    if (!res.ok) return showToast("Download failed", "error");
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = filename; a.click(); URL.revokeObjectURL(url);
  };

  const handleInputChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleLogout = () => { logout(); navigate('/login'); };

  // --- USAGE STATS ---
 // --- USAGE STATS ---
  const UsageStats = () => {
    if (!planUsage) return null;
    const currentPlan = planUsage.current_plan || 'free_trial';
    const limits = { 
      free_trial: { jobs: 2, invites: 5, search: 5, save: 5 },
      starter: { jobs: 3, invites: 5, search: 10, save: 5 },
      growth: { jobs: 10, invites: 15, search: 30, save: 15 },
      pro: { jobs: 9999, invites: 60, search: 120, save: 60 }
    }[currentPlan] || { jobs: 0, invites: 0, search: 0, save: 0 };

    // 🔥 FIX: Default 'used' to 0 to prevent NaN%
    const getPct = (used, total) => {
        const value = used || 0; 
        if (total <= 0) return 0;
        return Math.min((value / total) * 100, 100);
    };

    return (
      <div className="mb-5">
        <div className="row g-3">
          {[
            // 🔥 FIX: Added || 0 to all values below
            { label: 'JOBS POSTED', val: planUsage.jobs_posted_count || 0, limit: limits.jobs, color: 'bg-primary' },
            { label: 'INVITES SENT', val: planUsage.invites_used_count || 0, limit: limits.invites, color: 'bg-success' },
            { label: 'SEARCH QUERIES', val: planUsage.searches_used_count || 0, limit: limits.search, color: 'bg-info' },
            { label: 'SAVED PROFILES', val: planUsage.profiles_saved_count || 0, limit: limits.save, color: 'bg-warning' }
          ].map((stat, idx) => (
            <div key={idx} className="col-6 col-md-3">
              <div className="card h-100 border-0 shadow-sm p-3 stat-card">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted fw-bold small" style={{fontSize:'0.7rem'}}>{stat.label}</span>
                  <span className={`badge ${stat.color} bg-opacity-10 text-dark border border-0`}>
                    {getPct(stat.val, stat.limit).toFixed(0)}%
                  </span>
                </div>
                <h3 className="fw-bold mb-2">
                  {stat.val} <span className="text-muted fs-6 fw-normal">/ {stat.limit === 9999 ? '∞' : stat.limit}</span>
                </h3>
                <div className="progress" style={{height: '6px'}}>
                  <div className={`progress-bar ${stat.color}`} style={{width: `${getPct(stat.val, stat.limit)}%`}}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  return (
    <div className="bg-light min-vh-100">
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({message:'', type:''})} />
      
      {/* Confirmation Modals */}
      <ConfirmModal 
        show={modalConfig.show && modalConfig.type === 'INVITE'}
        title="Send Invitation?"
        message="This will send an email to the candidate inviting them to apply. It will cost 1 Invite Credit."
        confirmText="Yes, Send Invite"
        onConfirm={confirmInvite}
        onCancel={() => setModalConfig({ show: false })}
        isDestructive={false}
      />
      <ConfirmModal 
        show={modalConfig.show && modalConfig.type === 'DELETE_JOB'}
        title="Delete Job Posting?"
        message={`Are you sure you want to delete "${modalConfig.data?.title}"?`}
        confirmText="Delete Job"
        onConfirm={confirmDeleteJob}
        onCancel={() => setModalConfig({ show: false })}
        isDestructive={true}
      />

      <EmployerNavbar activeTab={activeTab} setActiveTab={setActiveTab} handleLogout={handleLogout} />

      <main className="container py-5">

        {/* JOBS TAB */}
        {activeTab === 'jobs' && (
          <>
           {/* 🔥 FIXED HEADER: Button text always visible, Title shrinks if needed */}
           {/* 🔥 FIXED HEADER: Button forced to auto width to show text */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="fw-bold text-dark mb-0 text-truncate pe-2" style={{ fontSize: 'clamp(1.1rem, 4vw, 1.25rem)' }}>
                Active Job Posts
              </h4>
              <button 
                className="btn btn-primary shadow-sm rounded-pill d-flex align-items-center gap-2" 
                onClick={() => {
                    setEditingJobId(null);
                    setFormData({ title: '', description: '', location: '', salary: '', jobType: 'full-time', skills: '' });
                    setShowPostForm(!showPostForm);
                }}
                // 🔥 "w-auto" forces width to fit text, "minWidth" prevents squishing
                style={{ whiteSpace: 'nowrap', width: 'auto', padding: '0.5rem 1rem' }}
              >
             
                <span>Post Job</span>
              </button>
            </div>

            {/* Post/Edit Form */}
            {showPostForm && (
              <div className="card mb-4 border-0 shadow-sm">
                <div className="card-header bg-white py-3"><div className="d-flex justify-content-between"><h5 className="mb-0 fw-bold">{editingJobId ? 'Edit Job' : 'Create New Job'}</h5><button className="btn-close" onClick={cancelEdit}></button></div></div>
                <div className="card-body p-4">
                  <form onSubmit={handlePostJob}>
                    <div className="row g-3">
                      <div className="col-md-6"><label className="form-label">Job Title</label><input className="form-control" name="title" value={formData.title} onChange={handleInputChange} required /></div>
                      <div className="col-md-6"><label className="form-label">Location</label><input className="form-control" name="location" value={formData.location} onChange={handleInputChange} required /></div>
                      <div className="col-md-6"><label className="form-label">Salary Range</label><input className="form-control" name="salary" value={formData.salary} onChange={handleInputChange} /></div>
                      <div className="col-md-6"><label className="form-label">Job Type</label><select className="form-select" name="jobType" value={formData.jobType} onChange={handleInputChange}><option value="full-time">Full-time</option><option value="part-time">Part-time</option><option value="contract">Contract</option></select></div>
                      <div className="col-12"><label className="form-label">Description</label><textarea className="form-control" name="description" rows="4" value={formData.description} onChange={handleInputChange} required /></div>
                      <div className="col-12"><label className="form-label">Required Skills</label><input className="form-control" name="skills" placeholder="e.g. React, Node.js" value={formData.skills} onChange={handleInputChange} /></div>
                      <div className="col-12 text-end mt-4"><button type="button" className="btn btn-light rounded-pill px-4 me-2" onClick={cancelEdit}>Cancel</button><button type="submit" className="btn btn-primary rounded-pill px-4">{editingJobId ? 'Update Job' : 'Post Job'}</button></div>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Jobs Grid */}
            <div className="row g-3 g-md-4 mb-5">
              {jobs.length === 0 && !loading && <div className="text-center py-5 text-muted w-100">No jobs posted yet.</div>}
              {jobs.map(job => (
                <div key={job.id} className="col-12 col-md-6 col-lg-4">
                  <div className={`card h-100 shadow-sm hover-lift ${job.is_featured ? 'border-primary border-2' : 'border'}`}>
                    <div className="card-body p-4 d-flex flex-column">
                      
                      <div className="mb-3">
                        <div className="d-flex justify-content-between align-items-start mb-2 gap-2">
                          <h5 className="card-title fw-bold mb-0 text-dark text-truncate">{job.title}</h5>
                          {/* 🔥 FIXED: Edit Button at Top Right (visible on all screens) */}
                          <button 
                            className="btn btn-light btn-sm text-muted rounded-pill border"
                            onClick={() => handleEditClick(job)}
                            style={{fontSize: '0.75rem', padding: '0.2rem 0.7rem', flexShrink: 0}}
                          >
                            Edit
                          </button>
                        </div>
                        {job.is_featured && <span className="badge bg-primary px-2 py-1 flex-shrink-0 d-inline-block mb-1">FEATURED</span>}
                        <p className="text-muted small mb-2">{job.location} • {job.jobType}</p>
                        {job.salary && <div className="text-success fw-semibold small"><i className="bi bi-currency-rupees"></i> {job.salary}</div>}
                      </div>

                      <p className="card-text text-secondary mb-3 flex-grow-1 small" style={{display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden'}}>{job.description}</p>
                      
                      {/* 🔥 FIXED: Footer with View Apps & Delete Button (Text) */}
                      <div className="d-flex gap-2 mt-auto pt-3 border-top">
                        <button 
                          className="btn btn-primary btn-sm flex-grow-1 rounded-pill" 
                          onClick={() => { setActiveTab('applications'); fetchApplications(job.id); }}
                        >
                          View Applicants
                        </button>
                        
                        <button 
                          className="btn btn-outline-danger btn-sm rounded-pill px-3" 
                          onClick={() => initiateDeleteJob(job)}
                        >
                          Delete
                        </button>
                      </div>

                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-4 border-top">
              <h5 className="fw-bold text-dark mb-4">Usage</h5>
              <UsageStats />
            </div>
          </>
        )}

        {/* ... (Search, Applications, Profile tabs logic remains identical) ... */}
        {(activeTab === 'search' || activeTab === 'saved') && (
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white py-3 px-4">
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                <h5 className="mb-0 fw-bold">{activeTab === 'search' ? 'Find Candidates' : 'Saved Candidates'}</h5>
                {activeTab === 'search' && (
                  <form onSubmit={handleSearchCandidates} className="d-flex gap-2 flex-grow-1" style={{maxWidth: '400px'}}>
                    <input className="form-control" placeholder="Search by skill or title" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                    <button className="btn btn-primary px-4">Find</button>
                  </form>
                )}
              </div>
            </div>
            
            <div className="card-body bg-light p-4">
              {isSearchMasked && <div className="alert alert-warning mb-4 shadow-sm border-0 d-flex align-items-center"><i className="bi bi-lock-fill me-2"></i> <div><strong>Limit Reached!</strong> Upgrade to view full profiles. <span className="text-decoration-underline fw-bold cursor-pointer" onClick={() => navigate('/employer/pricing')}>Upgrade Now</span></div></div>}
              
              <div className="row g-4">
                {(activeTab === 'search' ? searchResults : savedCandidates).map(cand => {
                  const isSaved = savedCandidates.some(saved => saved.id === cand.id);
                  return (
                    <div key={cand.id} className="col-md-6 col-lg-4 col-xl-3">
                      <div className="card border-0 shadow-sm h-100">
                        <div className="card-body p-3">
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <div>
                              <h6 className="fw-bold mb-1">{cand.first_name} {cand.last_name}</h6>
                              <p className="text-primary small mb-0 fw-semibold">{cand.desired_role}</p>
                            </div>
                            
                            {activeTab === 'search' && !isSearchMasked && !isSaved && (
                              <button className="btn btn-sm btn-outline-secondary" onClick={() => handleSaveCandidate(cand.id)} style={{fontSize: '0.75rem', padding: '0.25rem 0.75rem'}}>Save</button>
                            )}
                            {activeTab === 'search' && isSaved && (
                              <span className="badge bg-light text-muted border fw-normal"><i className="bi bi-check2"></i> Saved</span>
                            )}
                          </div>
                          
                          <p className="text-muted extra-small mb-3" style={{fontSize: '0.8rem'}}>{cand.experience || 'Exp N/A'} • {cand.resume_file ? '📄 Resume' : 'No Resume'}</p>
                          
                          <div className="mb-3 d-flex flex-wrap gap-1" style={{minHeight: '2.5em'}}>
                             {(cand.skills || []).slice(0, 3).map((s, i) => <span key={i} className="badge bg-light text-secondary border fw-normal">{s}</span>)}
                          </div>

                          <div className="d-grid gap-2 mt-auto">
                            {!isSearchMasked ? (
                              <>
                                {cand.has_invited ? 
                                  <button className="btn btn-success btn-sm disabled" disabled><i className="bi bi-check2"></i> Invited</button> : 
                                  <button className="btn btn-primary btn-sm" onClick={() => initiateInvite(cand.id)}>Invite to Apply</button>
                                }
                                {cand.resume_file ? (
                                  <button className="btn btn-outline-secondary btn-sm" onClick={() => downloadResume(cand.resume_file)}>Download Resume</button>
                                ) : (
                                  <button className="btn btn-light btn-sm text-muted disabled" disabled>No Resume</button>
                                )}
                              </>
                            ) : (
                              <button className="btn btn-secondary btn-sm" disabled><i className="bi bi-lock-fill"></i> Upgrade to View</button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {(activeTab === 'search' ? searchResults : savedCandidates).length === 0 && <div className="text-muted text-center py-5 w-100">No candidates found.</div>}
              </div>
            </div>
          </div>
        )}

        {/* APPLICATIONS TAB */}
        {activeTab === 'applications' && (
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white py-3 px-4 d-flex justify-content-between align-items-center">
              <h5 className="mb-0 fw-bold">Applicants</h5>
              <span className="badge bg-success bg-opacity-10 text-success border border-success px-3 py-2 rounded-pill"><i className="bi bi-magic me-1"></i> AI Match Sorted</span>
            </div>
            <div className="list-group list-group-flush">
              {applications.length === 0 ? (
                <div className="p-5 text-center text-muted">Select a job from "My Jobs" to view applicants.</div>
              ) : (
                applications.map(app => {
                  const followUp = followUpsByUser[app.user_id] || followUpsByUser[app.candidate_id]; 
                  return (
                    <div key={app.id} className="list-group-item p-4 d-flex flex-column gap-3">
                      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                        <div className="d-flex align-items-center gap-3">
                          <div className="rounded-circle bg-light d-flex align-items-center justify-content-center fw-bold text-primary fs-5" style={{width:50, height:50}}>
                            {app.first_name?.[0]}{app.last_name?.[0]}
                          </div>
                          <div>
                            <div className="fw-bold text-dark">{app.first_name} {app.last_name} <span className={`badge ms-2 rounded-pill ${app.match_score > 75 ? 'bg-success' : 'bg-secondary'}`}>{app.match_score}% Match</span></div>
                            <div className="text-muted small">{app.desired_role} • {app.email}</div>
                          </div>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <span className={`badge rounded-pill px-3 py-2 ${app.status === 'hired' ? 'bg-success' : 'bg-light text-dark border'}`}>{app.status || "Pending"}</span>
                          <button className="btn btn-outline-primary btn-sm rounded-pill px-3" onClick={() => downloadResume(app.resume_file)}>Download Resume</button>
                        </div>
                      </div>
                      {followUp && (
                        <div className="bg-light p-3 rounded-3 border-start border-4 border-success ms-sm-5">
                          <div className="d-flex justify-content-between align-items-center mb-1">
                            <small className="fw-bold text-success"><i className="bi bi-chat-quote-fill me-1"></i> Message from Candidate</small>
                            <small className="text-muted" style={{fontSize: '0.75rem'}}>{new Date(followUp.created_at).toLocaleString()}</small>
                          </div>
                          <p className="mb-0 text-dark small fst-italic">{followUp.message_text || followUp.content}</p>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* PROFILE TAB */}
        {activeTab === 'profile' && (
          <>
            <h4 className="fw-bold text-dark mb-4">Company Profile</h4>
            <EmployerProfile />
          </>
        )}

      </main>
    </div>
  );
}