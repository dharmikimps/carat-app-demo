import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './css/SettingSidebar.module.css';

const SettingsSidebar = () => {
  return (
    <div style={{ margin: '1.5rem -1rem 0', color: '#707070' }} className={classes.mainContainer}>
      <h5
        style={{
          width: '100%',
          fontFamily: 'Magdelin-Medium',
          fontSize: '24px',
          marginBottom: '20%'
        }}>
        Settings <hr className={classes.settingsRuler} />
      </h5>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        <p style={{ width: '100%' }} className={classes.settingsTitle}>
          Global Settings
        </p>
        <NavLink
          style={({ isActive }) => {
            return {
              color: isActive && '#707070',
              background: isActive && 'rgb(220, 220, 223)',
              borderRight: isActive && '4px solid #707070'
            };
          }}
          to="/settings/overview"
          className={`${classes.secondarySidebarLink} ${classes.marginBottom}`}>
          &bull; Overview
        </NavLink>
        <p style={{ width: '100%' }} className={classes.settingsTitle}>
          Account Setitngs
        </p>
        <NavLink
          style={({ isActive }) => {
            return {
              color: isActive && '#707070',
              background: isActive && 'rgb(220, 220, 223)',
              borderRight: isActive && '4px solid #707070'
            };
          }}
          to="/settings/profile"
          className={classes.secondarySidebarLink}>
          &bull; Profile
        </NavLink>
      </div>
    </div>
  );
};

export default SettingsSidebar;
