function ActivitySection({ stats }) {
  if (!stats || !Array.isArray(stats)) return null;
  
  return (
    <div className="bg-[var(--panel-accent-bg)] border border-border/40 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Activity</h2>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat, index) => (
          <div key={index} className="bg-secondary/50 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-primary">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wide">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ActivitySection;