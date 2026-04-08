import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { Search, X, Star, BarChart2, Send, Plus, Minus, PenSquare } from "lucide-react";

// ── Data ────────────────────────────────────────────────────────
const ALL_PROFILES = [
  { id: 1, name: "Dr. Alex R.", role: "Data Science",  avatar: "https://i.pravatar.cc/100?img=11", years: "10+ yrs @ Google",  skill: "ML & Analytics", featured: true },
  { id: 2, name: "Marcus C.",   role: "Full Stack",    avatar: "https://i.pravatar.cc/100?img=13", years: "8+ yrs @ Meta",    skill: "React & Node.js" },
  { id: 3, name: "Lisa K.",     role: "Product",       avatar: "https://i.pravatar.cc/100?img=47", years: "6+ yrs @ Spotify", skill: "Growth & Strategy" },
  { id: 4, name: "James L.",    role: "Marketing",     avatar: "https://i.pravatar.cc/100?img=52" },
  { id: 5, name: "Elena R.",    role: "HR Consult",    avatar: "https://i.pravatar.cc/100?img=44" },
  { id: 6, name: "Chris P.",    role: "Mobile Dev",    avatar: "https://i.pravatar.cc/100?img=15" },
  { id: 7, name: "Nina J.",     role: "DevOps",        avatar: "https://i.pravatar.cc/100?img=36" },
  { id: 8, name: "Vikram S.",   role: "AI Ethics",     avatar: "https://i.pravatar.cc/100?img=57" },
  { id: 9, name: "Maya T.",     role: "Career Coach",  avatar: "https://i.pravatar.cc/100?img=49" },
  { id: 10, name: "Omar D.",    role: "Frontend",      avatar: "https://i.pravatar.cc/100?img=60" },
  { id: 11, name: "Chloe B.",   role: "Product",       avatar: "https://i.pravatar.cc/100?img=39" },
];

const COMMUNITY_STATS = [
  { label: "Members",    value: "1.2k", green: false },
  { label: "Posts",      value: "348",  green: false },
  { label: "Mentors",    value: "89",   green: false },
  { label: "Online now", value: "24",   green: true  },
];

const CATEGORIES = [
  { label: "Research",           count: 18, color: "#4a8fa8" },
  { label: "Internships",        count: 35, color: "#e0a030" },
  { label: "Scholarships",       count: 22, color: "#3dca8a" },
  { label: "Volunteering",       count: 14, color: "#e05555" },
  { label: "Design & UX",        count: 19, color: "#c060c0" },
  { label: "Freelance Projects", count: 42, color: "#4a8fa8" },
  { label: "Startup Advice",     count: 31, color: "#5aaa8a" },
  { label: "Mentorship Tips",    count: 27, color: "#8a70b0" },
];

const ALL_TAGS = CATEGORIES.map((c) => c.label);
const TOP_PROFILES = ALL_PROFILES.slice(0, 5);

const INITIAL_OPPORTUNITIES = [
  {
    id: 1, category: null, upvotes: 13,
    author: "intasham", avatar: "https://i.pravatar.cc/100?img=11", time: "6 days ago · Edited",
    title: "🎉 Welcome to Discover 🎉",
    body: "Hi there! 👋\n\nWelcome to Discover. This is a community-driven platform built for sharing and growing together.",
    tag: "⚡ Features",
    bullets: ["Connect with local mentors", "Engagement through collaborative feeds"],
    comments: 2,
    initialComments: [
      { id: 1, author: "Sarah W.", avatar: "https://i.pravatar.cc/100?img=47", time: "5d ago", text: "This platform looks amazing! Can't wait to explore." },
      { id: 2, author: "Marcus C.", avatar: "https://i.pravatar.cc/100?img=13", time: "4d ago", text: "Great initiative! Looking forward to connecting." },
    ],
  },
  {
    id: 2, category: "Startup Advice", upvotes: 8,
    author: "Marcus C.", avatar: "https://i.pravatar.cc/100?img=13", time: "3 days ago",
    title: "🚀 Looking for a Co-founder in EdTech",
    body: "Hey community! 👋\n\nI'm building an EdTech startup focused on personalized learning for underserved students and looking for a technical co-founder to join the journey.",
    tag: "🤝 Collaboration",
    bullets: ["Experience with React or mobile development", "Passion for education and social impact"],
    comments: 7,
    initialComments: [
      { id: 1, author: "Dr. Alex R.", avatar: "https://i.pravatar.cc/100?img=11", time: "2d ago", text: "This is a great initiative! Happy to connect." },
    ],
  },
  {
    id: 3, category: "Freelance Projects", upvotes: 5,
    author: "Lisa K.", avatar: "https://i.pravatar.cc/100?img=47", time: "1 day ago",
    title: "💼 Freelance UI/UX Designer Needed",
    body: "Looking for a skilled UI/UX designer for a 3-month freelance contract.\n\nThe project involves redesigning a SaaS dashboard for a fintech client.",
    tag: "💼 Freelance",
    bullets: ["Strong Figma skills required", "Experience with fintech or dashboard design a plus"],
    comments: 4, initialComments: [],
  },
  {
    id: 4, category: "Mentorship Tips", upvotes: 11,
    author: "Dr. Alex R.", avatar: "https://i.pravatar.cc/100?img=11", time: "2 days ago",
    title: "🎓 How to Find the Right Mentor",
    body: "Mentorship changed my career. Here's what I learned after 10 years at Google.\n\nFinding the right mentor is less about status and more about alignment.",
    tag: "🎓 Mentorship",
    bullets: ["Look for someone whose journey mirrors your goals", "Consistency matters more than credentials"],
    comments: 9,
    initialComments: [
      { id: 1, author: "Nina J.", avatar: "https://i.pravatar.cc/100?img=36", time: "1d ago", text: "Such valuable advice, thank you!" },
    ],
  },
];

// ── Centered Modal Shell ─────────────────────────────────────────
function CenteredModal({ onClose, children, maxWidth = "480px", maxHeight = "90vh" }) {
  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-40" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="pointer-events-auto flex flex-col rounded-2xl shadow-2xl w-full overflow-hidden"
          style={{
            background: "var(--bg-card)",
            maxWidth,
            maxHeight,
            border: "1px solid var(--border-color)",
            boxShadow: "0 24px 64px rgba(0,0,0,0.35)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </>
  );
}

// ── Modal Header ─────────────────────────────────────────────────
function ModalHeader({ title, onClose, onBack }) {
  return (
    <div
      className="flex items-center justify-between px-5 py-4 flex-shrink-0"
      style={{ borderBottom: "1px solid var(--border-color)" }}
    >
      <div className="w-8">
        {onBack && (
          <button
            onClick={onBack}
            className="w-8 h-8 flex items-center justify-center rounded-full border-0 bg-transparent cursor-pointer"
            style={{ color: "var(--text-primary)" }}
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
          </button>
        )}
      </div>
      <span className="text-sm font-bold tracking-widest uppercase" style={{ color: "var(--text-primary)" }}>
        {title}
      </span>
      <button
        onClick={onClose}
        className="w-8 h-8 flex items-center justify-center rounded-full border-0 cursor-pointer transition-colors"
        style={{ background: "var(--hover-bg)", color: "var(--text-secondary)" }}
      >
        <X size={14} />
      </button>
    </div>
  );
}

// ── Post Composer Modal ──────────────────────────────────────────
function PostComposerModal({ onClose, onPublish }) {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [highlights, setHighlights] = useState([""]);
  const MAX_TAGS = 3;
  const MAX_HIGHLIGHTS = 5;

  const toggleTag = (tag) => {
    setSelectedTags((prev) => {
      if (prev.includes(tag)) return prev.filter((t) => t !== tag);
      if (prev.length >= MAX_TAGS) return prev;
      return [...prev, tag];
    });
  };
  const addHighlight = () => { if (highlights.length < MAX_HIGHLIGHTS) setHighlights((p) => [...p, ""]); };
  const removeHighlight = (idx) => setHighlights((p) => p.filter((_, i) => i !== idx));
  const updateHighlight = (idx, val) => setHighlights((p) => p.map((h, i) => (i === idx ? val : h)));
  const canPreview = title.trim().length > 0 && description.trim().length > 0;

  const handlePublish = () => {
    const newPost = {
      id: Date.now(), category: selectedTags[0] || null, upvotes: 0,
      author: "You", avatar: "https://i.pravatar.cc/100?img=5", time: "Just now · Draft",
      title: title.trim(), body: description.trim(),
      tag: selectedTags.length > 0 ? `⚡ ${selectedTags[0]}` : "⚡ General",
      bullets: highlights.filter((h) => h.trim()), comments: 0, initialComments: [],
    };
    onPublish(newPost);
    onClose();
  };

  return (
    <CenteredModal onClose={onClose} maxWidth="520px">
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-4 flex-shrink-0"
        style={{ borderBottom: "1px solid var(--border-color)" }}
      >
        <div className="w-8">
          {step === 2 && (
            <button
              onClick={() => setStep(1)}
              className="w-8 h-8 flex items-center justify-center rounded-full border-0 bg-transparent cursor-pointer"
              style={{ color: "var(--text-primary)" }}
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
            </button>
          )}
        </div>
        {/* Step pills */}
        <div className="flex items-center gap-2">
          {[1, 2].map((s) => {
            const labels = ["Content", "Preview"];
            const isActive = step === s;
            const isDone = step > s;
            return (
              <button
                key={s}
                onClick={() => { if (s === 2 && canPreview) setStep(2); if (s === 1) setStep(1); }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border-0 cursor-pointer transition-all"
                style={{
                  background: isActive ? "linear-gradient(135deg, var(--primary-blue), #60a5fa)" : isDone ? "rgba(34,197,94,0.15)" : "rgba(59,130,246,0.12)",
                  color: isActive ? "#fff" : isDone ? "#22c55e" : "#6b7280",
                }}
              >
                <span
                  className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-extrabold"
                  style={{
                    background: isActive ? "rgba(255,255,255,0.25)" : isDone ? "#22c55e" : "rgba(59,130,246,0.3)",
                    color: isActive || isDone ? "#fff" : "#6b7280",
                  }}
                >
                  {s}
                </span>
                {labels[s - 1]}
              </button>
            );
          })}
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-full border-0 cursor-pointer transition-colors"
          style={{ background: "var(--hover-bg)", color: "var(--text-secondary)" }}
        >
          <X size={14} />
        </button>
      </div>

      {/* Step 1 */}
      {step === 1 && (
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5" style={{ minHeight: 0 }}>
          <div>
            <label className="flex items-center gap-1.5 text-[11px] font-bold tracking-widest uppercase mb-2" style={{ color: "var(--text-secondary)" }}>
              <span style={{ color: "#2d6a8a" }}>T</span> POST TITLE <span style={{ color: "#e05555" }}>*</span>
            </label>
            <div className="relative">
              <input
                className="w-full px-4 py-3 rounded-xl text-sm outline-none border transition-colors"
                style={{ background: "var(--hover-bg)", borderColor: title.length > 0 ? "var(--primary-blue)" : "var(--border-color)", color: "var(--text-primary)" }}
                placeholder="Give your post a catchy title..."
                value={title}
                maxLength={100}
                onChange={(e) => setTitle(e.target.value)}
              />
              <span className="absolute bottom-2 right-3 text-[10px]" style={{ color: title.length >= 90 ? "#e05555" : "#9ca3af" }}>{title.length}/100</span>
            </div>
          </div>
          <div>
            <label className="flex items-center gap-1.5 text-[11px] font-bold tracking-widest uppercase mb-2" style={{ color: "var(--text-secondary)" }}>
              DESCRIPTION <span style={{ color: "#e05555" }}>*</span>
            </label>
            <div className="relative">
              <textarea
                className="w-full px-4 py-3 rounded-xl text-sm outline-none border resize-none transition-colors"
                style={{ background: "var(--hover-bg)", borderColor: description.length > 0 ? "var(--primary-blue)" : "var(--border-color)", color: "var(--text-primary)", minHeight: "110px" }}
                placeholder="Write a compelling description of your post..."
                value={description}
                maxLength={400}
                onChange={(e) => setDescription(e.target.value)}
              />
              <span className="absolute bottom-2 right-3 text-[10px]" style={{ color: description.length >= 380 ? "#e05555" : "#9ca3af" }}>{description.length}/400</span>
            </div>
          </div>
          <div>
            <label className="flex items-center gap-1.5 text-[11px] font-bold tracking-widest uppercase mb-1" style={{ color: "var(--text-secondary)" }}>
              <span style={{ color: "#e0a030" }}>⚡</span> TAGS
              <span className="text-[10px] font-normal ml-0.5" style={{ color: "#9ca3af" }}>(up to 3)</span>
            </label>
            <div className="flex flex-wrap gap-2 mt-2">
              {CATEGORIES.map((cat) => {
                const isSelected = selectedTags.includes(cat.label);
                return (
                  <button
                    key={cat.label}
                    onClick={() => toggleTag(cat.label)}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold border-0 cursor-pointer transition-all"
                    style={{
                      background: isSelected ? cat.color : "var(--hover-bg)",
                      color: isSelected ? "#fff" : "var(--text-primary)",
                      border: isSelected ? `1.5px solid ${cat.color}` : "1.5px solid var(--border-color)",
                      opacity: !isSelected && selectedTags.length >= MAX_TAGS ? 0.4 : 1,
                      boxShadow: isSelected ? `0 2px 8px ${cat.color}55` : "none",
                    }}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <label className="flex items-center gap-1.5 text-[11px] font-bold tracking-widest uppercase mb-1" style={{ color: "var(--text-secondary)" }}>
              KEY HIGHLIGHTS <span className="text-[10px] font-normal ml-0.5" style={{ color: "#9ca3af" }}>(up to 5)</span>
            </label>
            <p className="text-[11px] mb-3" style={{ color: "#6b7280" }}>Add short bullet points that summarize the key details.</p>
            <div className="space-y-2">
              {highlights.map((h, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full flex-shrink-0 bg-primary" />
                  <input
                    className="flex-1 h-9 px-3 rounded-xl text-sm outline-none border transition-colors"
                    style={{ background: "var(--hover-bg)", borderColor: "var(--border-color)", color: "var(--text-primary)" }}
                    placeholder={`Highlight ${idx + 1}...`}
                    value={h}
                    onChange={(e) => updateHighlight(idx, e.target.value)}
                  />
                  {highlights.length > 1 && (
                    <button
                      onClick={() => removeHighlight(idx)}
                      className="w-7 h-7 rounded-full flex items-center justify-center border-0 cursor-pointer flex-shrink-0"
                      style={{ background: "rgba(224,85,85,0.12)", color: "#e05555" }}
                    >
                      <Minus size={12} />
                    </button>
                  )}
                </div>
              ))}
            </div>
            {highlights.length < MAX_HIGHLIGHTS && (
              <button onClick={addHighlight} className="flex items-center gap-1.5 mt-3 text-xs font-semibold border-0 bg-transparent cursor-pointer" style={{ color: "var(--primary-blue)" }}>
                <Plus size={13} /> Add highlight
              </button>
            )}
          </div>
          <div className="h-2" />
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-4" style={{ minHeight: 0 }}>
          <p className="text-center text-xs" style={{ color: "#6b7280" }}>This is how your post will appear in the feed.</p>
          <div className="rounded-xl border p-4" style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}>
            <div className="flex items-start gap-2.5 mb-2">
              <img src="https://i.pravatar.cc/100?img=5" alt="You" className="w-9 h-9 rounded-full object-cover border" style={{ borderColor: "#e2e8f0" }} />
              <div className="flex-1">
                <div className="text-[13.5px] font-semibold" style={{ color: "#111827" }}>You</div>
                <div className="flex items-center gap-1.5 text-[11px]" style={{ color: "#6b7280" }}>
                  Just now <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold" style={{ background: "rgba(224,160,48,0.15)", color: "#e0a030" }}>Draft</span>
                </div>
              </div>
            </div>
            <div className="text-[15px] font-bold mb-1.5" style={{ color: "#111827" }}>{title || "Your post title"}</div>
            <div className="text-[13px] leading-relaxed mb-3 whitespace-pre-line" style={{ color: "#6b7280" }}>{description || "Your description will appear here..."}</div>
            {selectedTags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                {selectedTags.map((tag) => {
                  const catMeta = CATEGORIES.find((c) => c.label === tag);
                  return (
                    <span key={tag} className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border"
                      style={{ background: catMeta ? `${catMeta.color}20` : "#e0f2fe", borderColor: catMeta ? `${catMeta.color}55` : "#bae6fd", color: catMeta ? catMeta.color : "#0369a1" }}>
                      ⚡ {tag}
                    </span>
                  );
                })}
              </div>
            )}
            {highlights.filter((h) => h.trim()).length > 0 && (
              <ul className="mb-3 space-y-1">
                {highlights.filter((h) => h.trim()).map((b, i) => (
                  <li key={i} className="flex items-center gap-2 text-[12px]" style={{ color: "#6b7280" }}>
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-primary" /> {b}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="px-5 py-4 flex flex-col gap-2.5 flex-shrink-0" style={{ borderTop: "1px solid var(--border-color)" }}>
        {step === 1 ? (
          <button
            onClick={() => canPreview && setStep(2)}
            className="w-full py-3 rounded-xl text-sm font-bold border-0 cursor-pointer transition-all"
            style={{
              background: canPreview ? "linear-gradient(135deg, var(--primary-blue), #2563eb)" : "var(--hover-bg)",
              color: canPreview ? "#fff" : "var(--text-secondary)",
              boxShadow: canPreview ? "0 4px 14px rgba(59, 130, 246, 0.4)" : "none",
              cursor: canPreview ? "pointer" : "not-allowed",
            }}
          >
            Preview Post →
          </button>
        ) : (
          <>
            <button
              onClick={handlePublish}
              className="w-full py-3 rounded-xl text-sm font-bold border-0 cursor-pointer active:scale-[0.98] transition-transform"
              style={{ background: "linear-gradient(135deg, var(--primary-blue), #2563eb)", color: "#fff", boxShadow: "0 6px 20px rgba(37,99,235,0.45)" }}
            >
              ➤ Publish to Discover
            </button>
            <button
              onClick={() => setStep(1)}
              className="w-full py-2.5 rounded-xl text-sm font-semibold border cursor-pointer transition-colors"
              style={{ background: "transparent", borderColor: "var(--border-color)", color: "var(--text-primary)" }}
            >
              ✏ Go back and edit
            </button>
          </>
        )}
      </div>
    </CenteredModal>
  );
}

// ── Comments Modal ───────────────────────────────────────────────
function CommentsModal({ post, onClose, onAddComment }) {
  const [text, setText] = useState("");
  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onAddComment(post.id, trimmed);
    setText("");
  };
  return (
    <CenteredModal onClose={onClose} maxWidth="480px" maxHeight="80vh">
      <ModalHeader title="Comments" onClose={onClose} />
      {/* Post title */}
      <div className="px-5 py-3 flex-shrink-0" style={{ borderBottom: "1px solid var(--border-color)" }}>
        <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{post.title}</span>
      </div>
      {/* Comments list */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4" style={{ minHeight: 0 }}>
        {post.liveComments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "rgba(59,130,246,0.1)" }}>
              <svg width="20" height="20" fill="none" stroke="var(--primary-blue)" strokeWidth="1.8" viewBox="0 0 24 24">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <p className="text-sm" style={{ color: "#9ca3af" }}>No comments yet. Be the first!</p>
          </div>
        ) : (
          post.liveComments.map((c) => (
            <div key={c.id} className="flex items-start gap-3">
              <img src={c.avatar} alt={c.author} className="w-9 h-9 rounded-full object-cover flex-shrink-0 border" style={{ borderColor: "#e5e7eb" }} />
              <div className="flex-1">
                <div className="flex items-baseline gap-2 mb-0.5">
                  <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{c.author}</span>
                  <span className="text-[11px]" style={{ color: "var(--text-secondary)" }}>{c.time}</span>
                </div>
                <p className="text-[13.5px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>{c.text}</p>
              </div>
            </div>
          ))
        )}
      </div>
      {/* Input */}
      <div className="px-4 py-3 flex items-center gap-3 flex-shrink-0" style={{ borderTop: "1px solid var(--border-color)" }}>
        <input
          className="flex-1 h-10 px-4 rounded-xl text-sm outline-none border transition-colors"
          style={{ background: "var(--hover-bg)", borderColor: "var(--border-color)", color: "var(--text-primary)" }}
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
        />
        <button
          onClick={handleSend}
          className="w-10 h-10 rounded-full flex items-center justify-center border-0 cursor-pointer flex-shrink-0"
          style={{ background: text.trim() ? "linear-gradient(135deg, var(--primary-blue), #60a5fa)" : "#e5e7eb", transition: "background 0.2s" }}
        >
          <Send size={15} color={text.trim() ? "#fff" : "#9ca3af"} />
        </button>
      </div>
    </CenteredModal>
  );
}

// ── Share Modal ──────────────────────────────────────────────────
function ShareModal({ post, onClose }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(`https://discover.app/post/${post.id}`).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const shareOptions = [
    {
      label: "WhatsApp", color: "#25D366", bg: "rgba(37,211,102,0.12)",
      icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>,
    },
    {
      label: "Email", color: "#3B82F6", bg: "rgba(59,130,246,0.12)",
      icon: <svg width="26" height="26" fill="none" stroke="#3B82F6" strokeWidth="1.8" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>,
    },
    {
      label: copied ? "Copied!" : "Copy Link",
      color: copied ? "#3dca8a" : "#a0a8b8",
      bg: copied ? "rgba(61,202,138,0.12)" : "rgba(160,168,184,0.12)",
      onClick: handleCopy,
      icon: <svg width="26" height="26" fill="none" stroke={copied ? "#3dca8a" : "#a0a8b8"} strokeWidth="1.8" viewBox="0 0 24 24">{copied ? <path d="M20 6L9 17l-5-5"/> : <><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></>}</svg>,
    },
    {
      label: "Community", color: "#8a70b0", bg: "rgba(138,112,176,0.12)",
      icon: <svg width="26" height="26" fill="none" stroke="#8a70b0" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    },
    {
      label: "LinkedIn", color: "#0A66C2", bg: "rgba(10,102,194,0.12)",
      icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="#0A66C2"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
    },
  ];

  return (
    <CenteredModal onClose={onClose} maxWidth="420px">
      <ModalHeader title="Share Post" onClose={onClose} />
      {/* Post preview pill */}
      <div className="mx-5 mt-4 mb-2 flex items-center gap-2.5 px-3 py-2.5 rounded-xl border" style={{ background: "var(--hover-bg)", borderColor: "var(--border-color)" }}>
        <svg width="14" height="14" fill="none" stroke="var(--primary-blue)" strokeWidth="2" viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
        </svg>
        <span className="text-xs font-semibold truncate flex-1" style={{ color: "var(--text-primary)" }}>{post.title}</span>
      </div>
      {/* Share options grid */}
      <div className="grid grid-cols-5 gap-3 px-5 py-5">
        {shareOptions.map((opt) => (
          <button key={opt.label} onClick={opt.onClick || undefined} className="flex flex-col items-center gap-2 border-0 bg-transparent cursor-pointer">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center border"
              style={{ background: opt.bg, borderColor: `${opt.color}40` }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.07)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              {opt.icon}
            </div>
            <span className="text-[10.5px] font-medium text-center leading-tight" style={{ color: opt.color }}>{opt.label}</span>
          </button>
        ))}
      </div>
      {/* Cancel */}
      <div className="px-5 pb-5">
        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl text-sm font-semibold border-0 cursor-pointer transition-colors"
          style={{ background: "var(--hover-bg)", color: "var(--text-primary)" }}
        >
          Cancel
        </button>
      </div>
    </CenteredModal>
  );
}

// ── Post Composer Bar ────────────────────────────────────────────
function PostComposer({ onOpen }) {
  return (
    <div className="mx-5 mb-4">
      <button
        onClick={onOpen}
        className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl border cursor-pointer transition-all"
        style={{ background: "var(--panel-accent-bg)", borderColor: "var(--border-color)", boxShadow: "inset 0 1px 3px rgba(0,0,0,0.03)" }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--primary-blue)"; e.currentTarget.style.background = "var(--hover-bg)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-color)"; e.currentTarget.style.background = "var(--panel-accent-bg)"; }}
      >
        <PenSquare size={15} style={{ color: "var(--text-secondary)", flexShrink: 0 }} />
        <span className="flex-1 text-left text-sm" style={{ color: "var(--text-secondary)", letterSpacing: "0.01em" }}>
          Share your thoughts with the community...
        </span>
        <span className="px-3 py-1 rounded-lg text-xs font-bold flex-shrink-0" style={{ background: "linear-gradient(135deg, var(--primary-blue), #60a5fa)", color: "#fff" }}>
          Post
        </span>
      </button>
    </div>
  );
}

// ── Profiles Modal ───────────────────────────────────────────────
function ProfilesModal({ onClose, filteredProfiles, drawerSearch, setDrawerSearch, expandedProfile, setExpandedProfile }) {
  return (
    <CenteredModal onClose={onClose} maxWidth="580px" maxHeight="85vh">
      <ModalHeader title="Top Profiles" onClose={onClose} />
      {/* Search */}
      <div className="px-5 py-3 flex-shrink-0" style={{ borderBottom: "1px solid var(--border-color)" }}>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#9ca3af" }} />
          <input
            className="w-full h-10 pl-10 pr-4 rounded-xl outline-none text-sm border transition-colors"
            style={{ background: "var(--hover-bg)", borderColor: "var(--border-color)", color: "var(--text-primary)" }}
            placeholder="Find your next guide..."
            value={drawerSearch}
            onChange={(e) => setDrawerSearch(e.target.value)}
          />
        </div>
      </div>
      {/* Grid */}
      <div
        className="flex-1 overflow-y-auto px-5 py-4"
        style={{ minHeight: 0, scrollbarWidth: "thin", scrollbarColor: "rgba(58,109,138,0.3) transparent" }}
      >
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-4">
          {filteredProfiles.map((p) => (
            <div key={p.id} className="relative">
              <button
                className="w-full flex flex-col items-center gap-2 p-3 rounded-2xl border cursor-pointer transition-all"
                style={{ borderColor: "var(--border-color)", background: "var(--panel-accent-bg)" }}
                onClick={() => setExpandedProfile(expandedProfile?.id === p.id ? null : p)}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--hover-bg)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "var(--panel-accent-bg)")}
              >
                <img src={p.avatar} alt={p.name} className="w-14 h-14 rounded-full object-cover border-2" style={{ borderColor: "rgba(58,109,138,0.3)" }} />
                <span className="text-xs font-semibold text-center leading-tight" style={{ color: "var(--text-primary)" }}>{p.name}</span>
                <span className="text-[10px] text-center" style={{ color: "var(--text-secondary)" }}>{p.role}</span>
              </button>
              {expandedProfile?.id === p.id && p.years && (
                <div
                  className="absolute top-0 left-0 z-10 w-52 rounded-2xl shadow-xl p-4 border"
                  style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <img src={p.avatar} alt={p.name} className="w-12 h-12 rounded-full border object-cover" style={{ borderColor: "rgba(58,109,138,0.3)" }} />
                    <div>
                      <div className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>{p.name}</div>
                      <div className="text-xs" style={{ color: "var(--text-secondary)" }}>{p.role}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold mb-1" style={{ color: "#f59e0b" }}>
                    <Star size={13} style={{ fill: "#f59e0b" }} />{p.years}
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold mb-3" style={{ color: "#10b981" }}>
                    <BarChart2 size={13} />{p.skill}
                  </div>
                  <button
                    className="w-full py-1.5 rounded-lg text-xs font-semibold border cursor-pointer"
                    style={{ borderColor: "#4a8fa8", color: "#2d6a8a", background: "transparent" }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "#2d6a8a"; e.currentTarget.style.color = "#fff"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#2d6a8a"; }}
                  >
                    View Profile
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </CenteredModal>
  );
}

// ── Main Component ───────────────────────────────────────────────
export default function Discover() {
  const navigate = useNavigate();

  const [opportunities, setOpportunities]           = useState(INITIAL_OPPORTUNITIES);
  const [voteState, setVoteState]                   = useState(() => Object.fromEntries(INITIAL_OPPORTUNITIES.map((o) => [o.id, { vote: null, count: o.upvotes }])));
  const [liveComments, setLiveComments]             = useState(() => Object.fromEntries(INITIAL_OPPORTUNITIES.map((o) => [o.id, o.initialComments || []])));
  const [showComposerModal, setShowComposerModal]   = useState(false);
  const [showPublishSuccess, setShowPublishSuccess] = useState(false);
  const [showProfilesModal, setShowProfilesModal]   = useState(false);
  const [drawerSearch, setDrawerSearch]             = useState("");
  const [expandedProfile, setExpandedProfile]       = useState(null);
  const [query, setQuery]                           = useState("");
  const [openMenuId, setOpenMenuId]                 = useState(null);
  const [activeCategories, setActiveCategories]     = useState([]);
  const [commentsPost, setCommentsPost]             = useState(null);
  const [sharePost, setSharePost]                   = useState(null);
  const [showComingSoon, setShowComingSoon]         = useState(false);

  const handlePublishPost = (newPost) => {
    setOpportunities((prev) => [newPost, ...prev]);
    setVoteState((prev) => ({ ...prev, [newPost.id]: { vote: null, count: 0 } }));
    setLiveComments((prev) => ({ ...prev, [newPost.id]: [] }));
    setShowPublishSuccess(true);
  };

  const handleVote = (postId, direction) => {
    setVoteState((prev) => {
      const current = prev[postId];
      if (direction === "down") return { ...prev, [postId]: { vote: current.vote === "down" ? null : "down", count: current.count } };
      if (current.vote === "up") return { ...prev, [postId]: { vote: null, count: current.count - 1 } };
      return { ...prev, [postId]: { vote: "up", count: current.count + 1 } };
    });
  };

  const handleAddComment = (postId, text) => {
    setLiveComments((prev) => ({
      ...prev,
      [postId]: [...prev[postId], { id: Date.now(), author: "You", avatar: "https://i.pravatar.cc/100?img=5", time: "Just now", text }],
    }));
  };

  const handleCategory = (label) => {
    setActiveCategories((prev) => prev.includes(label) ? prev.filter((c) => c !== label) : [...prev, label]);
  };
  const clearCategories = () => setActiveCategories([]);

  const filteredOpportunities = useMemo(() => {
    let list = opportunities;
    if (activeCategories.length > 0) list = list.filter((o) => o.category && activeCategories.includes(o.category));
    const q = query.trim().toLowerCase();
    if (q) list = list.filter((o) => o.title.toLowerCase().includes(q) || o.tag.toLowerCase().includes(q));
    return list;
  }, [activeCategories, query, opportunities]);

  const filteredProfiles = useMemo(() => {
    const q = drawerSearch.trim().toLowerCase();
    if (!q) return ALL_PROFILES;
    return ALL_PROFILES.filter((p) => p.name.toLowerCase().includes(q) || p.role.toLowerCase().includes(q));
  }, [drawerSearch]);

  const closeProfilesModal = () => { setShowProfilesModal(false); setExpandedProfile(null); };
  const toggleMenu = (id, e) => { e.stopPropagation(); setOpenMenuId(openMenuId === id ? null : id); };
  const closeMenu  = () => setOpenMenuId(null);
  const NAV_H = 53;

  return (
    <MainLayout>
      <div className="flex gap-5" style={{ height: `calc(100vh - ${NAV_H}px)`, alignItems: "stretch" }} onClick={closeMenu}>

        {/* ════ LEFT MAIN PANEL ════ */}
        <div className="flex-1 min-w-0 rounded-2xl border border-blue-500/10 bg-background/50 flex flex-col" style={{ minHeight: 0, overflow: "hidden" }}>
          <div className="flex items-center gap-3 px-5 py-3 border-b border-blue-500/20 bg-blue-500/5 rounded-t-2xl flex-shrink-0">
            <div className="w-5 h-5 rounded-lg flex items-center justify-center flex-shrink-0 bg-blue-500/20">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            </div>
            <span className="text-blue-500 font-bold text-sm tracking-tight">Discover</span>
          </div>

          <div className="flex-1 overflow-y-auto" style={{ minHeight: 0, scrollbarWidth: "thin", scrollbarColor: "var(--border-color) transparent" }}>
            <div className="px-5 pt-4 pb-2 text-[10px] font-bold tracking-widest uppercase text-muted-foreground opacity-70">Community Feed</div>

            {/* Top Profiles strip */}
            <div className="mx-5 mb-4 rounded-xl border border-blue-500/20 p-3" style={{ background: "var(--panel-accent-bg)" }}>
              <div className="flex items-center justify-between mb-3">
                <div className="text-[11.5px] font-bold uppercase tracking-wide text-foreground">Top Profiles</div>
                <button onClick={() => setShowProfilesModal(true)} className="text-[11.5px] font-semibold hover:underline bg-transparent border-0 cursor-pointer text-blue-500">View All</button>
              </div>
              <div className="flex items-center gap-5">
                {TOP_PROFILES.map((p) => (
                  <div key={p.id} className="flex flex-col items-center gap-1.5">
                    <img src={p.avatar} alt={p.name} className="w-11 h-11 rounded-full object-cover border-2 border-white/30" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.3)" }} />
                    <span className="text-[10.5px] text-muted-foreground">{p.name.split(" ")[0]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Post composer */}
            <PostComposer onOpen={() => setShowComposerModal(true)} />

            {/* Active filter pills */}
            {activeCategories.length > 0 && (
              <div className="px-5 pb-3 flex flex-wrap gap-2 items-center">
                {activeCategories.map((cat) => {
                  const meta = CATEGORIES.find((c) => c.label === cat);
                  return (
                    <button key={cat} onClick={() => handleCategory(cat)}
                      className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border-0 cursor-pointer transition-all"
                      style={{ background: meta ? `${meta.color}25` : "rgba(58,109,138,0.18)", color: meta ? meta.color : "#6ab8d4", border: `1px solid ${meta ? meta.color + "55" : "rgba(58,109,138,0.3)"}` }}>
                      {cat} <X size={11} />
                    </button>
                  );
                })}
                {activeCategories.length > 1 && (
                  <button onClick={clearCategories} className="text-[11px] font-semibold border-0 bg-transparent cursor-pointer" style={{ color: "#9ca3af" }}>Clear all</button>
                )}
              </div>
            )}

            {/* Post cards */}
            <div className="px-5 pb-5">
              {filteredOpportunities.length === 0 ? (
                <div className="text-center py-10 text-muted-foreground text-sm">No posts in this category yet.</div>
              ) : (
                filteredOpportunities.map((o) => {
                  const vs = voteState[o.id] || { vote: null, count: 0 };
                  return (
                    <div key={o.id} className="bg-[var(--panel-accent-bg)] border border-border/40 rounded-xl p-4 mb-3 hover:border-blue-500/50 transition-colors" onClick={closeMenu}>
                      <div className="flex items-start gap-2.5 mb-2">
                        <img src={o.avatar} alt={o.author} className="w-9 h-9 rounded-full object-cover flex-shrink-0 border border-border" />
                        <div className="flex-1">
                          <div className="text-[13.5px] font-semibold text-foreground leading-tight">{o.author}</div>
                          <div className="text-xs text-muted-foreground">{o.time}</div>
                        </div>
                        <div className="relative">
                          <button onClick={(e) => toggleMenu(o.id, e)} className="w-7 h-7 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors bg-transparent border-0 cursor-pointer">
                            <svg width="4" height="16" viewBox="0 0 4 16" fill="currentColor"><circle cx="2" cy="2" r="1.5"/><circle cx="2" cy="8" r="1.5"/><circle cx="2" cy="14" r="1.5"/></svg>
                          </button>
                          {openMenuId === o.id && (
                            <div className="absolute right-0 top-8 z-20 w-36 rounded-xl border border-border bg-card shadow-xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
                              <button className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors bg-transparent border-0 cursor-pointer text-left" onClick={closeMenu}>
                                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                                Hide
                              </button>
                              <div className="h-px bg-border" />
                              <button className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors bg-transparent border-0 cursor-pointer text-left" onClick={closeMenu}>
                                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>
                                Report
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="pl-1">
                        <div className="text-[15px] font-bold text-foreground mb-2">{o.title}</div>
                        <div className="text-[13.5px] text-muted-foreground leading-relaxed mb-3 whitespace-pre-line">
                          {o.body.split("Discover").map((part, i, arr) =>
                            i < arr.length - 1
                              ? <span key={i}>{part}<strong className="text-foreground">Discover</strong></span>
                              : <span key={i}>{part}</span>
                          )}
                        </div>
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full mb-3 border border-blue-500/20 bg-blue-500/10 text-blue-500">
                          {o.tag}
                        </span>
                        <ul className="mb-3 space-y-1">
                          {o.bullets.map((b, i) => (
                            <li key={i} className="flex items-center gap-2 text-[13px] text-muted-foreground">
                              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-primary" /> {b}
                            </li>
                          ))}
                        </ul>

                        <div className="flex items-center gap-2 pt-2.5 border-t border-border">
                          {/* Vote */}
                          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg" style={{ background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.25)" }}>
                            <button onClick={(e) => { e.stopPropagation(); handleVote(o.id, "up"); }} className="flex items-center justify-center border-0 p-0 cursor-pointer rounded"
                              style={{ background: "transparent", color: vs.vote === "up" ? "var(--primary-blue)" : "var(--muted-foreground)", transform: vs.vote === "up" ? "scale(1.2)" : "scale(1)", transition: "transform 0.15s, color 0.15s" }}>
                              <svg width="14" height="14" fill={vs.vote === "up" ? "var(--primary-blue)" : "none"} stroke={vs.vote === "up" ? "var(--primary-blue)" : "currentColor"} strokeWidth="2" viewBox="0 0 24 24"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/><path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>
                            </button>
                            <span className="text-xs font-bold" style={{ color: vs.vote === "up" ? "var(--primary-blue)" : vs.vote === "down" ? "#f87171" : "var(--foreground)", minWidth: "18px", textAlign: "center" }}>{vs.count}</span>
                            <button onClick={(e) => { e.stopPropagation(); handleVote(o.id, "down"); }} className="flex items-center justify-center border-0 p-0 cursor-pointer rounded"
                              style={{ background: "transparent", color: vs.vote === "down" ? "#f87171" : "var(--muted-foreground)", transform: vs.vote === "down" ? "scale(1.2)" : "scale(1)", transition: "transform 0.15s, color 0.15s" }}>
                              <svg width="14" height="14" fill={vs.vote === "down" ? "#f87171" : "none"} stroke={vs.vote === "down" ? "#f87171" : "currentColor"} strokeWidth="2" viewBox="0 0 24 24"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3H10z"/><path d="M17 2h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/></svg>
                            </button>
                          </div>
                          {/* Comments */}
                          <button
                            onClick={(e) => { e.stopPropagation(); setCommentsPost({ ...o, liveComments: liveComments[o.id] }); }}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer border-0 transition-all"
                            style={{ background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.25)", color: "var(--foreground)" }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(59,130,246,0.28)"; e.currentTarget.style.color = "var(--primary-blue)"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(59,130,246,0.15)"; e.currentTarget.style.color = "var(--foreground)"; }}
                          >
                            <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                            {(liveComments[o.id] || []).length}
                          </button>
                          {/* Share */}
                          <button
                            onClick={(e) => { e.stopPropagation(); setSharePost(o); }}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer border-0 transition-all"
                            style={{ background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.25)", color: "var(--foreground)" }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(59,130,246,0.28)"; e.currentTarget.style.color = "var(--primary-blue)"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(59,130,246,0.15)"; e.currentTarget.style.color = "var(--foreground)"; }}
                          >
                            <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                            Share
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* ════ RIGHT SIDEBAR ════ */}
        <div className="w-72 flex-shrink-0 flex flex-col gap-4 overflow-y-auto pb-4" style={{ minHeight: 0, scrollbarWidth: "thin", scrollbarColor: "var(--border-color) transparent" }}>

          {/* Highlighted card */}
          <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden flex-shrink-0">
            <div className="h-32 relative flex items-center justify-center overflow-hidden" style={{ background: "linear-gradient(135deg, var(--primary-blue), #60a5fa, #93c5fd)" }}>
              <div className="absolute w-28 h-28 rounded-full bg-white/5 -top-8 -right-6" />
              <div className="absolute w-20 h-20 rounded-full bg-white/8 -bottom-6 left-4" />
              <div className="flex items-end gap-1.5 z-10 mr-4">
                {[42, 56, 46, 38].map((h, i) => (<div key={i} className="w-4 rounded-t" style={{ height: h, background: "rgba(255,255,255,0.3)" }} />))}
              </div>
              <div className="z-10 text-3xl" style={{ filter: "drop-shadow(0 0 10px rgba(255,210,50,0.7))" }}>💡</div>
            </div>
            <div className="p-4">
              <div className="font-bold text-foreground text-sm mb-1.5">Built for Community Growth</div>
              <div className="text-xs text-muted-foreground leading-relaxed mb-3">Learn how we foster growth in the community.</div>
              <button onClick={() => setShowComingSoon(true)} className="px-4 py-2 rounded-lg text-white text-xs font-semibold border-0 cursor-pointer" style={{ background: "linear-gradient(135deg, var(--primary-blue), #2563eb)", boxShadow: "0 3px 10px rgba(37,99,235,0.3)" }}>Read More</button>
            </div>
          </div>

          {/* Community Stats */}
          <div className="rounded-2xl border border-border/40 bg-background/50 shadow-sm overflow-hidden flex-shrink-0">
            <div className="px-4 pt-3.5 pb-2 text-[10px] font-bold tracking-widest uppercase border-b border-border text-blue-500">Community Stats</div>
            <div className="grid grid-cols-2 gap-2.5 p-3">
              {COMMUNITY_STATS.map((s) => (
                <div key={s.label} className="rounded-xl p-3" style={{ background: s.green ? "rgba(34,197,94,0.15)" : "rgba(59,130,246,0.12)", border: s.green ? "1.5px solid rgba(34,197,94,0.3)" : "1.5px solid rgba(59,130,246,0.25)" }}>
                  <div className="text-xl font-extrabold leading-tight" style={{ color: s.green ? "#22c55e" : "var(--primary-blue)" }}>{s.value}</div>
                  <div className="text-[11px] text-muted-foreground font-medium mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Browse Categories */}
          <div className="rounded-2xl border border-border/40 bg-background/50 shadow-sm overflow-hidden flex-shrink-0">
            <div className="px-4 pt-3.5 pb-2 flex items-center justify-between border-b border-border">
              <span className="text-[10px] font-bold tracking-widest uppercase text-blue-500">Browse Categories</span>
              {activeCategories.length > 0 && (
                <button onClick={clearCategories}
                  className="text-[10px] font-semibold border-0 bg-transparent cursor-pointer px-2 py-0.5 rounded-full transition-colors"
                  style={{ color: "#9ca3af", background: "rgba(59,130,246,0.10)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "#e05555"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "#9ca3af"; }}>
                  Clear {activeCategories.length}
                </button>
              )}
            </div>
            <div className="py-1.5">
              {CATEGORIES.map((c) => {
                const isActive = activeCategories.includes(c.label);
                return (
                  <button key={c.label} onClick={() => handleCategory(c.label)}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 transition-all text-left border-0 cursor-pointer"
                    style={{ background: isActive ? `${c.color}18` : "transparent", borderLeft: isActive ? `3px solid ${c.color}` : "3px solid transparent", transition: "all 0.15s" }}
                    onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = "rgba(59,130,246,0.08)"; }}
                    onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
                  >
                    <span className="rounded-full flex-shrink-0" style={{ width: isActive ? 10 : 8, height: isActive ? 10 : 8, background: c.color, boxShadow: isActive ? `0 0 0 3px ${c.color}30` : "none", transition: "all 0.15s" }} />
                    <span className="flex-1 text-sm transition-colors" style={{ color: isActive ? c.color : "var(--foreground)", fontWeight: isActive ? 600 : 500, transition: "all 0.15s" }}>
                      {c.label}
                    </span>
                    <span className="text-[11px] font-bold text-white flex items-center justify-center flex-shrink-0"
                      style={{ background: c.color, minWidth: "32px", height: "22px", borderRadius: "11px", paddingInline: "7px", boxShadow: isActive ? `0 2px 6px ${c.color}55` : "none", opacity: isActive ? 1 : 0.65, transform: isActive ? "scale(1.05)" : "scale(1)", transition: "all 0.15s" }}>
                      {c.count}
                    </span>
                  </button>
                );
              })}
            </div>
            {activeCategories.length > 0 && (
              <div className="mx-3 mb-3 mt-0.5 px-3 py-2 rounded-xl text-[11px] font-medium" style={{ background: "rgba(59,130,246,0.10)", color: "var(--primary-blue)", border: "1px solid rgba(59,130,246,0.18)" }}>
                {activeCategories.length === 1 ? `Showing: ${activeCategories[0]}` : `Filtering by ${activeCategories.length} categories`}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* POST COMPOSER MODAL */}
      {showComposerModal && (
        <PostComposerModal onClose={() => setShowComposerModal(false)} onPublish={handlePublishPost} />
      )}

      {/* PUBLISH SUCCESS MODAL */}
      {showPublishSuccess && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setShowPublishSuccess(false)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div
              className="pointer-events-auto flex flex-col rounded-2xl shadow-2xl px-8 py-7"
              style={{ background: "var(--bg-card)", minWidth: 280, maxWidth: 340, border: "1.5px solid var(--border-color)", boxShadow: "0 24px 64px rgba(0,0,0,0.35)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-[18px] font-bold mb-1" style={{ color: "var(--text-primary)" }}>Post Published! 🎉</div>
              <div className="text-sm mb-5" style={{ color: "#6b7280" }}>Your blog post is now live on Discover.</div>
              <div className="flex justify-end">
                <button
                  onClick={() => setShowPublishSuccess(false)}
                  className="px-5 py-1.5 rounded-lg text-sm font-bold border-0 cursor-pointer"
                  style={{ background: "transparent", color: "var(--primary-blue)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(37,99,235,0.08)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                >
                  OKAY
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* PROFILES MODAL */}
      {showProfilesModal && (
        <ProfilesModal
          onClose={closeProfilesModal}
          filteredProfiles={filteredProfiles}
          drawerSearch={drawerSearch}
          setDrawerSearch={setDrawerSearch}
          expandedProfile={expandedProfile}
          setExpandedProfile={setExpandedProfile}
        />
      )}

      {/* COMMENTS MODAL */}
      {commentsPost && (
        <CommentsModal
          post={{ ...commentsPost, liveComments: liveComments[commentsPost.id] }}
          onClose={() => setCommentsPost(null)}
          onAddComment={(postId, text) => {
            handleAddComment(postId, text);
            setCommentsPost((prev) =>
              prev ? { ...prev, liveComments: [...liveComments[postId], { id: Date.now(), author: "You", avatar: "https://i.pravatar.cc/100?img=5", time: "Just now", text }] } : null
            );
          }}
        />
      )}

      {/* SHARE MODAL */}
      {sharePost && <ShareModal post={sharePost} onClose={() => setSharePost(null)} />}

      {/* COMING SOON MODAL */}
      {showComingSoon && (
        <>
          <div className="fixed inset-0 z-40 bg-black/50" onClick={() => setShowComingSoon(false)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div
              className="pointer-events-auto relative flex flex-col items-center justify-center rounded-3xl px-10 py-10 shadow-2xl"
              style={{
                background: "linear-gradient(135deg, rgba(30, 41, 59, 0.4) 0%, rgba(15, 23, 42, 0.2) 100%)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "1px solid var(--border-color)",
                minWidth: 280,
                maxWidth: 340,
                boxShadow: "0 8px 40px rgba(0,0,0,0.3)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <svg className="absolute right-5 bottom-5 opacity-10" width="90" height="90" viewBox="0 0 24 24" fill="none" stroke="var(--primary-blue)" strokeWidth="1.2">
                <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
              </svg>
              <div
                className="mb-5 flex items-center justify-center rounded-2xl"
                style={{ width: 64, height: 64, background: "rgba(59, 130, 246, 0.1)", border: "1px solid var(--border-color)", boxShadow: "0 2px 12px rgba(59, 130, 246, 0.15)" }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--primary-blue)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 22h14"/><path d="M5 2h14"/>
                  <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"/>
                  <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"/>
                </svg>
              </div>
              <div className="text-[22px] font-extrabold mb-1 tracking-tight text-center" style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}>Coming Soon!</div>
              <div className="flex items-center gap-2 mt-1">
                <div className="h-px w-8" style={{ background: "var(--border-color)" }} />
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase" style={{ color: "var(--primary-blue)" }}>Stay Tuned</span>
                <div className="h-px w-8" style={{ background: "var(--border-color)" }} />
              </div>
              <button
                onClick={() => setShowComingSoon(false)}
                className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full border-0 cursor-pointer"
                style={{ background: "var(--hover-bg)", color: "var(--text-secondary)" }}
              >
                <X size={13} />
              </button>
            </div>
          </div>
        </>
      )}
    </MainLayout>
  );
}