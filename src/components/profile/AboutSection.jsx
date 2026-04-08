import { Pencil } from "lucide-react";

function AboutSection({ bio, onEdit }) {
  return (
    <div className="bg-[var(--panel-accent-bg)] border border-border/40 rounded-2xl p-5 shadow-sm">

      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          About
        </h2>

        <button 
          onClick={onEdit} 
          className="p-1 hover:bg-muted rounded"
        >
          <Pencil size={16} className="text-muted-foreground" />
        </button>
      </div>

      <p className="text-foreground leading-relaxed">{bio}</p>
    </div>
  );
}

export default AboutSection;