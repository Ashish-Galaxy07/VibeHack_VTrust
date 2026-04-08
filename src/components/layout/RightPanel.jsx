import { HelpCircle, CheckCircle, ThumbsUp, TrendingUp, Monitor, Target, Trophy, Globe, Rocket, MessageCircle, Brain, GraduationCap, Bell } from "lucide-react";

const topics = [
  { label: "DSA", icon: Monitor },
  { label: "Placements", icon: Target },
  { label: "Sports", icon: Trophy },
  { label: "General", icon: Globe },
  { label: "Placement Season 2026", icon: Rocket },
  { label: "Java Mid-Sem Doubts", icon: MessageCircle },
  { label: "LeetCode Challenge", icon: Brain },
  { label: "GATE Preparation", icon: GraduationCap },
  { label: "Exam Alerts", icon: Bell },
];

const stats = [
  { label: "Questions Asked", icon: HelpCircle, value: 5 },
  { label: "Answers Given", icon: CheckCircle, value: 12 },
  { label: "Likes Received", icon: ThumbsUp, value: 34 },
];

export default function RightPanel({ selectedTopic, onTopicSelect }) {
  return (
    <div className="w-72 shrink-0 flex flex-col gap-4">

      {/* Card 1 - Your Stats */}
      <div className="bg-card border border-border rounded-2xl p-4">
        <div className="text-sm font-bold text-foreground mb-3">Your Stats</div>
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className={`flex justify-between items-center py-2 ${i !== stats.length - 1 ? "border-b border-border" : ""}`}
            >
              <div className="flex items-center gap-2">
                <Icon size={15} className="text-primary" />
                <span className="text-sm text-muted-foreground">{s.label}</span>
              </div>
              <span className="text-sm font-bold text-primary">{s.value}</span>
            </div>
          );
        })}
      </div>

      {/* Card 2 - Trending */}
      <div className="bg-card border border-border rounded-2xl p-4">
        <div className="text-sm font-bold text-foreground mb-3">Filters</div>
        {topics.map(t => {
          const Icon = t.icon;
          return (
            <div
              key={t.label}
              onClick={() => onTopicSelect(selectedTopic === t.label ? null : t.label)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer transition-all mb-1 ${
                selectedTopic === t.label
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-muted text-foreground"
              }`}
            >
              <Icon size={15} className={selectedTopic === t.label ? "text-primary" : "text-muted-foreground"} />
              <span className="text-sm font-medium">{t.label}</span>
            </div>
          );
        })}
      </div>

    </div>
  );
}