
function SocialLinksSection({ links, onAddClick, onRemove}) {
  return (
    <div className="bg-[var(--panel-accent-bg)] border border-border/40 rounded-2xl p-5 shadow-sm">
      <div className="flex justify-between items-center mb-3">
  <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
    Social Links
  </h2>

  
</div>
      <div className="space-y-2">
        {links.map((link, index) => (
          <div key={index} className="group flex items-center justify-between p-2 rounded-lg hover:bg-secondary/50 transition-colors">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              <span className="text-sm text-foreground">{link.label}</span>
            </div>
            <button onClick={() => onRemove(index)} className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        ))}
        <button onClick={onAddClick} className="w-full p-2 border-2 border-dashed border-border rounded-lg text-muted-foreground hover:text-foreground hover:border-primary transition-colors">
          <svg className="w-4 h-4 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Link
        </button>
      </div>
    </div>
  );
}

export default SocialLinksSection;