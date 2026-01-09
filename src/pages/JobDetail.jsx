import { useEffect, useState, useContext } from 'react';
import { getJobMatchScore } from '../services/jobService';
import { AuthContext } from '../context/AuthContext';


// 🔥 JOB MATCH SCORE STATE
const { user } = useContext(AuthContext);
const [match, setMatch] = useState(null);
const [locked, setLocked] = useState(false);


// 🔥 FETCH JOB MATCH SCORE (PREMIUM)
useEffect(() => {
  if (!job?.id) return;

  // If user is not premium → lock
  if (!user?.subscription) {
    setLocked(true);
    return;
  }

  setLocked(false);

  getJobMatchScore(job.id)
    .then((res) => {
      setMatch(res.data);
    })
    .catch(() => {
      setLocked(true);
    });
}, [job?.id, user?.subscription]);