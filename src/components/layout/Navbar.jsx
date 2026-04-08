import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, MessageSquare, CheckCheck, X, ChevronDown } from 'lucide-react';

const notifications = [
  { id: 1, text: "Alex Johnson answered your question on DSA.", time: "2m ago", read: false },
  { id: 2, text: "Sarah Williams liked your comment.", time: "15m ago", read: false },
  { id: 3, text: "New question posted in Placements.", time: "1h ago", read: true },
  { id: 4, text: "Mark T. replied to your comment.", time: "3h ago", read: true },
  { id: 5, text: "LeetCode Challenge has a new post.", time: "5h ago", read: true },
];

const categories = [
  "DSA", "Placements", "Sports", "General",
  "Placement Season 2026", "Java Mid-Sem Doubts",
  "LeetCode Challenge", "GATE Preparation", "Exam Alerts"
];

function Navbar() {
  const [search, setSearch] = useState("");
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifs, setNotifs] = useState(notifications);
  const [askOpen, setAskOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const dropdownRef = useRef(null);

  const unreadCount = notifs.filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const markAllRead = () => setNotifs(prev => prev.map(n => ({ ...n, read: true })));

  const handlePost = () => {
    if (!question.trim()) return;
    setQuestion("");
    setSelectedCategory("");
    setAskOpen(false);
  };

  return (
    <>
      <header className="bg-card border-b border-border px-6 py-2 sticky top-0 z-10" style={{ paddingLeft: "96px" }}>
        <div className="flex items-center gap-6">

          {/* Search Bar with logo */}
          <div className="flex-1 max-w-2xl">
            <div className="flex items-center gap-3 bg-background border border-border rounded-full px-4 py-2 hover:border-primary transition focus-within:border-primary">
              <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
              </div>
              <Search size={16} className="text-muted-foreground shrink-0" />
              <input
                className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
                placeholder="Find anything"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-5 shrink-0 ml-8">

            {/* Ask Button */}
            <button
              onClick={() => setAskOpen(true)}
              className="flex items-center gap-2 border border-border rounded-full px-5 py-1.5 text-sm font-semibold text-foreground hover:bg-muted transition"
            >
              <MessageSquare size={15} className="text-primary" />
              Ask
            </button>

            {/* Notification Bell */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setNotifOpen(prev => !prev)}
                className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-muted transition"
              >
                <Bell size={18} className="text-foreground" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-primary rounded-full text-primary-foreground text-[10px] flex items-center justify-center font-bold">
                    {unreadCount}
                  </span>
                )}
              </button>

              {notifOpen && (
                <div className="absolute right-0 top-12 w-80 bg-card border border-border rounded-2xl shadow-lg z-50 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                    <span className="font-bold text-sm text-foreground">Notifications</span>
                    <button onClick={markAllRead} className="flex items-center gap-1 text-xs text-primary hover:opacity-80 transition">
                      <CheckCheck size={13} /> Mark all read
                    </button>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifs.map(n => (
                      <div key={n.id} className={`flex items-start gap-3 px-4 py-3 border-b border-border last:border-0 ${!n.read ? "bg-primary/5" : ""}`}>
                        <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${!n.read ? "bg-primary" : "bg-transparent"}`} />
                        <div className="flex-1">
                          <p className="text-sm text-foreground">{n.text}</p>
                          <span className="text-xs text-muted-foreground">{n.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>



          </div>
        </div>
      </header>

      {/* Ask Modal */}
      {askOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={(e) => e.target === e.currentTarget && setAskOpen(false)}
        >
          <div className="bg-card border border-border rounded-2xl w-full max-w-lg mx-4 overflow-hidden shadow-xl">

            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <span className="font-bold text-foreground">Ask a Question</span>
              <button onClick={() => setAskOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted transition">
                <X size={16} className="text-muted-foreground" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4">

              {/* Question Input */}
              <textarea
                className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none resize-none focus:border-primary transition"
                placeholder="What do you want to ask?"
                rows={4}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />

              {/* Category Selector */}
              <div className="relative">
                <select
                  className="w-full appearance-none bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary transition cursor-pointer"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">Select a category</option>
                  {categories.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-3 top-3 text-muted-foreground pointer-events-none" />
              </div>

            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-border">
              <button
                onClick={() => setAskOpen(false)}
                className="px-4 py-2 rounded-full text-sm font-medium text-foreground hover:bg-muted transition"
              >
                Cancel
              </button>
              <button
                onClick={handlePost}
                disabled={!question.trim() || !selectedCategory}
                className="px-5 py-2 rounded-full text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Post Question
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;