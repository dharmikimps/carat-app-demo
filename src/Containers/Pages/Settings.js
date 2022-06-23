import React from 'react';
import { connect } from 'react-redux';
import SettingsLayout from './SettingsLayout';
import { Outlet } from 'react-router';

function Settings() {
  return (
    <>
      <SettingsLayout>
        <Outlet />
      </SettingsLayout>
    </>
  );
}

function mapStateToProps(state) {
  return { spree: state && state.spree !== undefined && state.spree[0] ? state.spree[0] : null };
}

export default connect(mapStateToProps)(Settings);
