import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getJobMatchScore } from "../../services/jobService";

export default function JobMatchCard({ jobId }) {
  const navigate = useNavigate();
  const [match, setMatch] = useState(null);
  const [locked, setLocked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!jobId) return;

    getJobMatchScore(jobId)
      .then(res => {
        setMatch(res.data);
        setLocked(false);
      })
      .catch(err => {
        if (err.response?.status === 403) {
          setLocked(true);
        }
      })
      .finally(() => setLoading(false));
  }, [jobId]);

  if (loading) {
    return <div className="job-match-loading">Calculating match…</div>;
  }

  if (locked) {
    return (
      <div className="job-match-locked">
        <div className="lock-icon">🔒</div>
        <p>Upgrade to see your match score</p>
        <button onClick={() => navigate("/pricing")}>
          Upgrade
        </button>
      </div>
    );
  }

  if (!match) return null;

  return (
    <div className="job-match-card">
      <div className="job-match-header">
        <strong>{match.matchScore}% Match =</strong>
        <span className={`probability ${match.probability.toLowerCase()}`}>
          {match.probability}
        </span>
      </div>

      {match.missingSkills.length > 0 && (
        <div className="job-match-missing">
          Missing skills:
          <ul>
            {match.missingSkills.map(skill => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
