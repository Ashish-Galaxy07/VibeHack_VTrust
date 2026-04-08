import { useLocation, useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { ArrowLeft, MessageSquare, ThumbsUp } from "lucide-react";
import { useState } from "react";

export default function QuestionDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const initial = location.state;

  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initial?.likes ?? 0);
  const [comments, setComments] = useState(initial?.comments ?? 0);
  const [commentText, setCommentText] = useState("");

  const handleBack = () => navigate("/", { replace: false });
  const toggleLike = () => {
    const nextLiked = !liked;
    setLiked(nextLiked);
    setLikes(nextLiked ? likes + 1 : Math.max(0, likes - 1));
  };
  const submitComment = () => {
    const t = commentText.trim();
    if (!t) return;
    setComments(comments + 1);
    setCommentText("");
  };

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <button
            className="px-3 py-1 rounded-md bg-card border border-border text-muted-foreground hover:bg-muted transition inline-flex items-center gap-2"
            onClick={handleBack}
          >
            <ArrowLeft size={16} />
            Back
          </button>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
          {!initial ? (
            <div className="text-muted-foreground">Question not found.</div>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <img src={initial.avatar} alt={initial.author} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <div className="text-sm font-semibold text-foreground">{initial.author}</div>
                  <div className="text-xs text-muted-foreground">
                    {initial.timeAgo} in <span className="text-primary font-medium">{initial.category}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <div className="text-xl font-semibold text-foreground">{initial.title}</div>
                {initial.body && <p className="mt-3 text-muted-foreground">{initial.body}</p>}
              </div>

              <div className="mt-5 flex items-center gap-6 text-muted-foreground">
                <button className="flex items-center gap-2" onClick={toggleLike}>
                  <ThumbsUp size={18} className={liked ? "text-primary" : "text-muted-foreground"} />
                  <span className="text-sm">{likes}</span>
                </button>
                <div className="flex items-center gap-2">
                  <MessageSquare size={18} />
                  <span className="text-sm">{comments}</span>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <input
                  className="flex-1 bg-card border border-border rounded-md px-3 py-2 text-foreground placeholder:text-muted-foreground outline-none"
                  placeholder="Write a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <button
                  className="px-3 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition"
                  onClick={submitComment}
                >
                  Post
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
