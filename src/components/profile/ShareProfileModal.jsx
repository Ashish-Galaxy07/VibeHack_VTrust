import Modal from './Modal';

function ShareProfileModal({ isOpen, onClose }) {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied!');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Share Profile">
      <div className="space-y-6">
        <p className="text-foreground/80 font-medium">Share your profile with others:</p>
        <div className="p-4 bg-muted border border-border rounded-xl shadow-inner">
          <code className="text-sm text-foreground/90 font-mono break-all leading-relaxed">{window.location.href}</code>
        </div>
        <button 
          onClick={handleCopyLink}
          className="w-full px-4 py-3 bg-primary text-white rounded-xl hover:opacity-90 font-bold shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
        >
          Copy Link
        </button>
      </div>
    </Modal>
  );
}

export default ShareProfileModal;