import { useState } from "react";

function ResumeCard() {
  const [file, setFile] = useState(null);
  const [objectUrl, setObjectUrl] = useState(null);

  const handleUpload = (e) => {
    const uploaded = e.target.files[0];
    if (uploaded) {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
      setObjectUrl(URL.createObjectURL(uploaded));
      setFile(uploaded);
    }
  };

  const handleRemove = () => {
    if (objectUrl) URL.revokeObjectURL(objectUrl);
    setFile(null);
    setObjectUrl(null);
  };

  const handleDownload = () => {
    if (!objectUrl || !file) return;
    const a = document.createElement("a");
    a.href = objectUrl;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="bg-[var(--panel-accent-bg)] border border-border/40 rounded-2xl p-4 shadow-sm flex items-center justify-between">

      {/* Left Section */}
      <div className="flex items-center gap-4">

        {/* Icon */}
        <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10 9 9 9 8 9"/>
          </svg>
        </div>

        {/* File Info */}
        <div>
          <p className="text-sm font-medium">
            {file ? file.name : "Upload Resume"}
          </p>
          <p className="text-xs text-muted-foreground">
            {file ? `${(file.size / 1024).toFixed(1)} KB` : "PDF, DOC"}
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">

        {/* View */}
        {file && (
          <a
            href={objectUrl}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-full hover:bg-muted flex items-center justify-center"
            title="View file"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </a>
        )}

        {/* Download */}
        {file && (
          <button
            onClick={handleDownload}
            className="p-2 rounded-full hover:bg-muted flex items-center justify-center"
            title="Download file"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
          </button>
        )}

        {/* Remove */}
        {file && (
          <button
            onClick={handleRemove}
            className="p-2 rounded-full hover:bg-red-50 text-red-500 flex items-center justify-center"
            title="Remove file"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
              <path d="M10 11v6"/>
              <path d="M14 11v6"/>
              <path d="M9 6V4h6v2"/>
            </svg>
          </button>
        )}

        {/* Upload Button */}
        {!file && (
          <label className="cursor-pointer px-3 py-2 bg-primary text-white rounded-xl text-sm flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="17 8 12 3 7 8"/>
              <line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
            Upload
            <input
              type="file"
              className="hidden"
              accept=".pdf,.doc,.docx"
              onChange={handleUpload}
            />
          </label>
        )}
      </div>
    </div>
  );
}

export default ResumeCard;