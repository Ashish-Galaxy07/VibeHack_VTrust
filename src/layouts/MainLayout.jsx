import SideNavigation from '../components/layout/SideNavigation';
import Navbar from '../components/layout/Navbar';

function MainLayout({ children, noPadding = false }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', overflow: 'hidden', position: 'fixed', top: 0, left: 0 }}>
      {/* Fixed Sidebar */}
      <SideNavigation />

      {/* Main area pushed right of sidebar */}
      <div style={{ marginLeft: "224px", display: 'flex', flexDirection: 'column', flex: 1, height: '100vh', overflow: 'hidden' }}>
        {/* Navbar */}
        <Navbar />

        {/* Content Area */}
        <div className="main-content-area" style={{ 
          padding: noPadding ? "0" : "24px", 
          flex: 1, 
          overflowY: "auto", 
          display: 'flex', 
          flexDirection: 'column', 
          minHeight: 0 
        }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default MainLayout;