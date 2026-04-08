import { useMemo, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import RightPanel from "../components/layout/RightPanel";
import { MessageSquare, ThumbsUp, ShieldCheck } from "lucide-react";

const COMMENTS_PREVIEW = 3;

// Badge config
const BADGE_STYLES = {
  "Legend":      { bg: "#6d28d9", color: "#ffffff", icon: "💎" },
  "Expert":      { bg: "#2563eb", color: "#ffffff", icon: "⚡" },
  "Contributor": { bg: "#16a34a", color: "#ffffff", icon: "🔥" },
  "Learner":     { bg: "#ca8a04", color: "#ffffff", icon: "📘" },
  "Newcomer":    { bg: "#64748b", color: "#ffffff", icon: "🌱" },
};

const sampleComments = [
  { id: 1, author: "Mark T.", badge: "Expert", text: "Great question! I'd also suggest using Fibonacci heaps for better amortized performance." },
  { id: 2, author: "Priya S.", badge: "Contributor", text: "The Min-Heap approach is O((V+E) log V) which is optimal for sparse graphs." },
  { id: 3, author: "James K.", badge: "Learner", text: "Don't forget to handle disconnected graphs!" },
  { id: 4, author: "Liu W.", badge: "Newcomer", text: "Python's heapq module makes this straightforward to implement." },
  { id: 5, author: "Aisha R.", badge: "Contributor", text: "Great point about using adjacency lists over matrices here." },
];

function Badge({ level }) {
  if (!level || !BADGE_STYLES[level]) return null;
  const { bg, icon } = BADGE_STYLES[level];
  return (
    <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${bg}`}>
      {icon} {level}
    </span>
  );
}

export default function Home() {
  const initial = useMemo(() => ([
    {
      id: 1,
      author: "Alex Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      badge: "Legend",
      domain: "Trusted in DSA",
      timeAgo: "posted 2h ago",
      category: "DSA",
      title: "How do I efficiently implement Dijkstra's algorithm?",
      body: "The best approach is to use a priority queue (Min-Heap)...",
      likes: 21,
      liked: false,
      comments: sampleComments,
    },
    {
      id: 2,
      author: "Sarah Williams",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      badge: "Expert",
      domain: "Verified in Placements",
      timeAgo: "posted 5h ago",
      category: "Placements",
      title: "Tips for memorizing functional groups for the upcoming midterm?",
      body: "I found that drawing them repeatedly and using mnemonic devices really helps. Try creating flashcards for each group and practicing daily.",
      likes: 21,
      liked: false,
      comments: sampleComments.slice(0, 2),
    }
  ]), []);

  const [feed, setFeed] = useState(initial);
  const [commentText, setCommentText] = useState({});
  const [expandedComments, setExpandedComments] = useState({});
  const [selectedTopic, setSelectedTopic] = useState(null);

  const handleLike = (id) => {
    setFeed(prev => prev.map(item => {
      if (item.id !== id) return item;
      const liked = !item.liked;
      return { ...item, liked, likes: liked ? item.likes + 1 : Math.max(0, item.likes - 1) };
    }));
  };

  const submitComment = (id) => {
    const text = (commentText[id] || "").trim();
    if (!text) return;
    const newComment = { id: Date.now(), author: "You", badge: "Newcomer", text };
    setFeed(prev => prev.map(item =>
      item.id === id ? { ...item, comments: [newComment, ...item.comments] } : item
    ));
    setCommentText(prev => ({ ...prev, [id]: "" }));
  };

  const filtered = feed.filter(item => !selectedTopic || item.category === selectedTopic);

  return (
    <MainLayout>
      <div style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>

        {/* Center Feed */}
        <div className="flex-1 min-w-0 max-w-[640px] space-y-5" style={{ marginLeft: "80px" }}>

          {/* Active filter pill */}
          {selectedTopic && (
            <div className="flex items-center gap-2">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
                #{selectedTopic}
              </span>
              <button onClick={() => setSelectedTopic(null)} className="text-xs text-muted-foreground hover:text-foreground">
                ✕ Clear
              </button>
            </div>
          )}

          {/* Feed */}
          {filtered.length === 0 ? (
            <div className="text-center text-muted-foreground py-10">No questions in this topic yet.</div>
          ) : filtered.map(item => {
            const isExpanded = expandedComments[item.id];
            const visibleComments = isExpanded ? item.comments : item.comments.slice(0, COMMENTS_PREVIEW);
            const hasMore = item.comments.length > COMMENTS_PREVIEW;

            return (
              <div key={item.id} className="bg-card border border-border rounded-2xl p-5 shadow-card">

                {/* Author row */}
                <div className="flex items-center gap-3">
                  <img src={item.avatar} alt={item.author} className="w-9 h-9 rounded-full object-cover" />
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-foreground">{item.author}</span>
                      <Badge level={item.badge} />
                      {item.domain && (
                        <span className="hidden sm:flex items-center gap-1 text-[11px] text-primary font-medium">
                          <ShieldCheck size={12} /> {item.domain}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {item.timeAgo} in <span className="text-primary font-medium">{item.category}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="mt-4">
                  <div className="text-base font-semibold text-foreground">{item.title}</div>
                  {item.body && <p className="mt-1 text-sm text-muted-foreground">{item.body}</p>}
                </div>

                {/* Like row */}
                <div className="mt-4 flex items-center gap-5 text-muted-foreground">
                  <button className="flex items-center gap-2" onClick={() => handleLike(item.id)}>
                    <ThumbsUp size={15} className={item.liked ? "text-primary" : "text-muted-foreground"} />
                    <span className="text-sm">{item.likes}</span>
                  </button>
                  <span className="flex items-center gap-1 text-sm">
                    <MessageSquare size={15} />
                    {item.comments.length}
                  </span>
                </div>

                {/* Comments */}
                {item.comments.length > 0 && (
                  <div className="mt-4 space-y-3 border-t border-border pt-3">
                    {visibleComments.map(c => (
                      <div key={c.id} className="flex gap-2 text-sm items-start">
                        <div className="flex items-center gap-1.5 whitespace-nowrap">
                          <span className="font-medium text-foreground">{c.author}</span>
                          {c.badge && <Badge level={c.badge} />}
                        </div>
                        <span className="text-muted-foreground">{c.text}</span>
                      </div>
                    ))}
                    {hasMore && (
                      <button
                        className="text-xs text-primary font-medium"
                        onClick={() => setExpandedComments(prev => ({ ...prev, [item.id]: !isExpanded }))}
                      >
                        {isExpanded ? "Show less" : `Read ${item.comments.length - COMMENTS_PREVIEW} more comments`}
                      </button>
                    )}
                  </div>
                )}

                {/* Add comment */}
                <div className="mt-3 flex items-center gap-2">
                  <input
                    className="flex-1 bg-background border border-border rounded-full px-3 py-1.5 text-sm text-foreground placeholder:text-muted-foreground outline-none"
                    placeholder="Add a comment..."
                    value={commentText[item.id] || ""}
                    onChange={(e) => setCommentText(prev => ({ ...prev, [item.id]: e.target.value }))}
                    onKeyDown={(e) => e.key === "Enter" && submitComment(item.id)}
                  />
                  <button
                    className="px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-sm hover:opacity-90 transition"
                    onClick={() => submitComment(item.id)}
                  >
                    Post
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Panel */}
        <div style={{ width: "288px", flexShrink: 0, position: "sticky", top: "24px", marginLeft: "auto" }}>
          <RightPanel selectedTopic={selectedTopic} onTopicSelect={setSelectedTopic} />
        </div>

      </div>
    </MainLayout>
  );
}