import { useState } from "react";
import "../../assets/css/resume-enhance.css";
import { enhanceResume } from "../../services/resumeService";
import NavbarPremium from "../../components/NavbarPremium";
 import { generateEnhancedResumePDF } from "../../utils/pdfExport";
 


export default function ResumeEnhance() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  


  const formatEnhancedText = (text = "") => {
  const safeText =
    typeof text === "string"
      ? text
      : text?.content || "";

  return safeText
    .replace(/["“”]/g, "")
    .replace(/^\s*-\s*/gm, "• ")
    .replace(/\*\*/g, "")
    .trim();
};





  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;

    if (!["application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ].includes(f.type)) {
      alert("Only PDF or DOCX allowed");
      return;
    }

    setFile(f);
  };

  const handleEnhance = async () => {
    try {
      setLoading(true);
      const res = await enhanceResume(file);
      setResult(res);
    } catch (err) {
      alert("Failed to enhance resume");
    } finally {
      setLoading(false);
    }
  };

 return (
  <>
    {/* NAVBAR */}
    <NavbarPremium active="resume" />

    {/* PAGE */}
    <div className="resume-enhance-container">

      {/* HEADER */}
      <div className="page-header">
        <h1>AI Resume Enhancer</h1>
        <p>
          Upload your resume and get recruiter-ready improvements in seconds
        </p>
      </div>

      {/* UPLOAD CARD */}
      <div className="upload-card">
        <input
          type="file"
          accept=".pdf,.docx"
          hidden
          id="resumeUpload"
          onChange={handleFileChange}
        />

        <label htmlFor="resumeUpload" className="upload-area">
          {file ? (
            <>
              <h4>{file.name}</h4>
              <span>{(file.size / 1024).toFixed(1)} KB</span>
            </>
          ) : (
            <>
              <h4>Upload your resume</h4>
              <p>PDF or DOCX • Max 2MB</p>
            </>
          )}
        </label>

        <button
          className="enhance-btn"
          onClick={handleEnhance}
          disabled={!file || loading}
        >
          {loading ? "Enhancing..." : "✨ Enhance with AI"}
        </button>
      </div>

      {/* RESULT */}
      {result?.enhancedText && (
        <div className="enhanced-section">

          <div className="section-header">
            <h2>✨ AI Resume Enhancement</h2>
            <p>
              Optimized for ATS, clarity, and recruiter readability
            </p>
          </div>

          <div className="enhanced-card">
            {formatEnhancedText(result.enhancedText)
              .split("\n\n")
              .map((block, i) => (
                <div key={i} className="enhanced-block">
                  {block.startsWith("•") ? (
                    <ul>
                      {block.split("\n").map((b, j) => (
                        <li key={j}>
                          {b.replace(/^[-•]+/, "").trim()}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>{block}</p>
                  )}
                </div>
              ))}
          </div>

          <div className="result-actions">
          

<button
  className="download-btn"
  onClick={() =>
    generateEnhancedResumePDF(result.enhancedText)
  }
>
  ⬇ Download Enhanced Resume (PDF)
</button>

          </div>

        </div>
      )}

    </div>
  </>
);

}
