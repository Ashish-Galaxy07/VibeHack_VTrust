import { Link } from 'react-router-dom';
import { Home, MessageSquare, Compass, User, Moon, GraduationCap } from 'lucide-react';
import './Navigation.css';

const Navigation = ({ onResetView, isDarkMode, onToggleDarkMode }) => {
  return (
    <div className="navigation">
      <div className="nav-top">
        <div className="logo-container">
          <GraduationCap size={28} color="white" />
        </div>

        <div className="nav-items">
          <Link to="/" className="nav-item">
            <Home size={24} color="#A0AEC0" />
          </Link>
          <Link to="/dm" className="nav-item active" onClick={onResetView}>
            <div className="active-indicator"></div>
            <MessageSquare size={24} color="#2B6CB0" />
            <div className="nav-badge"></div>
          </Link>
          <Link to="/discover" className="nav-item">
            <Compass size={24} color="#A0AEC0" />
          </Link>
          <Link to="/profile" className="nav-item">
            <User size={24} color="#A0AEC0" />
          </Link>
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
