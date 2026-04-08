import React from 'react';
import { ArrowLeft, MessageSquare, Briefcase, User, Star, Image as ImageIcon, ChevronRight, GitMerge, FileText, Users } from 'lucide-react';
import '../../styles/chat/ChatProfilePopup.css';

const ChatProfilePopup = ({ user, onClose }) => {
    // Determine user stats (mocked if not available)
    const stats = user.stats || {
        contributions: 59,
        posts: 26,
        connections: 98
    };

    return (
        <div className="chat-profile-popup-overlay">
            <div className="popup-header-bg">
                <button className="popup-back-btn" onClick={onClose}>
                    <ArrowLeft size={24} color="#ffffff" />
                </button>
            </div>
            
            <div className="popup-content">
                <div className="popup-image-container">
                    <img src={user.avatar || "https://ui-avatars.com/api/?name=User"} alt={user.name} />
                </div>
                
                <div className="popup-card identity-card">
                    <h2 className="identity-name">{user.name}</h2>
                    <p className="identity-bio">{user.bio || 'Coffee addict'}</p>
                    
                    <div className="batch-badge">
                        🎓 Batch {user.batch || '2025'}
                    </div>
                    
                    <div className="action-buttons-row">
                        <button className="popup-primary-btn" onClick={onClose}>
                            <MessageSquare size={18} />
                            <span>Message</span>
                        </button>
                        <button className="popup-secondary-btn">
                            <Briefcase size={18} />
                            <span>Portfolio</span>
                        </button>
                    </div>
                    
                    <button className="popup-outline-btn">
                        <User size={18} />
                        <span>View Full Profile</span>
                    </button>
                </div>
                
                <div className="popup-card stats-card">
                    <div className="stat-item">
                        <div className="stat-icon purple">
                            <GitMerge size={20} />
                        </div>
                        <h3>{stats.contributions}</h3>
                        <p>CONTRIBUTIONS</p>
                    </div>
                    <div className="stat-item">
                        <div className="stat-icon blue">
                            <FileText size={20} />
                        </div>
                        <h3>{stats.posts}</h3>
                        <p>POSTS</p>
                    </div>
                    <div className="stat-item">
                        <div className="stat-icon green">
                            <Users size={20} />
                        </div>
                        <h3>{stats.connections}</h3>
                        <p>CONNECTIONS</p>
                    </div>
                </div>
                
                <div className="popup-card about-card">
                    <h3 className="section-title">ABOUT</h3>
                    <p>{user.about || user.bio || 'Coffee addict'}</p>
                </div>
                
                <div className="popup-card shared-content-card">
                    <h3 className="section-title">SHARED CONTENT</h3>
                    <div className="shared-item">
                        <div className="shared-icon-bg blue-light">
                            <ImageIcon size={20} color="#5C67F2" />
                        </div>
                        <div className="shared-info">
                            <h4>Media, Links & Docs</h4>
                            <p>12 items shared</p>
                        </div>
                        <ChevronRight size={20} color="#CBD5E1" />
                    </div>
                    <div className="shared-item">
                        <div className="shared-icon-bg yellow-light">
                            <Star size={20} color="#F59E0B" />
                        </div>
                        <div className="shared-info">
                            <h4>Starred Messages</h4>
                            <p>3 starred</p>
                        </div>
                        <ChevronRight size={20} color="#CBD5E1" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatProfilePopup;
