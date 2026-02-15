import React from 'react';
import { X, MapPin, Calendar, Briefcase, IndianRupee, Building2, CheckCircle2 } from 'lucide-react';

export default function JobDetailsModal({ job, onClose, onApply }) {
  if (!job) return null;

  return (
    // 🔥 OVERLAY: Darker background, centered content
    <div 
      className="modal fade show" 
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: 'rgba(0, 0, 0, 0.6)', 
        backdropFilter: 'blur(4px)',
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: 1060 
      }}
      onClick={onClose}
    >
      {/* 🔥 MODAL CARD: Responsive Width & Max Height */}
      <div 
        className="modal-dialog" 
        style={{ 
          maxWidth: '650px', 
          width: '90%', // 90% width on mobile
          margin: 'auto' 
        }}
        onClick={e => e.stopPropagation()} 
      >
        <div 
          className="modal-content border-0 shadow-lg rounded-4 overflow-hidden bg-white" 
          style={{ 
            maxHeight: '85vh', // Limit height so it doesn't touch edges
            display: 'flex', 
            flexDirection: 'column' 
          }}
        >
          
          {/* ================= HEADER (Sticky) ================= */}
          <div className="modal-header border-bottom px-3 py-3 d-flex align-items-center justify-content-between bg-white sticky-top">
            <div className="d-flex align-items-center gap-3" style={{ minWidth: 0 }}>
              {/* Logo */}
              <div className="rounded-3 border d-flex align-items-center justify-content-center bg-white" style={{ width: 48, height: 48, flexShrink: 0 }}>
                {job.company_logo ? (
                  <img src={job.company_logo} alt="logo" className="rounded-2" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                ) : (
                  <Building2 size={20} className="text-secondary opacity-50" />
                )}
              </div>
              
              {/* Title Info */}
              <div style={{ minWidth: 0 }}>
                <h6 className="fw-bold text-dark mb-0 text-truncate" style={{ fontSize: '1.1rem' }}>{job.title}</h6>
                <div className="d-flex align-items-center gap-2 text-muted small">
                  <span className="fw-medium text-dark text-truncate">{job.company_name || "Confidential"}</span>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <button 
              type="button" 
              className="btn btn-light rounded-circle p-1 d-flex align-items-center justify-content-center border-0 bg-light"
              onClick={onClose}
              style={{ width: 32, height: 32, flexShrink: 0 }}
            >
              <X size={18} className="text-dark" />
            </button>
          </div>

          {/* ================= BODY (Scrollable) ================= */}
          <div className="modal-body p-0 overflow-auto custom-scrollbar">
            
            {/* 1. HIGHLIGHTS BAR */}
            <div className="bg-light px-3 py-3 border-bottom">
              <div className="d-flex flex-wrap gap-2">
                <div className="d-flex align-items-center gap-1 bg-white border px-2 py-1 rounded-pill shadow-sm">
                  <MapPin size={14} className="text-primary" /> 
                  <span className="fw-medium text-dark small" style={{fontSize: '0.85rem'}}>{job.location || 'Remote'}</span>
                </div>
                <div className="d-flex align-items-center gap-1 bg-white border px-2 py-1 rounded-pill shadow-sm">
                  <Briefcase size={14} className="text-primary" /> 
                  <span className="fw-medium text-dark small" style={{fontSize: '0.85rem'}}>{job.job_type || 'Full-time'}</span>
                </div>
                {job.salary && (
                  <div className="d-flex align-items-center gap-1 bg-white border px-2 py-1 rounded-pill shadow-sm">
                    <IndianRupee size={14} className="text-success" /> 
                    <span className="fw-medium text-success small" style={{fontSize: '0.85rem'}}>{job.salary}</span>
                  </div>
                )}
                <div className="d-flex align-items-center gap-1 bg-white border px-2 py-1 rounded-pill shadow-sm">
                  <Calendar size={14} className="text-secondary" /> 
                  <span className="fw-medium text-secondary small" style={{fontSize: '0.85rem'}}>Posted {new Date(job.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* 2. MAIN CONTENT */}
            <div className="p-4">
              <h6 className="fw-bold text-dark mb-2">About the Role</h6>
              <div 
                className="text-secondary" 
                style={{ 
                  whiteSpace: 'pre-wrap', 
                  lineHeight: '1.6', 
                  fontSize: '0.9rem' 
                }}
              >
                {job.description}
              </div>

              {job.skills && job.skills.length > 0 && (
                <>
                  <hr className="my-4 border-light" />
                  <div>
                    <h6 className="fw-bold text-dark mb-3">Skills & Requirements</h6>
                    <div className="d-flex flex-wrap gap-2">
                      {job.skills.map((skill, index) => (
                        <span 
                          key={index} 
                          className="px-3 py-1 bg-white text-dark border rounded-pill fw-medium small d-flex align-items-center gap-1"
                          style={{ fontSize: '0.85rem' }}
                        >
                          <CheckCircle2 size={12} className="text-primary" /> {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* ================= FOOTER (Sticky) ================= */}
          <div className="modal-footer border-top px-3 py-3 bg-white d-flex justify-content-end gap-2">
           
            <button 
              type="button" 
              className="btn btn-dark rounded-pill px-5 fw-bold shadow-sm"
              onClick={() => onApply(job)}
              style={{ fontSize: '0.9rem' }}
            >
              Apply Now
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}