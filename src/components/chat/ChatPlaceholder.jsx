import { GraduationCap } from 'lucide-react';
import '../../styles/chat/ChatPlaceholder.css';

const ChatPlaceholder = () => {
    return (
        <div className="chat-placeholder">
            <div className="placeholder-content">
                <div className="logo-large">
                    <GraduationCap size={64} color="white" />
                </div>
                <h1 className="app-title">V Connect</h1>
            </div>
        </div>
    );
};

export default ChatPlaceholder;
