import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import NavbarPremium from "../components/NavbarPremium";


export default function WriteBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);
  
  // History & Modal State
  const [myBlogs, setMyBlogs] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);

  // New: Error Modal State
  const [errorModal, setErrorModal] = useState({ show: false, message: "" });

  const navigate = useNavigate();

  // Fetch user's history on load
  const fetchMyBlogs = async () => {
    try {
      const res = await api.get("/blogs/mine");
      setMyBlogs(res.data);
    } catch (err) {
      console.error("Failed to fetch history");
    }
  };

  useEffect(() => {
    fetchMyBlogs();
  }, []);

  const publish = async () => {
    if (!title || !content) {
      setErrorModal({ show: true, message: "Title and Content are required." });
      return;
    }

    try {
      setLoading(true);
      await api.post("/blogs", {
        title,
        content,
        tags: tags.split(",").map((t) => t.trim()),
      });
      navigate("/blogs");
    } catch (err) {
      // SHOW CUSTOM MODAL INSTEAD OF ALERT
      setErrorModal({ 
        show: true, 
        message: err.response?.data?.error || "Failed to publish article. Please try again." 
      });
    } finally {
      setLoading(false);
    }
  };

  // Open the confirmation popup for delete
  const confirmDelete = (blog) => {
    setBlogToDelete(blog);
    setShowDeleteModal(true);
  };

  // Actually delete the blog
  const handleDelete = async () => {
    if (!blogToDelete) return;
    try {
      await api.delete(`/blogs/${blogToDelete.id}`);
      setMyBlogs(myBlogs.filter((b) => b.id !== blogToDelete.id));
      setShowDeleteModal(false);
      setBlogToDelete(null);
    } catch (err) {
      alert("Failed to delete blog");
    }
  };

  return (
    <>
          <NavbarPremium active="blogs" />
    
    <div className="container" style={{ maxWidth: "800px" }}>
      
      {/* WRITE SECTION */}
      <div className="write-card">
        <h1>Write a New Blog</h1>
        <p className="subtitle">Share your knowledge with the community</p>

        <div className="form-group">
          <label>Title</label>
          <input
            className="styled-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter an engaging title..."
          />
        </div>

        <div className="form-group">
          <label>Tags (comma separated)</label>
          <input
            className="styled-input"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g. React, Coding, Career"
          />
        </div>

        <div className="form-group">
          <label>Content</label>
          <textarea
            className="styled-textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your story here..."
          />
        </div>

        <div className="form-actions">
          <button className="cancel-btn" onClick={() => navigate(-1)}>Cancel</button>
          <button className="publish-btn" onClick={publish} disabled={loading}>
            {loading ? "Publishing..." : "Publish Article"}
          </button>
        </div>
      </div>

      {/* HISTORY SECTION */}
      <div className="history-section">
        <h3>Your Previous Articles</h3>
        {myBlogs.length === 0 ? (
          <p className="empty-text">You haven't written any blogs yet.</p>
        ) : (
          <div className="history-list">
            {myBlogs.map((b) => (
              <div key={b.id} className="history-item">
                <div 
                  onClick={() => navigate(`/blogs/${b.id}`)} 
                  style={{ cursor: "pointer", flexGrow: 1 }}
                >
                  <h4 style={{ margin: "0 0 5px 0", color: "#2563eb" }}>{b.title}</h4>
                  <span className="history-date">
                    {new Date(b.created_at).toLocaleDateString()} • {b.upvotes} Upvotes
                  </span>
                </div>
                <button 
                  className="delete-icon-btn" 
                  onClick={(e) => {
                    e.stopPropagation(); 
                    confirmDelete(b);
                  }}
                >
                   Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Delete Article?</h3>
            <p>Are you sure you want to delete <b>"{blogToDelete?.title}"</b>? This action cannot be undone.</p>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowDeleteModal(false)}>No, Keep it</button>
              <button className="delete-confirm-btn" onClick={handleDelete}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* ERROR / VIOLATION MODAL */}
      {errorModal.show && (
        <div className="modal-overlay">
          <div className="modal-box error-style">
            <div className="modal-icon-warning">⚠️</div>
            <h3 className="error-title">Action Blocked</h3>
            <p className="error-message">{errorModal.message}</p>
            <div className="modal-actions" style={{ justifyContent: 'center' }}>
              <button 
                className="delete-confirm-btn" 
                style={{ background: '#0f172a', width: '100%' }}
                onClick={() => setErrorModal({ show: false, message: "" })}
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
    </>
  );
}