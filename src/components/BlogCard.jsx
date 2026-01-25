import { useState } from "react";
import api from "../services/api";
import BlogComments from "./BlogComments";

export default function BlogCard({ blog }) {
  const [showComments, setShowComments] = useState(false);

  const vote = async (v) => {
    try {
      await api.post("/blogs/vote", {
        blogId: blog.id,
        vote: v
      });
      window.location.reload();
    } catch (err) {
      alert("Login required to vote");
    }
  };

  return (
    <div className="blog-card">
      <h2>{blog.title}</h2>

      <p style={{ whiteSpace: "pre-wrap" }}>
        {blog.content}
      </p>

      {/* TAGS */}
      <div className="tags">
        {blog.tags?.map(t => (
          <span key={t}>#{t}</span>
        ))}
      </div>

      {/* META */}
      <div className="blog-meta">
        <span>✍ {blog.author}</span>
      </div>

      {/* ACTIONS */}
      <div className="actions">
        <button onClick={() => vote(1)}>⬆ {blog.upvotes}</button>
        <button onClick={() => vote(-1)}>⬇ {blog.downvotes}</button>
        <button onClick={() => setShowComments(!showComments)}>
          💬 Comments
        </button>
      </div>

      {showComments && <BlogComments blogId={blog.id} />}
    </div>
  );
}
