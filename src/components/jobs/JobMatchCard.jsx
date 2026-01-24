import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getJobMatchScore } from "../../services/jobService";

export default function JobMatchCard({ jobId, index = 0 }) {
  const navigate = useNavigate();
  const [match, setMatch] = useState(null);
  const [locked, setLocked] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🔐 Decide visibility (FREE USERS)
  const shouldShowMatch =
    index % 3 === 0 || index % 4 === 0;

  useEffect(() => {
    if (!jobId) return;

    // ⛔ Skip API call if we shouldn't show match
    if (!shouldShowMatch) {
  setLoading(false);
  return;
}


    getJobMatchScore(jobId)
      .then(res => {
        setMatch(res.data);
        setLocked(false);
      })
      .catch(err => {
        if (err.response?.status === 403) setLocked(true);
      })
      .finally(() => setLoading(false));
  }, [jobId, shouldShowMatch]);

  if (loading) {
    return <div className="job-match-loading">Calculating match…</div>;
  }

  /* 🔒 LOCKED */
  if (locked) {
    return (
      <div className="job-match-premium">
        <div className="job-match-left">
          <div className="job-match-icon">🔒</div>
          <div className="job-match-text">
            <span className="job-match-title">Match score locked</span>
            <span className="job-match-sub">
              Upgrade to see how well you fit this role
            </span>
          </div>
        </div>

        <button
          className="job-match-upgrade-btn"
          onClick={() => navigate("/pricing")}
        >
          Upgrade
        </button>
      </div>
    );
  }

  if (!match) return null;

  /* ✅ UNLOCKED */
  return (
    <div className="job-match-score-card">
      <div className="score-header">
        <div className="score-value">
          {match.matchScore}%
        </div>

        <span className={`score-pill ${match.probability.toLowerCase()}`}>
          {match.probability}
        </span>
      </div>

      {match.missingSkills?.length > 0 && (
        <div className="score-missing">
          <span>Missing skills</span>
          <div className="missing-skills">
            {match.missingSkills.map(skill => (
              <span key={skill} className="skill-chip-mini">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
