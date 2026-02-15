import React from 'react';
import { X, MapPin, Calendar, Briefcase, IndianRupee, Building2 } from 'lucide-react';

export default function JobDetailsModal({ job, onClose, onApply }) {
  if (!job) return null;

  return (
    // 🔥 WRAPPER: Flexbox used here to force perfect centering
    <div 
      className="modal fade show" 
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: 'rgba(0,0,0,0.6)', 
        backdropFilter: 'blur(4px)',
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: 1050 
      }}
    >
      {/* 🔥 DIALOG: Added margin to prevent touching edges on mobile */}
      <div className="modal-dialog modal-lg w-100 m-3" style={{ maxWidth: '800px' }}>
        <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
          
          {/* Header */}
          <div className="modal-header border-bottom px-4 py-3 bg-white">
            <div className="d-flex align-items-center gap-3">
              {job.company_logo ? (
                <img src={job.company_logo} alt={job.company_name} className="rounded-3 border" style={{ width: 56, height: 56, objectFit: 'cover' }} />
              ) : (
                <div className="rounded-3 bg-light d-flex align-items-center justify-content-center border" style={{ width: 56, height: 56 }}>
                  <Building2 size={24} className="text-secondary" />
                </div>
              )}
              <div>
                <h5 className="modal-title fw-bold text-dark mb-0">{job.title}</h5>
                <p className="text-muted small mb-0">{job.company_name || "Confidential"}</p>
              </div>
            </div>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          {/* Body */}
          <div className="modal-body p-0">
            <div className="d-flex flex-column flex-lg-row h-100">
              
              {/* Main Content (Scrollable) */}
              <div className="p-4 flex-grow-1" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                {/* Meta Tags Row */}
                <div className="d-flex flex-wrap gap-3 mb-4">
                  <div className="d-flex align-items-center text-muted small bg-light px-3 py-2 rounded-pill border">
                    <MapPin size={14} className="me-2 text-primary" /> {job.location || 'Remote'}
                  </div>
                  <div className="d-flex align-items-center text-muted small bg-light px-3 py-2 rounded-pill border">
                    <Briefcase size={14} className="me-2 text-primary" /> {job.job_type || 'Full-time'}
                  </div>
                  {job.salary && (
                    <div className="d-flex align-items-center text-muted small bg-light px-3 py-2 rounded-pill border">
                      {/* ✅ FIX: Changed to Rupee Symbol */}
                      <IndianRupee size={14} className="me-2 text-success" /> {job.salary}
                    </div>
                  )}
                  <div className="d-flex align-items-center text-muted small bg-light px-3 py-2 rounded-pill border">
                    <Calendar size={14} className="me-2 text-primary" /> Posted {new Date(job.created_at).toLocaleDateString()}
                  </div>
                </div>

                <h6 className="fw-bold text-dark mb-3">Job Description</h6>
                <div className="text-secondary mb-4" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.7' }}>
                  {job.description}
                </div>

                {job.skills && job.skills.length > 0 && (
                  <div className="mb-3">
                    <h6 className="fw-bold text-dark mb-3">Required Skills</h6>
                    <div className="d-flex flex-wrap gap-2">
                      {job.skills.map((skill, index) => (
                        <span key={index} className="badge bg-white text-dark border px-3 py-2 rounded-pill fw-normal">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="modal-footer border-top px-4 py-3 bg-light">
            <button 
              type="button" 
              className="btn btn-dark rounded-pill px-5 fw-bold"
              onClick={() => onApply(job)}
            >
              Apply Now
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}