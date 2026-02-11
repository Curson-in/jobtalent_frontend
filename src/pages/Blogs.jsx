import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import NavbarPremium from "../components/NavbarPremium";
import { Search, Heart, MessageCircle, Share2, User, ArrowRight, Clock } from "lucide-react";
import "../assets/css/blogs.css"; 

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  
  // ✅ PAGINATION STATE
  const [visibleCount, setVisibleCount] = useState(2);
  const BLOGS_PER_LOAD = 2;

  useEffect(() => {
    // Fetch all blogs once, then slice them on the frontend for instant "Load More"
    api.get("/blogs").then((res) => setBlogs(res.data));
  }, []);

  // 1. Filter first
  const filteredBlogs = blogs.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    (b.excerpt && b.excerpt.toLowerCase().includes(search.toLowerCase())) ||
    (b.author && b.author.toLowerCase().includes(search.toLowerCase()))
  );

  // 2. Slice for pagination
  const displayBlogs = filteredBlogs.slice(0, visibleCount);

  // 3. Check if we need to show "Load More"
  const hasMore = visibleCount < filteredBlogs.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + BLOGS_PER_LOAD);
  };

  const handleShare = async (e, blog) => {
    e.preventDefault();
    const shareData = {
      title: blog.title,
      text: `Read this article: ${blog.title}`,
      url: `${window.location.origin}/blogs/${blog.id}`,
    };

    if (navigator.share) {
      try { await navigator.share(shareData); } catch (err) {}
    } else {
      try {
        await navigator.clipboard.writeText(shareData.url);
        alert("Link copied to clipboard");
      } catch (err) {}
    }
  };

  return (
    <>
      <NavbarPremium active="blogs" />

      <div className="blog-page-container">
        {/* HEADER */}
        <div className="blog-hero">
          <div className="hero-content">
            <h1 className="hero-title">DevHouse</h1>
            <p className="hero-subtitle">Insights, and tutorials for developers.</p>
          </div>
          <Link to="/blogs/write" className="btn-write">
            Write
          </Link>
        </div>

        {/* SEARCH */}
        <div className="search-wrapper">
          <Search className="search-icon" size={20} />
          <input 
            type="text" 
            placeholder="Search for articles..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input-field"
          />
        </div>

        {/* BLOG GRID */}
        <div className="blogs-list-container">
          {displayBlogs.length > 0 ? (
            displayBlogs.map((b) => (
              <div key={b.id} className="professional-blog-card">
                <div className="card-body">
                  <div className="card-meta-top">
                    <span className="author-badge">
                      <User size={14} /> {b.author || "Anonymous"}
                    </span>
                    <span className="date-badge">
                      <Clock size={14} /> {new Date(b.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  <Link to={`/blogs/${b.id}`} className="card-title-link">
                    <h2>{b.title}</h2>
                  </Link>
                  
                  <p className="card-excerpt">
                    {b.excerpt 
                      ? b.excerpt.substring(0, 120) 
                      : "Click to read the full article to learn more about this topic..."}
                    ...
                  </p>
                </div>

                <div className="card-footer-pro">
                  <div className="footer-stats">
                    <div className="stat-pill" title="Upvotes">
                      <Heart size={16} className={b.upvotes > 0 ? "text-red" : ""} />
                      <span>{b.upvotes || 0}</span>
                    </div>
                    <div className="stat-pill" title="Comments">
                      <MessageCircle size={16} />
                      <span>{b.commentCount || (b.comments?.length) || 0}</span>
                    </div>
                  </div>

                  <div className="footer-actions">
                    <button 
                      className="btn-icon-share" 
                      onClick={(e) => handleShare(e, b)}
                      title="Share"
                    >
                      <Share2 size={18} />
                    </button>
                    
                    <Link to={`/blogs/${b.id}`} className="btn-read-more">
                      Read Full <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state-clean">
              <h3>No articles found</h3>
              <p>Try searching for something else.</p>
            </div>
          )}
        </div>

        {/* LOAD MORE BUTTON */}
        {hasMore && (
          <div className="pagination-container">
            <button className="btn-load-more" onClick={handleLoadMore}>
              Load More Articles
            </button>
          </div>
        )}
      </div>
    </>
  );
}