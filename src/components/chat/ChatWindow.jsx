import { Phone, Video, MoreVertical, ArrowLeft, Info, Plus, Send, File, Image as ImageIcon, Camera, FileText, X, Trash2 } from 'lucide-react';
import '../../styles/chat/ChatWindow.css';
import { useNavigate } from 'react-router-dom';

const ChatWindow = ({
    chat,
    messages,
    onBack,
    onDeleteChat,
    onSendMessage,
    showInfo,
    setShowInfo,
    showMediaGallery,
    setShowMediaGallery,
    showAttachments,
    setShowAttachments,
    onProfileClick
}) => {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [mediaTab, setMediaTab] = useState('media'); // 'media', 'docs', 'links'
    const inputAreaRef = useRef(null);
    const sidebarRef = useRef(null); // Ref for sidebar to detect clicks outside
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const currentMessages = messages || [];

    const handleSend = (e) => {
        e.preventDefault();
        if (!message.trim()) return;
        onSendMessage(message);
        setMessage('');
        setShowAttachments(false);
    };

    const handleBack = () => {
        onBack();
    };

    // Close menus when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Close attachment menu via history
            if (showAttachments && inputAreaRef.current && !inputAreaRef.current.contains(event.target)) {
                window.history.back();
            }

            // Close sidebar if clicking in main area (and sidebar is open)
            if (showInfo && sidebarRef.current && !sidebarRef.current.contains(event.target) && !event.target.closest('.header-icon')) {
                if (event.target.closest('.chat-main-area')) {
                    window.history.back();
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showAttachments, showInfo]);


    return (
        <div className={`chat-window ${showInfo ? 'show-info' : ''}`}>
            {/* Main Chat Area */}
            <div className="chat-main-area">
                <div className="chat-header">
                    <div className="header-left">
                        <button className="back-button" onClick={handleBack}>
                            <ArrowLeft size={20} color="#718096" />
                        </button>
                        <div className="header-user-info" onClick={() => onProfileClick && onProfileClick()} style={{ cursor: 'pointer' }}>
                            <div className="header-avatar-container">
                                <img src={chat.avatar} alt={chat.name} className="header-avatar" />
                            </div>
                            <h3 className="header-name">{chat.name}</h3>
                        </div>
                    </div>
                    <div className="header-actions">
                        <Info
                            size={20}
                            color={showInfo ? "#3182CE" : "#A0AEC0"}
                            className="header-icon"
                            onClick={() => setShowInfo(!showInfo)}
                        />
                    </div>
                </div>

                <div className="chat-content">
                    {/* ... (Existing Message content) ... */}
                    <div className="date-separator">
                        <span>TODAY, OCT 12</span>
                    </div>

                    {currentMessages.map((msg) => (
                        <div key={msg.id} className={`message-row ${msg.sender === 'me' ? 'sent' : 'received'}`}>
                            {msg.sender === 'them' && (
                                <img src={chat.avatar} alt={chat.name} className="message-avatar" />
                            )}

                            <div className="message-bubble-container">
                                {msg.type === 'file' ? (
                                    <div className="file-attachment">
                                        <div className="file-icon-wrapper">
                                            <File size={24} color="#4299E1" />
                                        </div>
                                        <div className="file-info">
                                            <span className="file-name">{msg.fileName}</span>
                                            <span className="file-size">{msg.fileSize}</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="message-bubble">
                                        {msg.text}
                                    </div>
                                )}
                                <span className="message-time">{msg.time}</span>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                <div className="chat-input-area" ref={inputAreaRef}>
                    {/* ... (Existing Input logic) ... */}
                    <div className="attachment-wrapper">
                        <button
                            className={`input-action-btn ${showAttachments ? 'active' : ''}`}
                            onClick={() => setShowAttachments(!showAttachments)}
                        >
                            <Plus size={24} color={showAttachments ? "#3182CE" : "#A0AEC0"} style={{ transition: 'transform 0.2s', transform: showAttachments ? 'rotate(45deg)' : 'none' }} />
                        </button>

                        {showAttachments && (
                            <div className="attachment-menu">
                                <button className="attachment-option">
                                    <ImageIcon size={20} color="#4299E1" />
                                    <span>Photo & Video Library</span>
                                </button>
                                <button className="attachment-option">
                                    <Camera size={20} color="#4299E1" />
                                    <span>Camera</span>
                                </button>
                                <button className="attachment-option">
                                    <FileText size={20} color="#4299E1" />
                                    <span>Document</span>
                                </button>
                            </div>
                        )}
                    </div>

                    <form className="input-form" onSubmit={handleSend}>
                        <div className="input-container">
                            <input
                                type="text"
                                placeholder="Type a message..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="chat-text-input"
                            />
                        </div>
                        <button type="submit" className="send-button">
                            <Send size={18} color="white" />
                        </button>
                    </form>
                </div>
            </div>

            {/* Contact Info Sidebar */}
            {showInfo && (
                <div className="contact-info-sidebar" ref={sidebarRef}>
                    {showMediaGallery ? (
                        /* Media Gallery View */
                        <div className="media-gallery-view">
                            <div className="contact-info-header">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <button className="back-button" onClick={() => window.history.back()}>
                                        <ArrowLeft size={20} color="#718096" />
                                    </button>
                                    <h3>Media, Docs and Links</h3>
                                </div>
                            </div>

                            <div className="media-tabs">
                                <button className={`media-tab ${mediaTab === 'media' ? 'active' : ''}`} onClick={() => setMediaTab('media')}>Media</button>
                                <button className={`media-tab ${mediaTab === 'docs' ? 'active' : ''}`} onClick={() => setMediaTab('docs')}>Docs</button>
                                <button className={`media-tab ${mediaTab === 'links' ? 'active' : ''}`} onClick={() => setMediaTab('links')}>Links</button>
                            </div>

                            <div className="media-grid-content">
                                {mediaTab === 'media' && <div className="empty-state">Coming soon</div>}
                                {mediaTab === 'docs' && <div className="empty-state">Coming soon</div>}
                                {mediaTab === 'links' && <div className="empty-state">Coming soon</div>}
                            </div>
                        </div>
                    ) : (
                        /* Standard Profile View */
                        <>
                            <div className="contact-info-header">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <button className="back-button" onClick={() => window.history.back()}>
                                        <ArrowLeft size={20} color="#718096" />
                                    </button>
                                    <h3>Contact Info</h3>
                                </div>
                            </div>

                            <div className="contact-profile-section">
                                <img src={chat.avatar} alt={chat.name} className="contact-avatar-large" />
                                <h2 className="contact-name-large">{chat.name}</h2>
                            </div>

                            <div className="contact-details-section">
                                <div className="info-group">
                                    <label>ABOUT</label>
                                    <p>Designing delightful experiences. Coffee enthusiast ☕</p>
                                </div>

                                <div className="info-group">
                                    <div className="media-header">
                                        <label>MEDIA, LINKS, AND DOCS</label>
                                        <button className="see-all-btn" onClick={() => { setShowMediaGallery(true); setMediaTab('media'); }}>See all</button>
                                    </div>
                                    <div className="empty-state" style={{ marginTop: '12px' }}>Coming soon</div>
                                </div>

                                <div className="contact-actions-inline">
                                    <button className="delete-chat-btn" onClick={() => onDeleteChat(chat.id)}>
                                        <Trash2 size={18} />
                                        <span>Delete Chat</span>
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default ChatWindow;
