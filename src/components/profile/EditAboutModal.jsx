import Modal from './Modal';

function EditAboutModal({ isOpen, onClose, editForm, setEditForm, onSave }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit About">
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold mb-2 text-foreground/70 tracking-wide">Name</label>
          <input
            type="text"
            value={editForm.name}
            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
            className="w-full p-3 bg-muted/50 border border-border rounded-xl text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2 text-foreground/70 tracking-wide">About</label>
          <textarea
            value={editForm.bio}
            onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
            rows={4}
            className="w-full p-3 bg-muted/50 border border-border rounded-xl text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none"
          />
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

export default EditAboutModal;