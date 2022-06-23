import React from 'react';
import InformationForm from './information/InformationForm';
import classes from './css/Directory.module.css';
import { connect } from 'react-redux';
import { getDirectory, deleteDirectory } from '../../Services/Directory';

function Information() {
  return (
    <div className={classes.mainDirectoryContainer}>
      <div className={classes.directoryTitleContainer}>
        <h1>Information</h1>
      </div>

      <div className={classes.maindirec} style={{ position: 'relative' }}>
        <div
          style={{
            textAlign: 'right',
            margin: '1rem 0',
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

      <InformationForm />
    </div>
  );
}

function mapStateToProps(state) {
  return { spree: state.spree[0] };
}

export default connect(mapStateToProps, { getDirectory, deleteDirectory })(Information);
