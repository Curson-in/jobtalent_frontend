import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import NavbarPremium from "../components/NavbarPremium";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api.get("/blogs").then((res) => setBlogs(res.data));
  }, []);

  const filteredBlogs = blogs.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    (b.excerpt && b.excerpt.toLowerCase().includes(search.toLowerCase())) ||
    (b.author && b.author.toLowerCase().includes(search.toLowerCase()))
  );

  // --- SHARE FUNCTIONALITY ---
  const handleShare = async (e, blog) => {
    // Prevent default button behavior
    e.preventDefault();
    
    const shareData = {
      title: blog.title,
      text: `Check out this article on DevHouse: ${blog.title}`,
      url: `${window.location.origin}/blogs/${blog.id}`,
    };

    // 1. Try Native Device Share (Mobile/Tablets)
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log("Share canceled");
      }
    } else {
      // 2. Fallback for Desktop (Copy to Clipboard)
      try {
        await navigator.clipboard.writeText(shareData.url);
        alert("🔗 Link copied to clipboard!");
      } catch (err) {
        alert("Failed to copy link");
      }
    }
  };

  return (
    <>
      <NavbarPremium active="blogs" />

      <div className="container">
        {/* HEADER SECTION */}
        <div className="blogs-header">
          <div>
            <h1 style={{ fontSize: '2rem', marginBottom: '5px' }}>DevHouse</h1>
            <p style={{ color: '#666', margin: 0 }}>Where developers share knowledge</p>
          </div>
          <Link to="/blogs/write" className="read-btn" style={{ background: '#000' }}>
            + Write
          </Link>
        </div>

        {/* SEARCH BAR */}
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search topics, titles, or authors..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>

        {/* BLOGS GRID */}
        <div className="blogs-grid">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((b) => (
              <div key={b.id} className="blog-card">
                <div>
                  <h2>{b.title}</h2>
                  <p>{b.excerpt ? b.excerpt.substring(0, 100) : "Click to read more"}...</p>
                </div>

                <div className="card-footer">
                  <div className="stats">
                    <span className="stat-item" title="Upvotes">🔥 {b.upvotes || 0}</span>
                    <span className="stat-item" title="Comments">
                      💬 {b.commentCount || (b.comments ? b.comments.length : 0)}
                    </span>
                    <span className="stat-item">✍ {b.author}</span>
                  </div>
                  
                  {/* ACTIONS RIGHT */}
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button 
                      className="share-btn" 
                      onClick={(e) => handleShare(e, b)}
                      title="Share Article"
                    >
                      Share
                    </button>
                    
                    <Link to={`/blogs/${b.id}`} className="read-btn">
                      Read Full →
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <p>No blogs found matching "{search}"</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}