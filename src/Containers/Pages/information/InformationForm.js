import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { editInformation } from '../../../Services/Information';
import { connect } from 'react-redux';
import classes from '../EventSchedule.module.css';
import styles from '../css/Information.module.css';
import { Form, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router';

function InformationForm(props) {
  const [spreeInfo, setSpreeInfo] = React.useState(null);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (props.spree) {
      setSpreeInfo(props.spree);
    }
  }, [props]);

  const saveChangesvalidation = Yup.object().shape({
    eventName: Yup.string().required('Event Name is Required'),
    contactWebsite: Yup.string()
      .url('Please enter valid URL')
      .required('Contact Website is Required'),
    address: Yup.string().required('Address is Required'),
    aboutUrl: Yup.string().url('Please enter valid URL').required('About URL is Required'),
    websiteHomePageUrl: Yup.string()
      .url('Please enter valid URL')
      .required('Website Home Page URL is Required'),
    websiteAboutPageUrl: Yup.string()
      .url('Please enter valid URL')
      .required('Website About Page URL is Required'),
    eventDescription: Yup.string().max(350, 'You have exceeded the maximum character limit'),
    facebookPageUrl: Yup.string().url('Please enter valid URL'),
    instagramPageUrl: Yup.string().url('Please enter valid URL'),
    linkedinPageUrl: Yup.string().url('Please enter valid URL'),
    twitterPageUrl: Yup.string().url('Please enter valid URL')
  });

  const editInformation = async (values) => {
    await props.editInformation(values);
  };

  const handleAppearance = () => {
    navigate('/appearance', { state: false });
  };

  return (
    <div className={classes.newEventScheduleContainer}>
      <Formik
        enableReinitialize
        initialValues={{
          eventName: spreeInfo && spreeInfo.name ? spreeInfo.name : '',
          contactWebsite: spreeInfo && spreeInfo.websiteContact ? spreeInfo.websiteContact : '',
          address: spreeInfo && spreeInfo.address ? spreeInfo.address : '',
          aboutUrl: spreeInfo && spreeInfo.websiteAbout ? spreeInfo.websiteAbout : '',
          websiteHomePageUrl: spreeInfo && spreeInfo.website ? spreeInfo.website : '',
          websiteAboutPageUrl: spreeInfo && spreeInfo.aboutUs ? spreeInfo.aboutUs : '',
          eventDescription: spreeInfo && spreeInfo.description ? spreeInfo.description : '',
          facebookPageUrl: spreeInfo && spreeInfo.facebookLink ? spreeInfo.facebookLink : '',
          instagramPageUrl: spreeInfo && spreeInfo.instagramLink ? spreeInfo.instagramLink : '',
          linkedinPageUrl: spreeInfo && spreeInfo.linkedIn ? spreeInfo.linkedIn : '',
          twitterPageUrl: spreeInfo && spreeInfo.twitterLink ? spreeInfo.twitterLink : ''
        }}
        validationSchema={saveChangesvalidation}
        onSubmit={(values) => {
          values.id = spreeInfo.id;
          values.partnerName = spreeInfo.partnerName;
          values.primary_color = spreeInfo.primary_color;
          values.secondary_color = spreeInfo.secondary_color;
          values.background_color = spreeInfo.background_color;
          values.stamp_value = spreeInfo.stamp_value;
          values.caratId = spreeInfo.caratId;
          values.latitude = spreeInfo.latitude;
          values.longitude = spreeInfo.longitude;

          editInformation(values);
        }}>
        {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) => (
          <Form
            onSubmit={handleSubmit}
            role="form"
            className={classes.informationFormContainer}
            style={{ width: '100%', display: 'flex' }}>
            <div style={{ display: 'flex', width: '100%' }}>
              <div style={{ width: '100%' }} className={classes.newEventScheduleForm}>
                <Form.Group>
                  <Row className={classes.newEventScheduleFormRow}>
                    <Col xl={6}>
                      <Form.Label className={classes.newEventFormLabel}>Event Name*</Form.Label>
                      <Form.Control
                        type="text"
                        value={values.eventName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="eventName"
                        className={classes.newEventFormInput}
                      />
                      {errors.eventName && touched.eventName && (
                        <div style={{ color: 'red' }}>{errors.eventName} </div>
                      )}
                    </Col>

                    <Col xl={6}>
                      <Form.Label className={classes.newEventFormLabel}>
                        Contact Website*
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={values.contactWebsite}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="contactWebsite"
                        className={classes.newEventFormInput}
                      />
                      {errors.contactWebsite && touched.contactWebsite && (
                        <div style={{ color: 'red' }}>{errors.contactWebsite} </div>
                      )}
                    </Col>
                  </Row>
                </Form.Group>

                <Row className={classes.newEventScheduleFormRow}>
                  <Col xl={6}>
                    <Form.Label className={classes.newEventFormLabel}>Address*</Form.Label>
                    <Form.Control
                      type="text"
                      value={values.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="address"
                      className={classes.newEventFormInput}
                    />
                    {errors.address && touched.address && (
                      <div style={{ color: 'red' }}>{errors.address} </div>
                    )}
                  </Col>
                  <Col xl={6}>
                    <Form.Label className={classes.newEventFormLabel}>About URL*</Form.Label>
                    <Form.Control
                      type="text"
                      value={values.aboutUrl}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="aboutUrl"
                      className={classes.newEventFormInput}
                    />
                    {errors.aboutUrl && touched.aboutUrl && (
                      <div style={{ color: 'red' }}>{errors.aboutUrl} </div>
                    )}
                  </Col>
                </Row>
                <Row className={classes.newEventScheduleFormRow}>
                  <Col xl={6}>
                    <Form.Label className={classes.newEventFormLabel}>
                      Website Home Page URL*
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={values.websiteHomePageUrl}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="websiteHomePageUrl"
                      className={classes.newEventFormInput}
                    />
                    {errors.websiteHomePageUrl && touched.websiteHomePageUrl && (
                      <div style={{ color: 'red' }}>{errors.websiteHomePageUrl} </div>
                    )}
                  </Col>
                </Row>
                <Row className={classes.newEventScheduleFormRow} style={{ position: 'relative' }}>
                  <Col xl={6}>
                    <Form.Label className={classes.newEventFormLabel}>
                      Website About Page URL*
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={values.websiteAboutPageUrl}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="websiteAboutPageUrl"
                      className={classes.newEventFormInput}
                    />
                    {errors.websiteAboutPageUrl && touched.websiteAboutPageUrl && (
                      <div style={{ color: 'red' }}>{errors.websiteAboutPageUrl} </div>
                    )}
                  </Col>
                  <Col xl={6} style={{ position: 'absolute', right: '0', marginRight: '-10px' }}>
                    <Form.Label className={classes.newEventFormLabel}>Event Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="eventDescription"
                      value={values.eventDescription}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      rows="10"
                      style={{ resize: 'none' }}
                      className={classes.newEventFormInput}
                    />
                    {errors.eventDescription && touched.eventDescription && (
                      <div style={{ color: 'red' }}>{errors.eventDescription} </div>
                    )}
                    <div
                      style={{
                        color: '#121212',
                        fontFamily: 'Magdelin-Medium',
                        fontSize: '14px'
                      }}>
                      350 Character Limit. Description will be shown on App Home Screen. Recommended
                      to include Information on how users will earn Carats during your event.
                    </div>
                  </Col>
                </Row>
                <Row className={classes.newEventScheduleFormRow}>
                  <Col xl={6}>
                    <Form.Label className={classes.newEventFormLabel}>Facebook Page URL</Form.Label>
                    <Form.Control
                      type="text"
                      value={values.facebookPageUrl}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="facebookPageUrl"
                      className={classes.newEventFormInput}
                    />
                    {errors.facebookPageUrl && touched.facebookPageUrl && (
                      <div style={{ color: 'red' }}>{errors.facebookPageUrl} </div>
                    )}
                  </Col>
                </Row>
                <Row className={classes.newEventScheduleFormRow}>
                  <Col xl={6}>
                    <Form.Label className={classes.newEventFormLabel}>
                      Instagram Page URL
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={values.instagramPageUrl}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="instagramPageUrl"
                      className={classes.newEventFormInput}
                    />
                    {errors.instagramPageUrl && touched.instagramPageUrl && (
                      <div style={{ color: 'red' }}>{errors.instagramPageUrl} </div>
                    )}
                  </Col>
                </Row>
                <Row className={classes.newEventScheduleFormRow}>
                  <Col xl={6}>
                    <Form.Label className={classes.newEventFormLabel}>LinkedIn Page URL</Form.Label>
                    <Form.Control
                      type="text"
                      value={values.linkedinPageUrl}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="linkedinPageUrl"
                      className={classes.newEventFormInput}
                    />
                    {errors.linkedinPageUrl && touched.linkedinPageUrl && (
                      <div style={{ color: 'red' }}>{errors.linkedinPageUrl} </div>
                    )}
                  </Col>
                </Row>

                <Row className={`${classes.newEventScheduleFormRow}`}>
                  <Col xl={6}>
                    <Form.Label className={classes.newEventFormLabel}>Twitter Page URL</Form.Label>
                    <Form.Control
                      type="text"
                      value={values.twitterPageUrl}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="twitterPageUrl"
                      className={classes.newEventFormInput}
                    />
                    {errors.twitterPageUrl && touched.twitterPageUrl && (
                      <div style={{ color: 'red' }}>{errors.twitterPageUrl} </div>
                    )}
                  </Col>
                  <Col xl={6}>
                    <div style={{ display: 'flex', justifyContent: 'end' }}>
                      <button type="submit" className={`${styles.saveChangeBtn}`}>
                        Save Changes
                      </button>
                      <button
                        className={`${styles.customizeBtn}`}
                        type="button"
                        onClick={handleAppearance}>
                        Customize Appereance
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

export default connect(mapStateToProps, { editInformation })(InformationForm);
