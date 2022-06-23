import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { editUserInformation } from '../../../Services/UserService';
import { changePassword, logout } from '../../../Services/AuthServices';
import { connect } from 'react-redux';
import classes from '../css/Settings.module.css';
import { Form, Row, Col } from 'react-bootstrap';
import { useAppContext } from '../../../Lib/ContextLib';
import { useNavigate } from 'react-router';

function InformationForm(props) {
  const [userData, setUserData] = React.useState(null);
  const { setAuthenticated } = useAppContext();

  const navigate = useNavigate();

  const editUserInformation = async (values) => {
    if (values.firstName !== userData.firstName || values.lastName !== userData.lastName) {
      let response = await props.editUserInformation(values);
      if (response.status === 200) {
        if (values.currentPassword !== '' && values.newPassword !== '') {
          let passwordResponse = await props.changePassword(values);
          if (passwordResponse.status === 200) {
            setTimeout(async () => {
              const data = await props.logout();
              setAuthenticated(false);
              data && navigate('/login');
            }, 500);
          }
        } else {
          localStorage.setItem('user', JSON.stringify(response.data.data));
        }
      }
    } else if (values.currentPassword !== '' || values.newPassword !== '') {
      let passwordResponse = await props.changePassword(values);
      if (passwordResponse.status === 200) {
        setTimeout(async () => {
          const data = await props.logout();
          setAuthenticated(false);
          data && navigate('/login');
        }, 500);
      }
    }
  };

  React.useEffect(() => {
    let userInfo = JSON.parse(localStorage.getItem('user'));

    setUserData(userInfo);
  }, [props.editUserInformation]);

  const saveChangesvalidation = Yup.object().shape({
    firstName: Yup.string(),
    lastName: Yup.string(),
    email: Yup.string().email(),
    currentPassword: Yup.string(),
    newPassword: Yup.string(),
    confirmNewPassword: Yup.string().when('newPassword', {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref('newPassword')],
        'Both New password and Confirm password need to be the same'
      )
    })
  });

  return (
    <div className={classes.settingsContainer}>
      <Formik
        enableReinitialize
        initialValues={{
          firstName: userData && userData.firstName ? userData.firstName : '',
          lastName: userData && userData.lastName ? userData.lastName : '',
          email: userData && userData.email ? userData.email : '',
          currentPassword: '',
          newPassword: '',
          confirmNewPassword: ''
        }}
        validationSchema={saveChangesvalidation}
        onSubmit={(values) => {
          editUserInformation(values);
        }}>
        {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) => (
          <Form
            onSubmit={handleSubmit}
            role="form"
            className={classes.settingsFormContainer}
            style={{ width: '100%', display: 'flex' }}
            autoComplete="off">
            <div style={{ display: 'flex', width: '100%' }}>
              <div style={{ width: '100%' }} className={classes.newSettingsForm}>
                <Row className={classes.newSettingsFormRow}>
                  <h4 className={classes.settingsFormLabel}>Explore</h4>
                  <Col xl={6}>
                    <Form.Label className={classes.newSettingsFormLabel}>First Name*</Form.Label>
                    <Form.Control
                      type="text"
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="firstName"
                      className={classes.newSettingsFormInput}
                      autoComplete="off"
                    />
                    {errors.firstName && touched.firstName && (
                      <div style={{ color: 'red' }}>{errors.firstName} </div>
                    )}
                  </Col>
                  <Col xl={6}>
                    <Form.Label className={classes.newSettingsFormLabel}>Last Name*</Form.Label>
                    <Form.Control
                      type="text"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="lastName"
                      className={classes.newSettingsFormInput}
                      autoComplete="off"
                    />
                    {errors.lastName && touched.lastName && (
                      <div style={{ color: 'red' }}>{errors.lastName} </div>
                    )}
                  </Col>
                </Row>

                <Row className={classes.newSettingsFormRow}>
                  <Col xl={6}>
                    <Form.Label className={classes.newSettingsFormLabel}>Email*</Form.Label>
                    <Form.Control
                      type={values.email && values.email.length > 0 ? 'email' : 'text'}
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="email"
                      className={classes.newSettingsFormInput}
                      autoComplete="off"
                      disabled
                    />
                    {errors.email && touched.email && (
                      <div style={{ color: 'red' }}>{errors.email} </div>
                    )}
                  </Col>
                </Row>

                <Row className={classes.newSettingsFormRow} style={{ marginTop: '10rem' }}>
                  <h4 className={classes.settingsFormLabel}>Change Password</h4>
                  <Col xl={6}>
                    <Form.Label className={classes.newSettingsFormLabel}>
                      Current Password
                    </Form.Label>
                    <Form.Control
                      type={
                        values.currentPassword && values.currentPassword.length > 0
                          ? 'password'
                          : 'text'
                      }
                      value={values.currentPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="currentPassword"
                      className={classes.newSettingsFormInput}
                    />
                    {errors.currentPassword && touched.currentPassword && (
                      <div style={{ color: 'red' }}>{errors.currentPassword} </div>
                    )}
                  </Col>
                </Row>
                <Row className={classes.newSettingsFormRow}>
                  <Col xl={6}>
                    <Form.Label className={classes.newSettingsFormLabel}>New Password</Form.Label>
                    <Form.Control
                      type={
                        values.newPassword && values.newPassword.length > 0 ? 'password' : 'text'
                      }
                      value={values.newPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="newPassword"
                      className={classes.newSettingsFormInput}
                    />
                    {errors.newPassword && touched.newPassword && (
                      <div style={{ color: 'red' }}>{errors.newPassword} </div>
                    )}
                  </Col>

                  <Col xl={6}>
                    <Form.Label className={classes.newSettingsFormLabel}>
                      Confirm New Password
                    </Form.Label>
                    <Form.Control
                      type={values.confirmNewPassword.length > 0 ? 'password' : 'text'}
                      value={values.confirmNewPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="confirmNewPassword"
                      className={classes.newSettingsFormInput}
                    />
                    {errors.confirmNewPassword && touched.confirmNewPassword && (
                      <div style={{ color: 'red' }}>{errors.confirmNewPassword} </div>
                    )}
                  </Col>
                </Row>

                <Row className={`${classes.newSettingsFormRow}`}>
                  <Col xl={12}>
                    <div style={{ display: 'flex', justifyContent: 'end' }}>
                      <button
                        type="submit"
                        disabled={
                          values.currentPassword !== '' &&
                          values.newPassword !== '' &&
                          values.confirmNewPassword !== '' &&
                          userData &&
                          userData.firstName === values.firstName &&
                          userData.lastName === values.lastName
                            ? values.currentPassword === '' && values.newPassword === ''
                            : userData && userData.firstName && userData.lastName
                            ? userData &&
                              userData.firstName === values.firstName &&
                              userData &&
                              userData.lastName === values.lastName
                            : userData && userData.firstName && userData.lastName
                            ? userData && userData.firstName === values.firstName
                            : userData && userData.lastName === values.lastName
                        }
                        className={`${classes.saveChangeBtn}`}>
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
  );
}

function mapStateToProps(state) {
  return { spree: state.spree[0] };
}

export default connect(mapStateToProps, { editUserInformation, logout, changePassword })(
  InformationForm
);
