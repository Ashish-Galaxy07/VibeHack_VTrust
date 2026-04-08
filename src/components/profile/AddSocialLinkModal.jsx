import { useState } from 'react';
import Modal from './Modal';

function AddSocialLinkModal({ isOpen, onClose, onAdd }) {
  const [socialForm, setSocialForm] = useState({ 
    type: 'website', 
    url: '', 
    label: '' 
  });

  const handleAdd = () => {
    onAdd(socialForm);
    setSocialForm({ type: 'website', url: '', label: '' });
  };

  const handleClose = () => {
    setSocialForm({ type: 'website', url: '', label: '' });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add Social Link">
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold mb-2 text-foreground/70 tracking-wide">Type</label>
          <select
            value={socialForm.type}
            onChange={(e) => setSocialForm({...socialForm, type: e.target.value})}
            className="w-full p-3 bg-muted/50 border border-border rounded-xl text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none appearance-none cursor-pointer"
          >
            <option value="website">Website</option>
            <option value="github">GitHub</option>
            <option value="linkedin">LinkedIn</option>
            <option value="instagram">Instagram</option>
            <option value="telegram">Telegram</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2 text-foreground/70 tracking-wide">URL</label>
          <input
            type="url"
            placeholder="https://..."
            value={socialForm.url}
            onChange={(e) => setSocialForm({...socialForm, url: e.target.value})}
            className="w-full p-3 bg-muted/50 border border-border rounded-xl text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2 text-foreground/70 tracking-wide">Display Label</label>
          <input
            type="text"
            placeholder="e.g., My Portfolio"
            value={socialForm.label}
            onChange={(e) => setSocialForm({...socialForm, label: e.target.value})}
            className="w-full p-3 bg-muted/50 border border-border rounded-xl text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-sm"
          />
        </div>
        <div className="flex gap-3 pt-4">
          <button 
            onClick={handleClose} 
            className="flex-1 px-4 py-2.5 border border-border rounded-xl hover:bg-muted text-foreground font-semibold transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleAdd} 
            disabled={!socialForm.url.trim() || !socialForm.label.trim()} 
            className="flex-1 px-4 py-2.5 bg-primary text-white rounded-xl hover:opacity-90 disabled:opacity-50 font-bold shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
          >
            Add Link
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default AddSocialLinkModal;