import { Home, MessageSquare, Compass, User, Moon, GraduationCap, Sun } from 'lucide-react';
import '../../styles/chat/Navigation.css';

const Navigation = ({ onResetView, isDarkMode, onToggleDarkMode }) => {
  return (
    <div className="navigation">
      <div className="nav-top">
        <div className="logo-container">
          <GraduationCap size={28} color="white" />
        </div>

        <div className="nav-items">
          <div className="nav-item">
            <Home size={24} color="#A0AEC0" />
          </div>
          <div className="nav-item active" onClick={onResetView}>
            <div className="active-indicator"></div>
            <MessageSquare size={24} color="#2B6CB0" />
            <div className="nav-badge"></div>
          </div>
          <div className="nav-item">
            <Compass size={24} color="#A0AEC0" />
          </div>
          <div className="nav-item">
            <User size={24} color="#A0AEC0" />
          </div>
        </div>
      </div>

      <div className="nav-bottom">
        <div className="nav-item" onClick={onToggleDarkMode} style={{ cursor: 'pointer' }}>
          <Moon size={24} color={isDarkMode ? "#3182CE" : "#A0AEC0"} />
        </div>
        <div className="user-avatar-small">
          <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" alt="User" />
          <div className="online-dot"></div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
