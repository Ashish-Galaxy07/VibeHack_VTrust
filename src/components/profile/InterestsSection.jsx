import { Pencil } from "lucide-react";
function InterestsSection({ interests, onRemove ,onEdit}) {
  return (
    <div className="bg-[var(--panel-accent-bg)] border border-border/40 rounded-2xl p-5 shadow-sm">
      <div className="flex justify-between items-center mb-3">
  <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
    Interests
  </h2>

  <button onClick={onEdit} className="p-1 rounded-md hover:bg-muted hover:scale-110 transition">
    <Pencil size={16} className="text-muted-foreground" />
  </button>
</div>
      <div className="flex flex-wrap gap-2">
        {interests.map((interest, index) => (
          <span key={index} className="group cursor-pointer hover:opacity-80 transition-opacity inline-flex items-center px-3 py-1 rounded-full text-sm bg-secondary text-foreground">
            {interest.name}
            <button onClick={() => onRemove(index)} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}

export default InterestsSection;