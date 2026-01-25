import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import BlogComments from "../components/BlogComments";
import NavbarPremium from "../components/NavbarPremium";


export default function BlogDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const [blog, setBlog] = useState(null);
  const [userVote, setUserVote] = useState(0); // 0 = none, 1 = up, -1 = down

  useEffect(() => {
    api.get(`/blogs/${id}`).then((res) => {
        setBlog(res.data);
        // If backend sends 'userHasVoted: 1', set it here.
        // setUserVote(res.data.userVote); 
    });
  }, [id]);

  const handleVote = async (voteType) => {
    if (!blog) return;

    // Toggle Logic: If clicking same button, remove vote (set to 0)
    const newVote = userVote === voteType ? 0 : voteType;

    // Optimistic UI Update
    setBlog((prev) => ({
      ...prev,
      upvotes: prev.upvotes + (newVote === 1 ? 1 : 0) - (userVote === 1 ? 1 : 0),
      downvotes: prev.downvotes + (newVote === -1 ? 1 : 0) - (userVote === -1 ? 1 : 0),
    }));

    setUserVote(newVote);

    try {
      await api.post(`/blogs/${id}/vote`, { vote: newVote });
    } catch (err) {
      alert("Login required to vote");
    }
  };

  if (!blog) return <div className="container">Loading...</div>;

  return (
    <>
         <NavbarPremium active="blogs" />
    <div className="container">
      <button onClick={() => nav(-1)} style={{ background: "none", color: "#666", marginBottom: "20px", paddingLeft: 0 }}>
        ← Back
      </button>

      <div className="blog-header">
        <h1 style={{ fontSize: "2rem", marginBottom: "10px" }}>{blog.title}</h1>
        <div style={{ color: "#666" }}>
          By <strong>{blog.author}</strong>
        </div>
      </div>

      <div className="blog-content">{blog.content}</div>

      <div className="vote-bar">
        {/* Conditional Class: adds 'active' if userVote matches */}
        <button 
          className={`vote-btn ${userVote === 1 ? "active" : ""}`} 
          onClick={() => handleVote(1)}
        >
          👍 Upvote ({blog.upvotes})
        </button>

        <button 
          className={`vote-btn ${userVote === -1 ? "active" : ""}`} 
          onClick={() => handleVote(-1)}
        >
          👎 Downvote ({blog.downvotes})
        </button>
      </div>

      <BlogComments blogId={id} />
    </div>
    </>
  );
}