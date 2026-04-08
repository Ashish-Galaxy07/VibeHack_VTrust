import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? "active" : "";

  return (
    <div className="sidebar">
      <div>
        <div className="logo">VTrust</div>
        

        <div className="welcome">Hi Alex Johnson</div>
        <div className="messages">05 Unread Messages</div>

        <Link className={`nav-item ${isActive("/")}`} to="/">Home</Link>
        <Link className={`nav-item ${isActive("/dm")}`} to="/dm">DMs</Link>
        <Link className={`nav-item ${isActive("/discover")}`} to="/discover">Discover</Link>
        <Link className={`nav-item ${isActive("/profile")}`} to="/profile">Profile</Link>
      </div>

      <div className="profile">
        <img src="https://i.pravatar.cc/100" />
        <div>
          <strong>Alex Johnson</strong><br />
          <span style={{ fontSize: "13px", color: "#777" }}>Student</span>
        </div>
      </div>
    </div>
  );
}
