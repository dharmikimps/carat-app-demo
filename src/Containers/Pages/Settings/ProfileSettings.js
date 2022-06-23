import React from 'react';
import classes from '../css/Settings.module.css';
import Typography from '@mui/material/Typography';
import { connect } from 'react-redux';

import SettingsForm from './SettingsForm';

function Settings() {
  const [userData, setUserData] = React.useState(null);

  React.useEffect(() => {
    let userInfo = JSON.parse(localStorage.getItem('user'));

    setUserData(userInfo);
  }, []);
  return (
    <>
      <div className={classes.mainSettingsContainer}>
        <Typography sx={{ fontSize: '48px', fontFamily: 'Magdelin-Black', color: '#121212' }}>
          {userData && userData.name}
        </Typography>
        <Typography
          paragraph
          sx={{ fontSize: '24px', fontFamily: 'Magdelin-Medium', color: '#707070' }}>
          Settings
        </Typography>
        <div className={classes.settingsMain} style={{ display: 'flex' }}>
          <div className={classes.table}>
            <div
              style={{
                textAlign: 'right',
                margin: '0 0 1.3rem',
                display: 'flex',
                justifyContent: 'flex-end'
              }}></div>
            <SettingsForm />
          </div>
        </div>
      </div>
    </>
  );
}

function mapStateToProps(state) {
  return { spree: state && state.spree !== undefined && state.spree[0] ? state.spree[0] : null };
}

export default connect(mapStateToProps)(Settings);
