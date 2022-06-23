import React from 'react';
import SettingsSidebar from '../../Components/SettingsSidebar';

const SettingsLayout = ({ children }) => {
  return (
    <div style={{ width: '100%', display: 'flex' }}>
      <div
        style={{
          width: '18%',
          padding: '0 1%',
          height: '100vh',
          borderRight: '2px solid rgb(172 172 174)'
        }}>
        <SettingsSidebar />
      </div>
      <div style={{ width: '82%', padding: '3%' }}>{children}</div>
    </div>
  );
};

export default SettingsLayout;
