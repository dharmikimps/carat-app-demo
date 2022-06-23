import React from 'react';
import classes from '../css/Settings.module.css';
import packageJson from '../../../package.alias.json';
import Typography from '@mui/material/Typography';
import { connect } from 'react-redux';

import { Form, Row, Col } from 'react-bootstrap';
import { Outlet } from 'react-router';
import { Formik } from 'formik';
import getHelp from '../../../Assets/Images/gethelp.svg';

function SettingsOverview(props) {
  return (
    <>
      <div className={`${classes.mainSettingsContainer} ${classes.profileContainer}`}>
        <Typography sx={{ fontSize: '48px', fontFamily: 'Magdelin-Black', color: '#121212' }}>
          Dashboard Overview
        </Typography>

        <div className={`${classes.settingsContainer} ${classes.overViewFormContainer}`}>
          <Formik onSubmit={() => {}}>
            {() => (
              <Form
                role="form"
                className={classes.settingsFormContainer}
                style={{ width: '100%', display: 'flex' }}>
                <div style={{ display: 'flex', width: '100%' }}>
                  <div style={{ width: '100%' }} className={classes.newSettingsForm}>
                    <Row className={classes.newSettingsFormRow}>
                      <h3>Details</h3>
                    </Row>

                    <Row className={classes.newSettingsFormRow}>
                      <Col>
                        <p className={classes.versionText}>dashboard version</p>
                        <p className={classes.versionNumber}>v.{packageJson.version}</p>
                        <p className={`${classes.versionNumber} ${classes.colorForVersion}`}>
                          Get Help &nbsp;
                          <span>
                            <img src={getHelp} alt="" />
                          </span>
                        </p>
                      </Col>
                      <Col>
                        <p className={classes.versionText}>Current experience</p>
                        <p className={classes.versionNumber}>
                          {props && props.spree && props.spree.name
                            ? props.spree.name
                            : '[spree.name]'}
                        </p>
                        <p className={`${classes.versionNumber} ${classes.colorForVersion}`}>
                          Documentation &nbsp;
                          <span>
                            <img src={getHelp} alt="" />
                          </span>
                        </p>
                      </Col>
                    </Row>

                    <Row className={`${classes.newSettingsFormRow}`}>
                      <Col xl={12}>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'end',
                            marginRight: '5%',
                            marginTop: '10%'
                          }}>
                          <button type="button" className={`${classes.saveChangeBtn}`}>
                            Save Changes
                          </button>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <Outlet />
    </>
  );
}

function mapStateToProps(state) {
  return { spree: state && state.spree !== undefined && state.spree[0] ? state.spree[0] : null };
}

export default connect(mapStateToProps)(SettingsOverview);
