import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { customStyles, messageListOptionStyles } from '../../../Assets/styles/OptionStyle';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classes from '../../Pages/css/Message.module.css';
import back from '../../../Assets/Images/back.svg';
import { Form, Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import MySelect from '../../../Components/MessageOption';
import { components } from 'react-select';
import Checkbox from '@mui/material/Checkbox';
import {
  getUserSpree,
  createNewMessage,
  editMessage,
  deleteMessage
} from '../../../Services/Message';
import { useNavigate, useLocation } from 'react-router';
import Calendar from '../../../Assets/Images/calendar.svg';
import moment from 'moment';
import DeleteModal from '../../../Components/DeleteModal';

const newMessagevalidation = Yup.object().shape({
  subjectLine: Yup.string().required('Subject Line is Required'),
  bodyText: Yup.string().required('Body Text is Required'),
  messageLink: Yup.string().url('Please Enter a Valid URL'),
  messageLinkLabel: Yup.string().max(75, 'You can enter only 75 Characters'),
  startDate: Yup.date(),
  endDate: Yup.date(),
  primaryColor: Yup.string(),
  backgroundColor: Yup.string(),
  users: Yup.array()
    .of(
      Yup.object()
        .shape({
          user_id: Yup.string()
        })
        .nullable()
    )
    .nullable()
});

const Option = (props) => {
  return (
    <div style={{ display: 'flex' }}>
      <components.Option {...props}>
        <Checkbox
          style={{
            color: 'black',
            width: '18px',
            height: '18px',
            marginRight: '0.8rem'
          }}
          checked={props.isSelected}
          onChange={() => null}
        />
        <label
          style={{
            fontSize: '16x',
            fontWeight: '400'
          }}>
          {props.label}
        </label>
      </components.Option>
    </div>
  );
};

const allOption = {
  label: 'All',
  value: '*'
};

const ValueContainer = ({ children, ...props }) => {
  const currentValues = props.getValue();
  let toBeRendered = children;

  if (currentValues.some((val) => val.value === allOption.value)) {
    toBeRendered = [[children[0][0]], children[1]];
  }

  return <components.ValueContainer {...props}>{toBeRendered}</components.ValueContainer>;
};

const MultiValue = (props) => {
  return (
    <components.MultiValue {...props}>
      {props.data.label === 'All' ? props.data.label : props.data.labelByFirstName}
    </components.MultiValue>
  );
};

const animatedComponents = makeAnimated();

function NewMessage(props) {
  let navigate = useNavigate();
  const { state, pathname } = useLocation();
  const [primaryColor, setPrimaryColor] = useState(
    null || (state && !state.text_color && '#121212') || (state && state.text_color)
  );
  const [bgColor, setBgColor] = useState(
    null || (state && !state.background_color && '#dc37ee') || (state && state.background_color)
  );
  const [notification, setNotificaton] = useState({ label: 'False', value: false });
  const [selectedOption, setSelectedOption] = useState([]);
  const [userData, setUserData] = useState([]);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    var primary_color_picker = document.getElementById('primary-color-picker');
    var primary_color_picker_wrapper = document.getElementById('primary-color-picker-wrapper');
    primary_color_picker.onChange = function () {
      primary_color_picker_wrapper.style.backgroundColor = primary_color_picker.value;
    };
    primary_color_picker_wrapper.style.backgroundColor = primary_color_picker.value;
  }, [primaryColor, props]);

  useEffect(() => {
    var background_color_picker = document.getElementById('background-color-picker');
    var background_color_picker_wrapper = document.getElementById(
      'background-color-picker-wrapper'
    );
    background_color_picker.onChange = function () {
      background_color_picker_wrapper.style.backgroundColor = background_color_picker.value;
    };
    background_color_picker_wrapper.style.backgroundColor = background_color_picker.value;
  }, [bgColor, props]);

  useEffect(() => {
    loadUserData();
  }, [props]);

  const loadUserData = async () => {
    if (props && props.spree) {
      const usersValue = await props.getUserSpree(props.spree.id);
      setUserData(usersValue);

      if (state && !state.users) {
        let data = [
          { value: state.name, label: state.name, id: state.id, labelByFirstName: state.name }
        ];
        setSelectedOption(data);
      } else if (usersValue && state && state.users) {
        let selectedUsersData =
          usersValue &&
          usersValue.length > 0 &&
          usersValue.filter((item) => {
            const data =
              state.users &&
              state.users.length > 0 &&
              state.users.some((data) => {
                return data.user_id === item.id;
              });
            if (data) {
              return { item };
            }
          });

        const selectedUsersValue =
          selectedUsersData &&
          selectedUsersData.length > 0 &&
          selectedUsersData.map((item) => {
            return {
              value: item.firstName,
              label: `${item.firstName} (${item.email})`,
              id: item.id,
              labelByFirstName: item.firstName
            };
          });

        setSelectedOption(selectedUsersValue);
      }
    }

    if (state && state.isNotificationSent) {
      let notificationValue = state && state.isNotificationSent.toString();
      let uppVal = notificationValue.slice(0, 1).toUpperCase();
      let lowVal = notificationValue.slice(1, notificationValue.length).toLowerCase();
      setNotificaton({
        label: uppVal.concat(lowVal),
        value: state.isNotificationSent
      });
    }
  };

  const saveMessage = async (values) => {
    await props.createNewMessage(values);
    if (pathname === '/leaderboards/messages/new-message') {
      navigate('/leaderboards');
    } else {
      navigate('/messages');
    }
  };

  const editMessage = async (values) => {
    await props.editMessage(values);
    navigate('/messages');
  };

  let options =
    userData &&
    userData.map(function (item) {
      return {
        value: item.firstName,
        label: `${item.firstName} ${item.lastName !== undefined ? item.lastName : ''} (${
          item.email
        })`,
        id: item.id,
        labelByFirstName: item.firstName
      };
    });

  const deleteMessageData = async () => {
    let deleteMsgIdArr = [{ messageId: state.id }];
    await props.deleteMessage(deleteMsgIdArr);

    navigate('/messages');
  };

  return (
    <div className={classes.newEventScheduleContainer}>
      <div>
        <Link
          to={pathname === '/leaderboards/messages/new-message' ? '/leaderboards' : '/messages'}>
          <img src={back} alt="Back Button" />
        </Link>
        <h1>{state && state.createdAt ? 'Edit Message' : 'Create New Message'}</h1>
      </div>

      <Formik
        initialValues={{
          subjectLine: (state && state.title) || '',
          bodyText: (state && state.description) || '',
          messageLink: (state && state.message_link) || '',
          messageLinkLabel: (state && state.message_link_text) || '',
          startDate:
            (state && moment(state.start_date).format('MM/DD/YYYY h:mm A')) ||
            moment().format('yyyy-MM-DDThh:mm'),
          endDate:
            (state && moment(state.end_date).format('MM/DD/YYYY h:mm A')) ||
            moment().format('yyyy-MM-DDThh:mm'),
          users: (state && state.users) || [],
          isNotificationSent: (state && state.isNotificationSent) || false,
          primaryColor: (state && state.text_color) || '',
          backgroundColor: (state && state.background_color) || ''
        }}
        validationSchema={newMessagevalidation}
        onSubmit={(values) => {
          values.isNotificationSent = notification.value;
          values.spree = props.spree.id;
          if (values.users) {
            let userData = values.users.map((item) => {
              return { user_id: item.id };
            });
            values.users = userData;
          } else if (values.users === false) {
            values.users = [];
          }
          if (state && !state.createdAt) {
            saveMessage(values);
          } else if (state && state.createdAt) {
            values.id = state.id;
            editMessage(values);
          } else {
            saveMessage(values);
          }
        }}>
        {({ values, handleChange, handleSubmit, isSubmitting, errors, touched, handleBlur }) => (
          <Form
            onSubmit={handleSubmit}
            role="form"
            className={classes.newEventScheduleFormsContainer}
            style={{ width: '100%', display: 'flex' }}>
            <div style={{ display: 'flex', width: '100%' }}>
              <div style={{ width: '72%' }} className={classes.newEventScheduleForm}>
                <Row className={classes.newEventScheduleFormRow}>
                  <Form.Group>
                    <Col xl={12}>
                      <Form.Label className={classes.newEventFormLabel}>Subject Line</Form.Label>
                      <Form.Control
                        type="text"
                        name="subjectLine"
                        value={values.subjectLine}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={isSubmitting}
                        className={classes.newEventFormInput}
                      />
                      {errors.subjectLine && touched.subjectLine && (
                        <div style={{ color: 'red' }}>{errors.subjectLine} </div>
                      )}
                    </Col>
                  </Form.Group>
                </Row>
                <Row className={classes.newEventScheduleFormRow}>
                  <Form.Group>
                    <Col xl={12}>
                      <Form.Label className={classes.newEventFormLabel}>Body Text</Form.Label>
                      <Form.Control
                        as="textarea"
                        name="bodyText"
                        value={values.bodyText}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={isSubmitting}
                        rows="4"
                        style={{ resize: 'none' }}
                        className={classes.newEventFormInput}
                      />
                      {errors.bodyText && touched.bodyText && (
                        <div style={{ color: 'red' }}>{errors.bodyText} </div>
                      )}
                    </Col>
                  </Form.Group>
                </Row>

                <Row className={`${classes.newEventScheduleFormRow}`}>
                  <Col xl={6}>
                    <Form.Label className={classes.newEventFormLabel}>Message Link to</Form.Label>
                    <Form.Control
                      type="url"
                      name="messageLink"
                      value={values.messageLink}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={isSubmitting}
                      className={classes.newEventFormInput}
                    />
                    {errors.messageLink && touched.messageLink && (
                      <div style={{ color: 'red' }}>{errors.messageLink} </div>
                    )}
                    <div
                      style={{
                        color: '#121212',
                        fontFamily: 'Magdelin-Medium',
                        fontSize: '14px'
                      }}>
                      Complete URL
                    </div>
                  </Col>

                  <Col xl={6}>
                    <Form.Label className={classes.newEventFormLabel}>
                      Message Link Label
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="messageLinkLabel"
                      value={values.messageLinkLabel}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={isSubmitting}
                      className={classes.newEventFormInput}
                    />
                    {errors.messageLinkLabel && touched.messageLinkLabel && (
                      <div style={{ color: 'red' }}>{errors.messageLinkLabel} </div>
                    )}
                    <div
                      style={{
                        color: '#121212',
                        fontFamily: 'Magdelin-Medium',
                        fontSize: '14px'
                      }}>
                      75 Character Limit.
                    </div>
                  </Col>
                </Row>

                <Row
                  className={`${classes.newEventScheduleFormRow}`}
                  style={{ marginBottom: '2rem' }}>
                  <Col xl={3}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <Form.Label
                        className={classes.newEventFormLabel}
                        style={{ paddingBottom: '13%' }}>
                        Primary Color
                      </Form.Label>

                      <div className={classes.colorPickerContainer}>
                        <div
                          id="primary-color-picker-wrapper"
                          style={{
                            width: '2rem',
                            height: '2rem',
                            borderRadius: '50%',
                            marginRight: '1rem',
                            zIndex: '10'
                          }}>
                          <Form.Control
                            type="color"
                            name="primaryColor"
                            id="primary-color-picker"
                            value={
                              primaryColor === null
                                ? (values.primaryColor = '#121212')
                                : (values.primaryColor = primaryColor)
                            }
                            onChange={(e) => setPrimaryColor(e.target.value)}
                          />
                        </div>
                        <span className={classes.colorNameText}>
                          {primaryColor === null ? '#121212' : primaryColor}
                        </span>
                      </div>
                    </div>
                    {errors.color && touched.color && (
                      <div style={{ color: 'red' }}>{errors.color} </div>
                    )}
                  </Col>

                  <Col xl={3}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <Form.Label
                        className={classes.newEventFormLabel}
                        style={{ paddingBottom: '13%' }}>
                        Background Color
                      </Form.Label>

                      <div className={classes.colorPickerContainer}>
                        <div
                          id="background-color-picker-wrapper"
                          style={{
                            width: '2rem',
                            height: '2rem',
                            borderRadius: '50%',
                            marginRight: '1rem',
                            zIndex: '10'
                          }}>
                          <Form.Control
                            type="color"
                            name="backgroundColor"
                            id="background-color-picker"
                            value={
                              bgColor === null
                                ? (values.backgroundColor = '#DC37EE')
                                : (values.backgroundColor = bgColor)
                            }
                            onChange={(e) => setBgColor(e.target.value)}
                          />
                        </div>
                        <span className={classes.colorNameText}>
                          {bgColor === null ? '#DC37EE' : bgColor}
                        </span>
                      </div>
                    </div>
                    {errors.color && touched.color && (
                      <div style={{ color: 'red' }}>{errors.color} </div>
                    )}
                  </Col>

                  <Col xl={6}>
                    <Form.Label className={classes.newEventFormLabel}>Send Message to</Form.Label>
                    <MySelect
                      options={options}
                      isMulti={true}
                      closeMenuOnSelect={false}
                      hideSelectedOptions={false}
                      value={(values.users = selectedOption)}
                      onChange={(val) => {
                        setSelectedOption(val);
                      }}
                      allowSelectAll={userData && userData.length > 0 ? true : false}
                      styles={messageListOptionStyles}
                      components={{
                        Option,
                        ValueContainer,
                        animatedComponents,
                        MultiValue,
                        IndicatorSeparator: () => null
                      }}
                    />
                  </Col>
                </Row>

                <Row
                  className={`${classes.newEventScheduleFormRow}`}
                  style={{ marginBottom: '2rem' }}>
                  <Col xl={3}>
                    <Form.Label className={classes.newEventFormLabel}>Start Date</Form.Label>
                    <label htmlFor="inputLogoTag" className={classes.labelFile}>
                      <p className={classes.selectedFile}>
                        <span className={classes.dateClass} style={{ color: '#121212' }}>
                          {moment(values.startDate).format('MM/DD/YYYY h:mm A')}
                        </span>
                        <img
                          src={Calendar}
                          alt=""
                          width="20px"
                          height="20px"
                          style={{ cursor: 'pointer' }}
                        />
                      </p>
                      <input
                        type="datetime-local"
                        name="startDate"
                        value={values.startDate}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={isSubmitting}
                        className={`${classes.inputFile}`}
                      />
                    </label>
                    {errors.startDate && touched.startDate && (
                      <div style={{ color: 'red' }}>{errors.startDate} </div>
                    )}
                    <div
                      style={{
                        color: '#121212',
                        fontFamily: 'Magdelin-Medium',
                        fontSize: '14px'
                      }}>
                      (mm/dd/yyyy)
                    </div>
                  </Col>

                  <Col xl={3}>
                    <Form.Label className={classes.newEventFormLabel}>End Date</Form.Label>
                    <label htmlFor="inputLogoTag" className={classes.labelFile}>
                      <p className={classes.selectedFile}>
                        <span className={classes.dateClass} style={{ color: '#121212' }}>
                          {moment(values.endDate).format('MM/DD/YYYY h:mm A')}
                        </span>
                        <img
                          src={Calendar}
                          alt=""
                          width="20px"
                          height="20px"
                          style={{ cursor: 'pointer' }}
                        />
                      </p>
                      <input
                        type="datetime-local"
                        name="endDate"
                        value={values.endDate}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={isSubmitting}
                        className={`${classes.inputFile}`}
                      />
                    </label>
                    {errors.endDate && touched.endDate && (
                      <div style={{ color: 'red' }}>{errors.endDate} </div>
                    )}
                    <div
                      style={{
                        color: '#121212',
                        fontFamily: 'Magdelin-Medium',
                        fontSize: '14px'
                      }}>
                      (mm/dd/yyyy)
                    </div>
                  </Col>
                </Row>

                <Row
                  className={`${classes.newEventScheduleFormRow}`}
                  style={{ marginBottom: '2rem' }}>
                  <Col xl={6}>
                    <Form.Label className={classes.newEventFormLabel}>
                      Push Notification?
                    </Form.Label>
                    <Select
                      options={[
                        { label: 'True', value: true },
                        { label: 'False', value: false }
                      ]}
                      styles={customStyles}
                      defaultValue={notification}
                      onChange={(val) => setNotificaton(val)}
                      value={
                        isSubmitting
                          ? (values.isNotificationSent = notification.value)
                          : (values.isNotificationSent = notification)
                      }
                      components={{ IndicatorSeparator: () => null }}
                      disabled={isSubmitting}
                    />
                    {errors.hidden && touched.hidden && (
                      <div style={{ color: 'red' }}>{errors.hidden} </div>
                    )}
                    <div
                      style={{
                        color: '#121212',
                        fontFamily: 'Magdelin-Medium',
                        fontSize: '14px'
                      }}>
                      It is recommended to not spam your users. We will limit you to # of
                      notifications per day!
                    </div>
                  </Col>
                </Row>
              </div>

              <div className={classes.eventDetailsContainer}>
                <div className={classes.informationContainer}>
                  <span className={classes.informationTxt}>INFORMATION</span>
                  <hr style={{ height: '0.1rem' }} />
                  <Row style={{ marginBottom: '1.8rem', marginTop: '1.8rem' }}>
                    <Col xl={4} style={{ textAlign: 'left' }}>
                      <span className={classes.createUpdateTxt}>Created</span>
                    </Col>
                    <Col xl={8} style={{ textAlign: 'right' }}>
                      <span className={classes.createUpdateTxt}>
                        {state && state.createdAt && moment(state.createdAt).format('LLL')}
                      </span>
                    </Col>
                  </Row>
                  <Row style={{ marginBottom: '1rem' }}>
                    <Col xl={5} style={{ textAlign: 'left' }}>
                      <span className={classes.createUpdateTxt}>Last Updated</span>
                    </Col>
                    <Col xl={7} style={{ textAlign: 'right' }}>
                      <span className={classes.createUpdateTxt}>
                        {state && state.updatedAt && moment(state.updatedAt).format('LLL')}
                      </span>
                    </Col>
                  </Row>
                </div>

                <div>
                  <button
                    type="submit"
                    className={`w-100 ${classes.saveBtn}`}
                    disabled={isSubmitting}>
                    {state && state.createdAt ? 'Update' : 'Save'}
                  </button>

                  {state && state.createdAt && state.updatedAt && (
                    <button
                      className={`w-100 ${classes.deleteBtn}`}
                      type="button"
                      onClick={() => handleOpen()}>
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <DeleteModal
        handleClose={() => handleOpen()}
        id={state && state.id ? state.id : undefined}
        open={open}
        delete={deleteMessageData}
      />
    </div>
  );
}

function mapStateToProps(state) {
  return { spree: state && state.spree !== undefined && state.spree[0] ? state.spree[0] : null };
}

export default connect(mapStateToProps, {
  getUserSpree,
  createNewMessage,
  editMessage,
  deleteMessage
})(NewMessage);
