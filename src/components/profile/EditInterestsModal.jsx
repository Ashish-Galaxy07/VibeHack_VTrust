import { useState } from 'react';
import Modal from './Modal';

function EditInterestsModal({ isOpen, onClose, editForm, setEditForm, onSave }) {
  const [newInterest, setNewInterest] = useState('');

  const handleAddInterest = () => {
    if (newInterest.trim()) {
      setEditForm({ ...editForm, interests: [...editForm.interests, { name: newInterest.trim() }] });
      setNewInterest('');
    }
  };

  const handleRemoveInterest = (index) => {
    setEditForm({ ...editForm, interests: editForm.interests.filter((_, i) => i !== index) });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Interests">
      <div className="space-y-5">
        <div className="flex flex-wrap gap-2">
          {editForm.interests.map((interest, index) => (
            <span key={index} className="group inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-muted border border-border text-foreground/80 hover:border-primary transition-all">
              {interest.name}
              <button 
                onClick={() => handleRemoveInterest(index)} 
                className="ml-2 w-4 h-4 rounded-full flex items-center justify-center bg-foreground/10 hover:bg-red-500 hover:text-white transition-all"
              >
                <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add new interest"
            value={newInterest}
            onChange={(e) => setNewInterest(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddInterest()}
            className="flex-1 p-3 bg-muted/50 border border-border rounded-xl text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-sm"
          />
          <button 
            onClick={handleAddInterest} 
            disabled={!newInterest.trim()} 
            className="w-12 h-12 flex items-center justify-center bg-primary text-white rounded-xl hover:opacity-90 disabled:opacity-50 transition-all shadow-lg shadow-primary/20 active:scale-[0.98]"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
        <div className="flex gap-3 pt-4">
          <button onClick={onClose} className="flex-1 px-4 py-2.5 border border-border rounded-xl hover:bg-muted text-foreground font-semibold transition-colors">
            Cancel
          </button>
          <button onClick={onSave} className="flex-1 px-4 py-2.5 bg-primary text-white rounded-xl hover:opacity-90 font-bold shadow-lg shadow-primary/20 transition-all active:scale-[0.98]">
            Save Changes
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default EditInterestsModal; 