import { useState, useContext } from "react";
import "../../assets/css/resume-enhance.css";
import { enhanceResume } from "../../services/resumeService";
import NavbarPremium from "../../components/NavbarPremium";
import { AuthContext } from "../../context/AuthContext";

export default function ResumeEnhance() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [filename, setFilename] = useState(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const { subscription } = useContext(AuthContext);

  const isFreePlan =
    !subscription ||
    !subscription.plan ||
    subscription.plan.toLowerCase() === "free";

  const formatEnhancedText = (text = "") => {
    const safeText = typeof text === "string" ? text : text?.content || "";
    return safeText
      .replace(/["“”]/g, "")
      .replace(/^\s*-\s*/gm, "• ")
      .replace(/\*\*/g, "")
      .trim();
  };

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;

    if (
      !["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(f.type)
    ) {
      alert("Only PDF or DOCX allowed");
      return;
    }
    setFile(f);
  };

  const handleEnhance = async () => {
    if (isFreePlan) {
      setShowUpgradeModal(true);
      return;
    }

    try {
      setLoading(true);
      const res = await enhanceResume(file);
      setResult(res);
      setFilename(res.filename);
    } catch {
      alert("Failed to enhance resume");
    } finally {
      setLoading(false);
    }
  };

  const downloadAIResume = async (filename) => {
    const token = localStorage.getItem("auth_token");
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/files/ai-resume/${filename}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (!res.ok) throw new Error("Download failed");
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    window.open(url);
  };

  return (
    <>
      <NavbarPremium active="resume" />

      <div className="resume-layout">
        
        {/* LEFT PANEL: CONTROLS */}
        <div className="resume-sidebar">
          <div className="sidebar-header">
            <h1>AI Enhancer</h1>
            <p>Upload your resume to get recruiter-ready improvements instantly.</p>
          </div>

          <div className="upload-container">
            <input
              type="file"
              accept=".pdf,.docx"
              hidden
              id="resumeUpload"
              onChange={handleFileChange}
            />

            <label htmlFor="resumeUpload" className={`upload-box ${file ? 'has-file' : ''}`}>
              <div className="icon-wrapper">
                {file ? "📄" : "cloud_upload"}
              </div>
              {file ? (
                <div className="file-info">
                  <h4>{file.name}</h4>
                  <span>{(file.size / 1024).toFixed(1)} KB</span>
                  <p className="change-text">Click to change file</p>
                </div>
              ) : (
                <div className="upload-text">
                  <h4>Click or Drag Resume</h4>
                  <p>PDF or DOCX (Max 2MB)</p>
                </div>
              )}
            </label>

            <button
              className="action-btn-primary"
              onClick={handleEnhance}
              disabled={!file || loading}
            >
              {loading ? (
                <span className="loader"></span>
              ) : (
                <>✨ Enhance with AI</>
              )}
            </button>
          </div>

          {/* Tips / Info */}
          <div className="info-card">
            <h4> Why use this?</h4>
            <ul>
              <li>Optimize keywords for ATS systems</li>
              <li>Fix grammar and professional tone</li>
              <li>Get suggested bullet points</li>
            </ul>
          </div>
        </div>

        {/* RIGHT PANEL: PREVIEW */}
        <div className="resume-preview-area">
          {result?.enhancedText ? (
            <div className="preview-paper">
              <div className="paper-header">
                <h2>Enhanced Result</h2>
                {filename && (
                  <button onClick={() => downloadAIResume(filename)} className="download-mini-btn">
                    Download PDF
                  </button>
                )}
              </div>
              
              <div className="paper-content">
                {formatEnhancedText(result.enhancedText)
                  .split("\n\n")
                  .map((block, i) => (
                    <div key={i} className="content-block">
                      {block.startsWith("•") ? (
                        <ul>
                          {block.split("\n").map((b, j) => (
                            <li key={j}>{b.replace(/^[-•]+/, "").trim()}</li>
                          ))}
                        </ul>
                      ) : (
                        <p>{block}</p>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-illustration">📄</div>
              <h3>Ready to Enhance</h3>
              <p>Your AI-improved resume will appear here in a professional format.</p>
            </div>
          )}
        </div>
      </div>

      {/* MODAL */}
      {showUpgradeModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-icon">⭐</div>
            <h3>Upgrade to Pro</h3>
            <p>Unlock unlimited AI enhancements and PDF downloads.</p>
            <div className="modal-actions">
              <button onClick={() => setShowUpgradeModal(false)} className="btn-text">Cancel</button>
              <button onClick={() => window.location.href = "/pricing"} className="btn-gradient">Get Pro</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}