import React from 'react';
import classes from './css/Appearance.module.css';
import Typography from '@mui/material/Typography';
import { connect } from 'react-redux';

import AppereanceForm from './Appearance/AppearanceForm';

function Appearance(props) {
  return (
    <>
      <div className={classes.mainAppearanceContainer}>
        <Typography sx={{ fontSize: '48px', fontFamily: 'Magdelin-Black', color: '#121212' }}>
          {props && props.spree && props.spree.name
            ? props.spree.name
            : 'DCI: IN THE GAME Conference'}
        </Typography>
        <Typography
          paragraph
          sx={{ fontSize: '24px', fontFamily: 'Magdelin-Medium', color: '#707070' }}>
          Appereance
        </Typography>
        <div className={classes.appearanceMain} style={{ display: 'flex' }}>
          <div className={classes.table}>
            <div
              style={{
                textAlign: 'right',
                margin: '0 0 1.3rem',
                display: 'flex',
                justifyContent: 'flex-end'
              }}></div>
            <AppereanceForm />
          </div>
        </div>
      </div>
    </>
  );
}

function mapStateToProps(state) {
  return { spree: state && state.spree !== undefined && state.spree[0] ? state.spree[0] : null };
}

export default connect(mapStateToProps)(Appearance);
