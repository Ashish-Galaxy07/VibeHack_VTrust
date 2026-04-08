import React, { useState } from 'react';
import { ArrowLeft, MessageSquare, Briefcase, Star, Image as ImageIcon, ChevronRight, GitMerge, FileText, Users, Film, Link } from 'lucide-react';
import '../../styles/chat/DmUserProfile.css';

const DmUserProfile = ({ user, onBack, onMessage }) => {
    const [sharedView, setSharedView] = useState(null); // null | 'media' | 'starred'
    const [mediaTab, setMediaTab] = useState('media');  // 'media' | 'docs' | 'links'

    const stats = user.stats || { contributions: 59, posts: 26, connections: 98 };

    /* ── Media/Docs/Links sub-view ── */
    if (sharedView === 'media') {
        return (
            <div className="dm-user-profile">
                <div className="dup-subview-header">
                    <button className="dup-back-btn-dark" onClick={() => setSharedView(null)}>
                        <ArrowLeft size={20} color="#64748B" />
                    </button>
                    <h3>Media, Links &amp; Docs</h3>
                </div>

                {/* Tabs */}
                <div className="dup-media-tabs">
                    <button
                        className={`dup-media-tab ${mediaTab === 'media' ? 'active' : ''}`}
                        onClick={() => setMediaTab('media')}
                    >
                        Media
                    </button>
                    <button
                        className={`dup-media-tab ${mediaTab === 'docs' ? 'active' : ''}`}
                        onClick={() => setMediaTab('docs')}
                    >
                        Docs
                    </button>
                    <button
                        className={`dup-media-tab ${mediaTab === 'links' ? 'active' : ''}`}
                        onClick={() => setMediaTab('links')}
                    >
                        Links
                    </button>
                </div>

                {/* Coming soon for all tabs */}
                <div className="dup-coming-soon">
                    <div className="dup-coming-soon-icon">
                        {mediaTab === 'media'  && <Film size={36} />}
                        {mediaTab === 'docs'   && <FileText size={36} />}
                        {mediaTab === 'links'  && <Link size={36} />}
                    </div>
                    <p>Coming soon</p>
                </div>
            </div>
        );
    }

    /* ── Starred Messages sub-view ── */
    if (sharedView === 'starred') {
        return (
            <div className="dm-user-profile">
                <div className="dup-subview-header">
                    <button className="dup-back-btn-dark" onClick={() => setSharedView(null)}>
                        <ArrowLeft size={20} color="#64748B" />
                    </button>
                    <h3>Starred Messages</h3>
                </div>
                <div className="dup-coming-soon">
                    <div className="dup-coming-soon-icon"><Star size={36} /></div>
                    <p>Coming soon</p>
                </div>
            </div>
        );
    }

    /* ── Main profile view ── */
    return (
        <div className="dm-user-profile">
            {/* Blue header — scrolls with content */}
            <div className="dup-header-bg">
                <button className="dup-back-btn" onClick={onBack}>
                    <ArrowLeft size={22} color="#ffffff" />
                </button>
            </div>

            <div className="dup-scroll-content">
                {/* Avatar overlapping header */}
                <div className="dup-avatar-wrap">
                    <img
                        src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=3182CE&color=fff`}
                        alt={user.name}
                    />
                </div>

                {/* Identity */}
                <div className="dup-card dup-identity">
                    <h2>{user.name}</h2>
                    <div className="dup-batch-badge">🎓 Batch {user.batch || '2025'}</div>
                    <div className="dup-btn-row">
                        <button className="dup-btn-primary" onClick={onMessage}>
                            <MessageSquare size={17} /><span>Message</span>
                        </button>
                        <button className="dup-btn-secondary">
                            <Briefcase size={17} /><span>Portfolio</span>
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="dup-card dup-stats">
                    <div className="dup-stat">
                        <div className="dup-stat-icon purple"><GitMerge size={18} /></div>
                        <h3>{stats.contributions}</h3><p>CONTRIBUTIONS</p>
                    </div>
                    <div className="dup-divider" />
                    <div className="dup-stat">
                        <div className="dup-stat-icon blue"><FileText size={18} /></div>
                        <h3>{stats.posts}</h3><p>POSTS</p>
                    </div>
                    <div className="dup-divider" />
                    <div className="dup-stat">
                        <div className="dup-stat-icon green"><Users size={18} /></div>
                        <h3>{stats.connections}</h3><p>CONNECTIONS</p>
                    </div>
                </div>

                {/* About */}
                {user.about && (
                    <div className="dup-card dup-about">
                        <h4 className="dup-section-title">ABOUT</h4>
                        <p>{user.about}</p>
                    </div>
                )}

                {/* Shared Content */}
                <div className="dup-card dup-shared">
                    <h4 className="dup-section-title">SHARED CONTENT</h4>
                    <button className="dup-shared-item" onClick={() => { setSharedView('media'); setMediaTab('media'); }}>
                        <div className="dup-shared-icon indigo"><ImageIcon size={20} /></div>
                        <div className="dup-shared-info">
                            <span>Media, Links &amp; Docs</span>
                            <small>12 items shared</small>
                        </div>
                        <ChevronRight size={18} color="#CBD5E1" />
                    </button>
                    <button className="dup-shared-item" onClick={() => setSharedView('starred')}>
                        <div className="dup-shared-icon amber"><Star size={20} /></div>
                        <div className="dup-shared-info">
                            <span>Starred Messages</span>
                            <small>3 starred</small>
                        </div>
                        <ChevronRight size={18} color="#CBD5E1" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DmUserProfile;
