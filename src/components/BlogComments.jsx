import { useEffect, useState } from "react";
import api from "../services/api";

// ✅ HELPER: Formats date correctly (e.g., "2 hours ago" or "Nov 12, 2026")
const formatDate = (dateString) => {
  if (!dateString) return "Just now"; // Fallback if no date exists
  
  const date = new Date(dateString);
  const now = new Date();
  
  // Check if date is valid
  if (isNaN(date.getTime())) return "Just now";

  const diffInSeconds = Math.floor((now - date) / 1000);

  // Less than 1 minute
  if (diffInSeconds < 60) return "Just now";
  // Less than 1 hour
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  // Less than 1 day
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  // Less than 7 days
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;

  // Older than a week: Show full date
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// --- MOVED OUTSIDE: Stable Component Definition ---
const CommentNode = ({ 
  comment, 
  allComments, 
  activeReplyId, 
  setActiveReplyId, 
  text, 
  setText, 
  onPostReply 
}) => {
  const [collapsed, setCollapsed] = useState(false);

  // Filter replies from the full list passed down
  const replies = allComments.filter((c) => c.parentId == comment.id || c.parent_id == comment.id);
  
  const authorName = comment.author || "Anonymous";
  const initial = authorName.charAt(0).toUpperCase();

  // ✅ FIX: Use database field 'created_at' or 'createdAt'
  const dateDisplay = formatDate(comment.created_at || comment.createdAt);

  return (
    <div className="comment-thread">
      {/* Visuals */}
      <div className="thread-visuals">
        <div className="avatar-circle" onClick={() => setCollapsed(!collapsed)}>
          {initial}
        </div>
        {!collapsed && replies.length > 0 && <div className="thread-line"></div>}
      </div>

      {/* Content */}
      <div className="thread-content">
        <div className="comment-header">
          <span className="author-name">{authorName}</span>
          <span className="meta-text">
            {/* ✅ UPDATED DATE DISPLAY */}
            • {dateDisplay}
          </span>
          <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? "[+]" : "[-]"}
          </button>
        </div>

        {collapsed ? (
          <div className="collapsed-placeholder" onClick={() => setCollapsed(false)}>
            Click to expand ({replies.length} replies hidden)
          </div>
        ) : (
          <>
            <p className="comment-body">{comment.comment || comment.content}</p>

            <div className="comment-actions">
              <button
                className="action-link"
                onClick={() => setActiveReplyId(activeReplyId === comment.id ? null : comment.id)}
              >
                Reply
              </button>
            </div>

            {/* Reply Input */}
            {activeReplyId === comment.id && (
              <div className="reply-input-wrapper">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder={`Reply to ${authorName}...`}
                  autoFocus
                />
                <div className="reply-actions">
                  <button className="cancel-btn-small" onClick={() => setActiveReplyId(null)}>Cancel</button>
                  <button className="submit-btn-small" onClick={() => onPostReply(comment.id)}>Reply</button>
                </div>
              </div>
            )}

            {/* Recursion: Pass all necessary props down */}
            <div className="replies-list">
              {replies.map((reply) => (
                <CommentNode
                  key={reply.id}
                  comment={reply}
                  allComments={allComments}
                  activeReplyId={activeReplyId}
                  setActiveReplyId={setActiveReplyId}
                  text={text}
                  setText={setText}
                  onPostReply={onPostReply}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default function BlogComments({ blogId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState(""); // Shared text state for active input
  const [activeReplyId, setActiveReplyId] = useState(null);

  const fetchComments = async () => {
    try {
      const res = await api.get(`/blogs/${blogId}/comments`);
      setComments(res.data);
    } catch (err) {
      console.error("Failed to load comments");
    }
  };

  useEffect(() => {
    fetchComments();
  }, [blogId]);

  const handlePost = async (parentId = null) => {
    if (!text.trim()) return;
    try {
      await api.post(`/blogs/${blogId}/comments`, {
        comment: text,
        content: text, // Sending both to be safe
        parentId: parentId,
        parent_id: parentId,
      });
      setText("");
      setActiveReplyId(null);
      fetchComments();
    } catch (err) {
      alert("Login to comment");
    }
  };

  return (
    <div className="comments-section">
      <h3>Discussion ({comments.length})</h3>

      {/* Main Comment Box */}
      <div className="main-input-area" style={{ marginBottom: "30px" }}>
        <textarea
          value={!activeReplyId ? text : ""}
          onChange={(e) => setText(e.target.value)}
          placeholder="What are your thoughts?"
          disabled={activeReplyId !== null}
        />
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
          <button className="read-btn" onClick={() => handlePost(null)} disabled={activeReplyId !== null}>
            Post Comment
          </button>
        </div>
      </div>

      {/* Feed */}
      <div className="comments-feed">
        {comments
          .filter((c) => !c.parentId && !c.parent_id)
          .map((rootComment) => (
            <CommentNode
              key={rootComment.id}
              comment={rootComment}
              allComments={comments}
              activeReplyId={activeReplyId}
              setActiveReplyId={setActiveReplyId}
              text={text}
              setText={setText}
              onPostReply={handlePost}
            />
          ))}
      </div>
    </div>
  );
}