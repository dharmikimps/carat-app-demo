import React from 'react';
import RewardForm from './Rewards/RewardForm';
import classes from './css/Directory.module.css';
import { connect } from 'react-redux';

function Rewards() {
  return (
    <div className={classes.mainDirectoryContainer}>
      <div className={classes.directoryTitleContainer}>
        <h1>Rewards</h1>
        <p>{'Establish your Terms & Conditions, How It Works & Prizes.'}</p>
      </div>

      <div style={{ position: 'relative' }}>
        <div
          style={{
            textAlign: 'right',
            display: 'flex',
            justifyContent: 'flex-end'
          }}>
          <div
            style={{
              background: 'white',
              display: 'flex',
              borderRadius: '15px',
              width: '250px',
              boxShadow: '3px 3px 8px rgba(0,0,0,0.1)'
            }}></div>
        </div>
      </div>
      <RewardForm />
    </div>
  );
}

function mapStateToProps(state) {
  return { spree: state.spree[0] };
}

export default connect(mapStateToProps)(Rewards);
