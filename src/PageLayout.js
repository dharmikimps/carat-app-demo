import React from 'react';
import { useLocation } from 'react-router';
import Sidebar from './Components/Sidebar';

function PageLayout({ children, ProfileData }) {
  const location = useLocation();

  return (
    <div className="sidebarmain">
      <div className="mside">
        <Sidebar ProfileData={ProfileData} />
      </div>
      <div
        className={`dashboardmain ${
          location.pathname !== '/settings/overview'
            ? location.pathname !== '/settings/profile'
              ? 'screenPadding'
              : undefined
            : undefined
        }`}>
        {children}
      </div>
    </div>
  );
}

export default PageLayout;
