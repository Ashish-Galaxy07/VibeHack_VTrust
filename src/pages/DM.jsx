import { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import MessageList, { mockChats } from "../components/MessageList";
import ChatPlaceholder from "../components/ChatPlaceholder";
import ChatWindow from "../components/ChatWindow";
import DmUserProfile from "../components/chat/DmUserProfile";
import "../App.css";


function DM() {
  const [chats, setChats] = useState(mockChats);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  // Dynamic message history state
  const [messages, setMessages] = useState({
    1: [ // Sarah Miller
      { id: 1, text: "Hi there! Are we still on for the meeting tomorrow?", sender: 'them', time: '09:00 AM' },
      { id: 2, text: "Yes, definitely! 10 AM works for me.", sender: 'me', time: '09:05 AM' },
      { id: 3, text: "Perfect! Let's schedule a call for tomorrow.", sender: 'them', time: '09:06 AM' }
    ],
    2: [ // Marcus Chen
      { id: 1, text: "Hey there! I just finished the initial design concepts for the new mobile dashboard.", sender: 'them', time: '05:41 AM' },
      { id: 2, text: "That's awesome! Can't wait to see them. Are they uploaded to the shared folder yet?", sender: 'me', time: '05:45 AM' },
      { id: 3, text: "The new mockups are ready for review. I've sent you a link in your email as well.", sender: 'them', time: '10:02 AM' },
      { id: 4, type: 'file', fileName: 'Dashboard_v2_Final.fig', fileSize: '12.4 MB', sender: 'them', time: '10:02 AM' }
    ],
    3: [ // Emily Rodriguez
      { id: 1, text: "I've analyzed the crash logs you sent over.", sender: 'me', time: '1:30 PM' },
      { id: 2, text: "It seems to be a race condition in the auth module.", sender: 'me', time: '1:31 PM' },
      { id: 3, text: "Thanks! The bug fix works perfectly now.", sender: 'them', time: '3:45 PM' }
    ],
    4: [ // David Park
      { id: 1, text: "How is the new ad campaign performing?", sender: 'me', time: '11:20 AM' },
      { id: 2, text: "Campaign performance is looking great!", sender: 'them', time: '11:25 AM' },
      { id: 3, text: "CTR is up by 15% compared to last month.", sender: 'them', time: '11:26 AM' }
    ],
    5: [ // Lisa Thompson
      { id: 1, text: "Hi, do you have a minute to chat about the quarterly reviews?", sender: 'them', time: 'Yesterday' },
      { id: 2, text: "Sure, I'm free now.", sender: 'me', time: 'Yesterday' },
      { id: 3, text: "Your performance review is scheduled for Friday at 2 PM.", sender: 'them', time: 'Yesterday' }
    ],
    6: [ // James Wilson
      { id: 1, text: "Did we get the contract signed?", sender: 'me', time: 'Yesterday' },
      { id: 2, text: "Yes! We closed the deal with TechCorp!", sender: 'them', time: 'Yesterday' },
      { id: 3, text: "Great news! Great job team.", sender: 'me', time: 'Yesterday' }
    ]
  });


  const activeChat = chats.find(c => c.id === selectedChatId);

  const handleChatSelect = (id) => {
    if (selectedChatId === id) {
      setSelectedChatId(null);
    } else {
      setSelectedChatId(id);
      setShowProfile(false);
      // Mark as read when opened
      setChats(prev => prev.map(c => c.id === id ? { ...c, unread: false, unreadCount: 0, hasUnreadDot: false } : c));
    }
  };

  const handleMarkAllRead = () => {
    setChats(chats.map(chat => ({
      ...chat,
      unread: false,
      unreadCount: 0,
      hasUnreadDot: false
    })));
  };

  const handleMarkAsUnread = (chatId) => {
    setChats(chats.map(chat =>
      chat.id === chatId
        ? { ...chat, unread: true, hasUnreadDot: true }
        : chat
    ));
  };

  const handleDeleteChat = (chatId) => {
    setChats(chats.filter(chat => chat.id !== chatId));
    if (selectedChatId === chatId) {
      setSelectedChatId(null);
    }
  };

  const handleSendMessage = (chatId, text) => {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newMessage = {
      id: Date.now(),
      text,
      sender: 'me',
      time: timeString
    };

    setMessages(prev => ({
      ...prev,
      [chatId]: [...(prev[chatId] || []), newMessage]
    }));

    // Update last message in chat list
    setChats(prev => prev.map(chat =>
      chat.id === chatId
        ? { ...chat, lastMessage: text, time: 'Just now' }
        : chat
    ));
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [chatToDelete, setChatToDelete] = useState(null);

  const confirmDeleteGlobal = () => {
    if (chatToDelete) {
      handleDeleteChat(chatToDelete);
    }
    setShowDeleteModal(false);
    setChatToDelete(null);
  };

  const triggerDelete = (chatId) => {
    setChatToDelete(chatId);
    setShowDeleteModal(true);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setChatToDelete(null);
  };

  return (
    <MainLayout noPadding={true}>
      <div className="flex" style={{ height: '100%', width: '100%', display: 'flex', flex: 1, overflow: 'hidden', minHeight: 0 }}>
        <MessageList
          chats={chats}
          activeChatId={selectedChatId}
          onChatSelect={handleChatSelect}
          onMarkAllRead={handleMarkAllRead}
          onMarkAsUnread={handleMarkAsUnread}
          onDeleteChat={triggerDelete}
        />
        {selectedChatId && activeChat ? (
          showProfile ? (
            <DmUserProfile
              user={activeChat}
              onBack={() => setShowProfile(false)}
              onMessage={() => setShowProfile(false)}
            />
          ) : (
            <ChatWindow
              chat={activeChat}
              messages={messages[selectedChatId] || []}
              onBack={() => setSelectedChatId(null)}
              onDeleteChat={triggerDelete}
              onSendMessage={(text) => handleSendMessage(selectedChatId, text)}
              onProfileClick={() => setShowProfile(true)}
            />
          )
        ) : (
          <ChatPlaceholder />
        )}
      </div>

      {showDeleteModal && (
        <div className="delete-modal-overlay" onClick={cancelDelete}>
          <div className="delete-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Delete this chat?</h3>
            <p>This action cannot be undone.</p>
            <div className="delete-modal-actions">
              <button className="btn-modal btn-cancel" onClick={cancelDelete}>Cancel</button>
              <button className="btn-modal btn-delete" onClick={confirmDeleteGlobal}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}

export default DM;
