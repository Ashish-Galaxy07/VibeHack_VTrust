import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import QuestionDetail from "../pages/QuestionDetail";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Discover from "../pages/Discover";
import DM from "../pages/DM";
import Profile from "../pages/Profile";

export default function AppRoutes() {
  const isAuthed = () => localStorage.getItem("vconnect-auth") === "true";
  const ProtectedRoute = ({ children }) => (isAuthed() ? children : <Navigate to="/login" replace />);
  const PublicRoute = ({ children }) => (isAuthed() ? <Navigate to="/" replace /> : children);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/discover" element={<ProtectedRoute><Discover /></ProtectedRoute>} />
        <Route path="/dm" element={<ProtectedRoute><DM /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/question/:id" element={<ProtectedRoute><QuestionDetail /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to={isAuthed() ? "/" : "/login"} replace />} />
      </Routes>
    </BrowserRouter>
  );
}
