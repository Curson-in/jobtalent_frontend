import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import * as jobService from '../services/jobService.js';
import * as applicationService from '../services/applicationService.js';
import '../assets/css/dashboard.css';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import ResumeEnhance from '../pages/premium/ResumeEnhance.jsx';
import FollowUpModal from "../components/FollowUpModal.jsx";
import JobMatchCard from '../components/jobs/JobMatchCard.jsx';
import axios from "../services/api";
import NavbarPremium from "../components/NavbarPremium";

export default function TalentDashboard() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [searchParams] = useSearchParams(); 

  // 2. ✅ FIX: Look for 'highlight' since your URL is ?highlight=98931
  const highlightId = searchParams.get('highlight'); 

  // 3. State for the highlighted job
  const [highlightedJob, setHighlightedJob] = useState(null);

  

 const isInternship = (job) =>
  job.job_type === "internship" ||
  job.employment_type === "internship" ||
  /\bintern\b/i.test(job.title);


  const [pendingApply, setPendingApply] = useState(null);

  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('discover');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
const [hasMore, setHasMore] = useState(true);
const JOBS_PER_PAGE = 20;
const [followUpJob, setFollowUpJob] = useState(null);
const [subscription, setSubscription] = useState(null);

const [subLoading, setSubLoading] = useState(true);

const isFreePlan =
  !subscription?.plan ||
  subscription.plan.toLowerCase() === "free";


const stripHtml = (html = '') => {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
};


const normalizeJob = (job) => {
    const company =
      job.company_name ||
      job.company ||
      job.employer_company ||
      'Company';

    return {
      ...job,
      _companyName: company,
      _companyInitial: company.charAt(0).toUpperCase(),
      _description: stripHtml(job.description || ''),
    };
  };

  useEffect(() => {
    const loadHighlightedJob = async () => {
      if (!highlightId) return;
      try {
        // Ensure this endpoint matches your backend (e.g., /jobs/123)
        const res = await axios.get(`/jobs/${highlightId}`);
        if (res.data && res.data.job) {
          setHighlightedJob(res.data.job);
          // Only scroll if we are on the discover tab
          if (activeTab === 'discover') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }
      } catch (err) {
        console.error("Could not load shared job", err);
      }
    };
    loadHighlightedJob();
  }, [highlightId, activeTab]);
  
  
  const [filters, setFilters] = useState({
    jobType: [],
    experience: [],
    location: [],
    datePosted: 'all'
  });

  const filterOptions = {
  jobType: [
    { label: 'Full-time', value: 'full-time' },
    { label: 'Part-time', value: 'part-time' },
    { label: 'Contract', value: 'contract' },
    { label: 'Internship', value: 'internship' }
  ],
  experience: ['Entry-level', 'Mid-level', 'Senior', 'Lead'],
  location: ['Remote', 'On-site', 'Hybrid'],
  datePosted: [
    { value: 'all', label: 'All Time' },
    { value: '24h', label: 'Last 24 hours' },
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' }
  ]
};

const fetchJobs = async (pageNo = 1) => {
  try {
    setLoading(true);

    const res = await jobService.getJobs({
      page: pageNo,
      limit: JOBS_PER_PAGE,
      search: searchQuery || undefined,
      
      // ✅ Filters passed to Backend
      jobType: filters.jobType.length ? filters.jobType : undefined,
      location: filters.location.length ? filters.location : undefined,
      experience: filters.experience.length ? filters.experience : undefined, // 👈 ADD THIS LINE
      datePosted: filters.datePosted !== 'all' ? filters.datePosted : undefined
    });

    setJobs(prev =>
      pageNo === 1 ? res.jobs : [...prev, ...res.jobs]
    );

    setHasMore(res.jobs.length === JOBS_PER_PAGE);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  const loadSubscription = async () => {
    try {
      const res = await axios.get("/profile/talent");
      setSubscription(res.data.profile.subscription);
    } catch (err) {
      console.error(err);
    } finally {
      setSubLoading(false);
    }
  };

  loadSubscription();
}, []);


useEffect(() => {
  if (activeTab === 'discover') {
    setPage(1);
    fetchJobs(1);
  }
}, [activeTab,searchQuery, filters]);

useEffect(() => {
  const pending = localStorage.getItem('pendingExternalApply');
  if (pending) {
    setPendingApply(JSON.parse(pending));
  }
}, []);

useEffect(() => {
  const checkPendingApply = () => {
    const pending = localStorage.getItem('pendingExternalApply');
    if (pending) {
      setPendingApply(JSON.parse(pending));
    }
  };

  const onVisibilityChange = () => {
    if (document.visibilityState === 'visible') {
      checkPendingApply();
    }
  };

  window.addEventListener('focus', checkPendingApply);
  document.addEventListener('visibilitychange', onVisibilityChange);

  return () => {
    window.removeEventListener('focus', checkPendingApply);
    document.removeEventListener('visibilitychange', onVisibilityChange);
  };
}, []);




 

 // 🔥 DEFINE THIS AT TOP LEVEL (after useState hooks)



const fetchApplications = async () => {
  try {
    setLoading(true);
    const res = await applicationService.getMyApplications();
    setApplications(res.applications || []);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

// ==========================================
  // 🚀 SMART SORTING & FILTERING
  // ==========================================

  // 1. MANUAL RULE: Hide Internships if filtering for Senior/Mid/Lead
  const shouldHideInternships = () => {
    const highLevels = ['Mid-level', 'Senior', 'Lead'];
    
    // Are we filtering by experience at all?
    const hasExperienceFilter = filters.experience.length > 0;
    
    // Is "Entry-level" NOT selected?
    const isEntryMissing = !filters.experience.includes('Entry-level');
    
    // Is any High Level (Mid/Senior/Lead) selected?
    const hasHighLevel = filters.experience.some(level => highLevels.includes(level));

    // If we are looking for Senior/Mid roles AND didn't ask for Entry-level -> HIDE INTERNS
    return hasExperienceFilter && isEntryMissing && hasHighLevel;
  };

  // 2. Filter the raw jobs list based on our rule
  let displayJobs = jobs;

  if (shouldHideInternships()) {
    displayJobs = jobs.filter(job => !isInternship(job));
  }

  // 3. Now Apply "Internships on Top" Sorting to whatever is left
  // 3. Now Apply "Internships on Top" Sorting to whatever is left
  const internshipJobs = displayJobs.filter(isInternship);
  const otherJobs = displayJobs.filter(job => !isInternship(job));

  // 4. Final List
  let finalJobs = [...internshipJobs, ...otherJobs];

  // ✅ MERGE HIGHLIGHTED JOB TO TOP
  if (highlightedJob) {
    finalJobs = finalJobs.filter(j => j.id !== highlightedJob.id);
    finalJobs = [highlightedJob, ...finalJobs];
  }

  const handleFilterChange = (category, value) => {
    setFilters(prev => {
      if (category === 'datePosted') {
        return { ...prev, datePosted: value };
      }
      
      const currentValues = prev[category];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      
      return { ...prev, [category]: newValues };
    });
  };

  const clearFilters = () => {
    setFilters({
      jobType: [],
      experience: [],
      location: [],
      datePosted: 'all'
    });
    setSearchQuery('');
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.jobType.length > 0) count += filters.jobType.length;
    if (filters.experience.length > 0) count += filters.experience.length;
    if (filters.location.length > 0) count += filters.location.length;
    if (filters.datePosted !== 'all') count += 1;
    return count;
  };




const handleApply = (job) => {
  // 🔥 Aggregated jobs
  if (job.source === 'aggregated') {
    if (!job.external_url) {
      alert('Apply link not available');
      return;
    }

    localStorage.setItem(
      'pendingExternalApply',
      JSON.stringify({
        jobId: job.id,
        title: job.title,
        company: job.company_name
      })
    );

    window.open(job.external_url, '_blank', 'noopener,noreferrer');
    return;
  }

  // Direct jobs
  applicationService
    .applyToJob(job.id)
    .then(() => {
      alert('Applied successfully!');
      fetchApplications();
    })
    .catch(err => {
      alert(err.response?.data?.message || 'Failed to apply');
    });
};

useEffect(() => {
  fetchApplications();
}, []);

// ✅ FETCH SPECIFIC JOB IF SHARED
  

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // 🔗 SHARE FUNCTION
 const handleShare = async (e, job) => {
    e.stopPropagation(); // Prevent clicking the card body
    e.preventDefault();

    const companyName = job.company_name || job.company || 'Company';
    const shareUrl = `${window.location.origin}/job/${job.id}`; // Generates: curson.in/job/123

    const shareData = {
      title: `${job.title} at ${companyName}`,
      text: `Check out this opportunity for ${job.title} at ${companyName} on Curson!`,
      url: shareUrl,
    };

    // 1. Try Native Share (Mobile/Supported Browsers)
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        // After share attempt/success, send to signup if not logged in (optional logic, usually better to stay)
        // If you specifically want to redirect user sharing it:
        // navigate('/signup'); 
      } catch (err) {
        console.log('User cancelled share', err);
      }
    } else {
      // 2. Fallback: Copy to Clipboard
      try {
        await navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`);
        alert("Link copied to clipboard!");
        
        // 🚀 REDIRECT LOGIC FOR CLIPBOARD USERS (if that's what you meant)
        // Usually the PERSON CLICKING the shared link goes to signup (handled by your App.jsx route /job/:id).
        // If you want the person SHARING to go to signup (odd, but okay):
        // navigate('/signup');
      } catch (err) {
        console.error("Failed to copy", err);
      }
    }
  };

  return ( 
    <>
    <NavbarPremium
  active={activeTab}
  onTabChange={(tab) => {
    setActiveTab(tab);
  }}
/>

    <div className="dashboard-container">
      {/* ================= NAVBAR ================= */}
      

      {/* ================= CONTENT ================= */}
      <main className="main-content">
        <div className="container-premium">
          {/* ========= DISCOVER JOBS ========= */}
          {activeTab === 'discover' && (
            <div className="content-section">
              <div className="section-header">
                <div>
                  <h1 className="section-title">Discover Opportunities</h1>
                  <p className="section-subtitle">Find your next career move from top companies</p>
                </div>
                <div className="header-stats">
                  <span className="stat-badge">{jobs.length} Positions</span>
                </div>
              </div>

              {/* Search and Filter Section */}
              <div className="search-filter-container">
                <div className="search-filter-wrapper">
                  <div className="search-bar-wrapper">
                    <svg className="search-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <input
                      type="text"
                      placeholder="Search jobs, companies, or keywords..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="search-input"
                    />
                  </div>

                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="filter-toggle-btn"
                  >
                    <svg className="filter-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Filters</span>
                    {getActiveFilterCount() > 0 && (
                      <span className="filter-count-badge">{getActiveFilterCount()}</span>
                    )}
                  </button>
                </div>

                {/* Filter Panel */}
                {showFilters && (
                  <div className="filter-panel">
                    <div className="filter-panel-header">
                      <h3 className="filter-panel-title">Filter Options</h3>
                      {getActiveFilterCount() > 0 && (
                        <button onClick={clearFilters} className="clear-filters-btn">
                          <svg className="clear-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Clear All
                        </button>
                      )}
                    </div>

                    <div className="filter-grid">
                      {/* Job Type */}
                      <div className="filter-group">
                        <label className="filter-group-label">Job Type</label>
                        <div className="filter-options">
                          {filterOptions.jobType.map(opt => (
  <label key={opt.value} className="filter-option">
    <input
      type="checkbox"
      checked={filters.jobType.includes(opt.value)}
      onChange={() => handleFilterChange('jobType', opt.value)}
      className="filter-checkbox"
    />
    <span className="filter-option-label">{opt.label}</span>
  </label>
))}

                        </div>
                      </div>

                      {/* Experience Level */}
                      <div className="filter-group">
                        <label className="filter-group-label">Experience</label>
                        <div className="filter-options">
                          {filterOptions.experience.map(level => (
                            <label key={level} className="filter-option">
                              <input
                                type="checkbox"
                                checked={filters.experience.includes(level)}
                                onChange={() => handleFilterChange('experience', level)}
                                className="filter-checkbox"
                              />
                              <span className="filter-option-label">{level}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Location */}
                      <div className="filter-group">
                        <label className="filter-group-label">Location</label>
                        <div className="filter-options">
                          {filterOptions.location.map(loc => (
                            <label key={loc} className="filter-option">
                              <input
                                type="checkbox"
                                checked={filters.location.includes(loc)}
                                onChange={() => handleFilterChange('location', loc)}
                                className="filter-checkbox"
                              />
                              <span className="filter-option-label">{loc}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Date Posted */}
                      <div className="filter-group">
                        <label className="filter-group-label">Date Posted</label>
                        <div className="filter-options">
                          {filterOptions.datePosted.map(option => (
                            <label key={option.value} className="filter-option">
                              <input
                                type="radio"
                                name="datePosted"
                                checked={filters.datePosted === option.value}
                                onChange={() => handleFilterChange('datePosted', option.value)}
                                className="filter-radio"
                              />
                              <span className="filter-option-label">{option.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {loading ? (
                <div className="loading-state">
                  <div className="spinner"></div>
                  <p>Loading opportunities...</p>
                </div>
              ) : jobs.length === 0 ? (
                <div className="empty-state">
                  <svg className="empty-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <h3>No positions found</h3>
                  <p>Try adjusting your filters or search criteria</p>
                  {getActiveFilterCount() > 0 && (
                    <button onClick={clearFilters} className="empty-state-btn">
                      Clear Filters
                    </button>
                  )}
                </div>
              ) : (
              <div className="jobs-grid">
  {finalJobs.map((job, index) => {
    const companyName =
      job.company_name ||
      job.company ||
      job.employer_company ||
      'Company';

    const companyInitial = companyName.charAt(0).toUpperCase();

    const isHighlighted = highlightedJob && job.id === highlightedJob.id;

    return (
      <div
        key={job.id}
        className="job-card"
        style={{ 
          animationDelay: `${index * 50}ms`,
          border: isHighlighted ? '2px solid #10b981' : undefined,
          backgroundColor: isHighlighted ? '#f0fdf4' : 'white'
        }}
      >

        {isHighlighted && (
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, 
            background: '#10b981', color: 'white', 
            fontSize: '0.7rem', fontWeight: 'bold', 
            textAlign: 'center', padding: '2px'
          }}>
            SHARED JOB
          </div>
        )}

        <button 
      className="btn-share-job" 
      onClick={(e) => handleShare(e, job)}
      title="Share this job"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="16 6 12 2 8 6" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="12" y1="2" x2="12" y2="15" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>

        {/* HEADER */}
        <div className="job-header">
          <div className="company-avatar">
            {companyInitial}
          </div>

          <div className="job-header-info">
            <h3 className="job-title">{job.title}</h3>
            <p className="company-name">{companyName}</p>
          </div>
        </div>

        {/* DETAILS */}
        <div className="job-details">
          <div className="job-detail-item">
            <svg
              className="detail-icon"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z"
                fill="currentColor"
              />
            </svg>
            <span>{job.location}</span>
          </div>

          {job.salary && (
            <div className="job-detail-item">
              <svg
                className="detail-icon"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 2V22"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              <span className="salary">{job.salary}</span>
            </div>
          )}
        </div>

        {/* ✅ MOVE MATCH CARD HERE */}
{/* ✅ Only show Match Card if user is NOT on free plan (Hides Upgrade UI) */}
{!isFreePlan && <JobMatchCard jobId={job.id} index={index} />}
        {/* DESCRIPTION (flex-grow keeps button aligned) */}
        <div className="job-description-wrapper">
          {job.description && (
            <p className="job-description">
              {stripHtml(job.description).substring(0, 120)}...
            </p>
          )}
        </div>

        {/* APPLY BUTTON (always bottom) */}
        <button
          className="apply-btn"
          onClick={() => handleApply(job)}
        >
          Apply Now
          <svg className="btn-arrow" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    );
  })}

  {hasMore && (
    <div className="load-more-container">
      <button
        className="load-more-btn"
        disabled={loading}
        onClick={() => {
          const next = page + 1;
          setPage(next);
          fetchJobs(next);
        }}
      >
        {loading ? 'Loading...' : 'Load more'}
      </button>
    </div>
  )}
</div>

                
              )}
            </div>
          )}

          {/* ========= MY APPLICATIONS ========= */}
        {activeTab === 'applications' && (
  <div className="content-section">
    <div className="section-header">
      <div>
        <h1 className="section-title">Applied Jobs</h1>
        <p className="section-subtitle">Track your application progress</p>
      </div>
      <div className="header-stats">
        <span className="stat-badge">{applications.length} Active</span>
      </div>
    </div>

    {loading ? (
      <div className="loading-state">
        <div className="spinner"></div>
        <p>Loading applications...</p>
      </div>
    ) : applications.length === 0 ? (
      <div className="empty-state">
        <svg className="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12H15M9 16H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L18.7071 8.70711C18.8946 8.89464 19 9.149 19 9.41421V19C19 20.1046 18.1046 21 17 21Z" />
        </svg>
        <h3>No applications yet</h3>
        <p>Start applying to positions to see them here</p>
      </div>
    ) : (
      <div className="table-container">
        <table className="applications-table">
          <thead>
            <tr>
              {/* 1. Position */}
              <th>Position</th>
              
              {/* 2. Company */}
              <th>Company</th>
              
              {/* 3. Actions (MOVED HERE) */}
              <th>Actions</th>

              {/* 4. Status (MOVED RIGHT) */}
              <th>Status</th>
              
              {/* 5. Applied Date (MOVED RIGHT) */}
              <th>Applied</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id}>
                
                {/* 1. Position */}
                <td>
                  <div className="table-cell-primary">{app.position}</div>
                </td>
                
                {/* 2. Company */}
                <td>
                  <div className="table-cell-secondary">{app.company}</div>
                </td>

                {/* 3. Actions (MOVED HERE - Visible on Mobile) */}
                <td>
                  {app.followup_sent ? (
                    <span className="muted">Follow-up sent</span>
                  ) : (
                    <button
                      className="btn-followup"
                      onClick={() => {
                        setFollowUpJob({
                          jobId: app.job_id,
                          position: app.position,
                          company: app.company
                        });
                      }}
                    >
                      Follow-Up
                    </button>
                  )}
                </td>

                {/* 4. Status */}
                <td>
                  <span className={`status-badge status-${app.status}`}>
                    {app.status}
                  </span>
                </td>

                {/* 5. Applied Date */}
                <td>
                  <div className="table-cell-date">
                    {new Date(app.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
)}

          {activeTab === 'enhance' && (
  <div className="content-section">
    <div className="section-header">
      <div>
        <h1 className="section-title">AI Resume Enhancement</h1>
        <p className="section-subtitle">
          Improve your resume with AI-powered insights
        </p>
      </div>
    </div>

    <ResumeEnhance />
  </div>
)}

        </div>
      </main>
      {pendingApply && activeTab === 'discover' && (
  <div className="confirm-overlay">
    <div className="confirm-modal">
      <h3>Did you apply for this job?</h3>
      <p>
        {pendingApply.title} at {pendingApply.company}
      </p>

      <div className="confirm-actions">
      <button
  className="btn-primary"
  onClick={async () => {
    await applicationService.confirmExternalApply(pendingApply.jobId);

    setJobs(prev =>
      prev.filter(job => job.id !== pendingApply.jobId)
    );

    localStorage.removeItem('pendingExternalApply');
    setPendingApply(null);
    fetchApplications();
  }}
>
  Yes, I applied
</button>



        <button
          className="btn-secondary"
          onClick={() => {
            localStorage.removeItem('pendingExternalApply');
            setPendingApply(null);
          }}
        >
          No
        </button>
      </div>
    </div>
  </div>
)}


      {/* ===== FOLLOW UP MODAL (GLOBAL) ===== */}
     {followUpJob && (
  <FollowUpModal
    job={followUpJob}
    onClose={() => setFollowUpJob(null)}
  />
)}


      {/* ===== PENDING EXTERNAL APPLY MODAL ===== */}
     
    </div>
    </>
  );
}