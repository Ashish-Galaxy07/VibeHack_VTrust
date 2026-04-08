import { useState } from 'react';
import { Search, MoreHorizontal, PlusCircle, CheckCheck, Mail, Trash2 } from 'lucide-react';
import './MessageList.css';

// Keep export for initial state in App.jsx
export const mockChats = [
    // ... existing items ...
    {
        id: 1,
        name: 'Sarah Miller',
        role: 'Product Manager',
        lastMessage: 'Perfect! Let\'s schedule a call for tomorrow',
        time: '2m ago',
        unread: false,
        hasUnreadDot: true,
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
        active: true
    },
    {
        id: 2,
        name: 'Marcus Chen',
        role: 'UX Designer',
        lastMessage: 'The new mockups are ready for review',
        time: '1h ago',
        unread: true,
        unreadCount: 1,
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
        active: false
    },
    {
        id: 3,
        name: 'Emily Rodriguez',
        role: 'Software Engineer',
        lastMessage: 'Thanks! The bug fix works perfectly now',
        time: '3h ago',
        unread: false,
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
        active: false
    },
    {
        id: 4,
        name: 'David Park',
        role: 'Marketing Lead',
        lastMessage: 'Campaign performance is looking great!',
        time: '5h ago',
        unread: true,
        unreadCount: 1,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
        active: false
    },
    {
        id: 5,
        name: 'Lisa Thompson',
        role: 'HR Manager',
        lastMessage: 'Your performance review is scheduled',
        time: 'Yesterday',
        unread: true,
        unreadCount: 2,
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
        active: false
    },
    {
        id: 6,
        name: 'James Wilson',
        role: 'Sales Director',
        lastMessage: 'We closed the deal with TechCorp!',
        time: 'Yesterday',
        unread: false,
        avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop',
        active: false
    }
];

const MessageList = ({ chats, activeChatId, onChatSelect, onMarkAllRead, onMarkAsUnread, onDeleteChat }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showMenu, setShowMenu] = useState(false);

    // Context Menu State
    const [contextMenu, setContextMenu] = useState(null); // { x, y, chatId }

    // Filter chats passed via props
    const filteredChats = chats.filter(chat =>
        chat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const unreadTotal = chats.filter(c => c.unread).length;

    // Close all menus helper
    const closeMenus = () => {
        setShowMenu(false);
        setContextMenu(null);
    };

    const handleContextMenu = (e, chatId) => {
        e.preventDefault();
        setContextMenu({
            x: e.clientX,
            y: e.clientY,
            chatId
        });
        setShowMenu(false);
    };

    const handleMenuOptionClick = (action) => {
        if (action === 'markAllRead') {
            onMarkAllRead();
        }
        closeMenus();
    };

    const handleContextOptionClick = (action) => {
        if (contextMenu) {
            if (action === 'unread') {
                onMarkAsUnread(contextMenu.chatId);
            } else if (action === 'delete') {
                onDeleteChat(contextMenu.chatId);
            }
            closeMenus();
        }
    };

    return (
        <div className="message-list-container">
            {/* Transparent Overlay to block clicks and close menus */}
            {(showMenu || contextMenu) && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        zIndex: 998, // Below menu (1000) but above everything else
                        cursor: 'default'
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                        closeMenus();
                    }}
                    onContextMenu={(e) => {
                        e.preventDefault();
                        closeMenus();
                    }}
                />
            )}

            <div className="message-header">
                <div className="header-top">
                    <h2 className="header-title">MESSAGES</h2>
                    <div className="unread-badge">{unreadTotal.toString().padStart(2, '0')} Unread</div>
                </div>

                <div className="search-container">
                    <Search size={18} color="#A0AEC0" className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search chats..."
                        className="search-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="recent-chats-header">
                <span>RECENT CHATS</span>
                <div className="menu-trigger" onClick={() => setShowMenu(!showMenu)} style={{ zIndex: showMenu ? 1001 : 'auto', position: 'relative' }}>
                    <MoreHorizontal size={16} color="#A0AEC0" style={{ cursor: 'pointer' }} />
                    {showMenu && (
                        <div className="dropdown-menu">
                            <div className="dropdown-item">
                                <PlusCircle size={16} color="#4299E1" />
                                <span>New Chat</span>
                            </div>
                            <div className="dropdown-item" onClick={() => handleMenuOptionClick('markAllRead')}>
                                <CheckCheck size={16} color="#4299E1" />
                                <span>Mark All as Read</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="chat-list">
                {filteredChats.map((chat) => (
                    <div
                        key={chat.id}
                        className={`chat-item ${activeChatId === chat.id ? 'active' : ''}`}
                        onClick={() => onChatSelect(chat.id)}
                        onContextMenu={(e) => handleContextMenu(e, chat.id)}
                    >
                        <div className="chat-avatar-container">
                            <img src={chat.avatar} alt={chat.name} className="chat-avatar" />
                        </div>

                        <div className="chat-info">
                            <div className="chat-top">
                                <span className="chat-name">{chat.name}</span>
                                <span className="chat-time">{chat.time}</span>
                            </div>
                            <div className="chat-message-preview">{chat.lastMessage}</div>
                        </div>

                        {(chat.hasUnreadDot || chat.unreadCount > 0) && (
                            <div className="chat-unread">
                                {chat.hasUnreadDot && <div className="unread-dot-indicator"></div>}
                                {chat.unreadCount > 0 && (
                                    <div className="unread-count-badge">{chat.unreadCount}</div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Context Menu Portal/Overlay */}
            {contextMenu && (
                <div
                    className="context-menu"
                    style={{ top: contextMenu.y, left: contextMenu.x }}
                >
                    <div className="context-item" onClick={() => handleContextOptionClick('unread')}>
                        <Mail size={16} color="#4299E1" />
                        <span>Mark as Unread</span>
                    </div>
                    <div className="context-item delete" onClick={() => handleContextOptionClick('delete')}>
                        <Trash2 size={16} color="#E53E3E" />
                        <span>Delete Chat</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MessageList;
