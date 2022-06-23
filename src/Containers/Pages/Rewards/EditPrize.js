import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { connect, useDispatch } from 'react-redux';
import { editPrizeDetails } from '../../../Services/Rewards';
import { Link } from 'react-router-dom';
import classes from '../css/Reward.module.css';
import back from '../../../Assets/Images/back.svg';
import { Form, Row, Col } from 'react-bootstrap';
import moment from 'moment';
import { useNavigate } from 'react-router';
import PaperLayout from '../../../Components/PaperLayout';
import { getSpreeData } from '../../../Actions/Refresh';

const saveChangesvalidation = Yup.object().shape({
  prizeDetails: Yup.string(),
  bronzeDetails: Yup.string(),
  silverDetails: Yup.string(),
  goldDetails: Yup.string(),
  bronzeCarat: Yup.number().min(0, 'Please Enter positive Bronze carat value'),
  silverCarat: Yup.number().min(0, 'Please Enter positive Silver carat value'),
  goldCarat: Yup.number().min(0, 'Please Enter positive Gold carat value')
});

function EditPrize(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [spreeInfo, setSpreeInfo] = React.useState(null);

  React.useEffect(() => {
    if (props && props.spree) {
      setSpreeInfo(props.spree);
    }
  }, [props, navigate]);

  const editPrizeDetails = async (values) => {
    let data = await props.editPrizeDetails(values);
    dispatch(getSpreeData(data));
    navigate('/rewards');
  };

  return (
    <div className={classes.newEventScheduleContainer}>
      <div>
        <Link to="/rewards">
          <img src={back} alt="Back Button" />
        </Link>
        <h1>Prize Details</h1>
        <p>Edit prize details and requirements.</p>
      </div>
      <Formik
        enableReinitialize
        initialValues={{
          prizeDetails:
            spreeInfo && spreeInfo.spree_prize_details ? spreeInfo.spree_prize_details : '',
          bronzeDetails:
            spreeInfo && spreeInfo.prize_bronze_description
              ? spreeInfo.prize_bronze_description
              : '',
          silverDetails:
            spreeInfo && spreeInfo.prize_silver_description
              ? spreeInfo.prize_silver_description
              : '',
          goldDetails:
            spreeInfo && spreeInfo.prize_gold_description ? spreeInfo.prize_gold_description : '',
          bronzeCarat:
            spreeInfo && spreeInfo.prize_bronze_number_carats
              ? spreeInfo.prize_bronze_number_carats
              : '',
          silverCarat:
            spreeInfo && spreeInfo.prize_silver_number_carats
              ? spreeInfo.prize_silver_number_carats
              : '',
          goldCarat:
            spreeInfo && spreeInfo.prize_gold_number_carats
              ? spreeInfo.prize_gold_number_carats
              : ''
        }}
        validationSchema={saveChangesvalidation}
        onSubmit={(values) => {
          values.id = spreeInfo.id;
          values.name = spreeInfo.name;
          values.address = spreeInfo.address;
          values.website = spreeInfo.website;
          values.aboutUs = spreeInfo.aboutUs;
          values.partnerName = spreeInfo.partnerName;
          values.primary_color = spreeInfo.primary_color;
          values.secondary_color = spreeInfo.secondary_color;
          values.background_color = spreeInfo.background_color;
          values.stamp_value = spreeInfo.stamp_value;
          values.caratId = spreeInfo.caratId;
          values.latitude = spreeInfo.latitude;
          values.longitude = spreeInfo.longitude;
          editPrizeDetails(values);
        }}>
        {({ values, handleChange, handleBlur, handleSubmit, errors, touched, isSubmitting }) => (
          <div>
            <Form
              onSubmit={handleSubmit}
              role="form"
              className={classes.RewardFormContainer}
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'space-between',
                justifyContent: 'center'
              }}>
              <div style={{ display: 'flex', width: '100%' }}>
                <div style={{ width: '75%' }} className={classes.newEventScheduleForm}>
                  <Form.Group>
                    <Row className={classes.newEventScheduleFormRow}>
                      <Col xl={12}>
                        <h4 className={classes.rewardFormLabel}>Prize Details</h4>
                        <Form.Label className={classes.newEventFormLabel}>
                          Prize Details Description
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          name="prizeDetails"
                          value={values.prizeDetails}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          disabled={isSubmitting}
                          rows="6"
                          style={{ resize: 'none' }}
                          className={classes.newEventFormInput}
                        />
                        {errors.prizeDetails && touched.prizeDetails && (
                          <div style={{ color: 'red' }}>{errors.prizeDetails} </div>
                        )}
                        <div
                          style={{
                            color: '#121212',
                            fontFamily: 'Magdelin-Medium',
                            fontSize: '14px'
                          }}>
                          How do people earn prizes? Where do they pick up their prizes? When will
                          you conduct drawings?
                        </div>
                      </Col>
                    </Row>
                  </Form.Group>
                </div>

                <div className={`${classes.rewardDetailsContainer}`}>
                  <div className={`${classes.informationContainer}`}>
                    <span className={classes.informationTxt}>INFORMATION</span>
                    <hr style={{ height: '0.1rem' }} />
                    <Row style={{ marginBottom: '1rem' }}>
                      <Col xl={5} style={{ textAlign: 'left' }}>
                        <span className={classes.createUpdateTxt}>Last Updated</span>
                      </Col>
                      <Col xl={7} style={{ textAlign: 'right' }}>
                        <span className={classes.createUpdateTxt}>
                          {props &&
                            props.spree &&
                            spreeInfo &&
                            moment(spreeInfo.updatedAt).format('LLL')}
                        </span>
                      </Col>
                    </Row>
                  </div>

                  <div>
                    <button type="submit" className={`w-100 ${classes.saveBtn}`}>
                      Save
                    </button>
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  width: '75%',
                  marginTop: '2%',
                  justifyContent: 'space-between'
                }}>
                <PaperLayout>
                  <h4 className={classes.rewardFormLabel}>Bronze Details</h4>
                  <Form.Label className={classes.newEventFormLabel}>
                    Prize Details Description
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    name="bronzeDetails"
                    value={values.bronzeDetails}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                    rows="6"
                    style={{ resize: 'none' }}
                    className={classes.newEventFormInput}
                  />
                  {errors.bronzeDetails && touched.bronzeDetails && (
                    <div style={{ color: 'red' }}>{errors.bronzeDetails} </div>
                  )}
                  <div style={{ marginTop: '1.7rem' }}>
                    <Form.Label className={classes.newEventFormLabel}>Carats Required</Form.Label>
                    <Form.Control
                      style={{ width: '30%' }}
                      type="number"
                      value={values.bronzeCarat}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="bronzeCarat"
                      className={classes.newEventFormInput}
                    />
                    {errors.bronzeCarat && touched.bronzeCarat && (
                      <div style={{ color: 'red' }}>{errors.bronzeCarat} </div>
                    )}
                  </div>
                </PaperLayout>
                <PaperLayout>
                  <h4 className={classes.rewardFormLabel}>Silver Details</h4>
                  <Form.Label className={classes.newEventFormLabel}>
                    Prize Details Description
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    name="silverDetails"
                    value={values.silverDetails}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                    rows="6"
                    style={{ resize: 'none' }}
                    className={classes.newEventFormInput}
                  />
                  {errors.silverDetails && touched.silverDetails && (
                    <div style={{ color: 'red' }}>{errors.silverDetails} </div>
                  )}
                  <div style={{ marginTop: '1.7rem' }}>
                    <Form.Label className={classes.newEventFormLabel}>Carats Required</Form.Label>
                    <Form.Control
                      style={{ width: '30%' }}
                      type="number"
                      value={values.silverCarat}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="silverCarat"
                      className={classes.newEventFormInput}
                    />
                    {errors.silverCarat && touched.silverCarat && (
                      <div style={{ color: 'red' }}>{errors.silverCarat} </div>
                    )}
                  </div>
                </PaperLayout>
                <PaperLayout style={{ width: '33%' }} className={classes.newEventScheduleForm}>
                  <h4 className={classes.rewardFormLabel}>Gold Details</h4>
                  <Form.Label className={classes.newEventFormLabel}>
                    Prize Details Description
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    name="goldDetails"
                    value={values.goldDetails}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                    rows="6"
                    style={{ resize: 'none' }}
                    className={classes.newEventFormInput}
                  />
                  {errors.goldDetails && touched.goldDetails && (
                    <div style={{ color: 'red' }}>{errors.goldDetails} </div>
                  )}
                  <div style={{ marginTop: '1.7rem' }}>
                    <Form.Label className={classes.newEventFormLabel}>Carats Required</Form.Label>
                    <Form.Control
                      style={{ width: '30%' }}
                      type="number"
                      value={values.goldCarat}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="goldCarat"
                      className={classes.newEventFormInput}
                    />
                    {errors.goldCarat && touched.goldCarat && (
                      <div style={{ color: 'red' }}>{errors.goldCarat} </div>
                    )}
                  </div>
                </PaperLayout>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
}

function mapStateToProps(state) {
  return { spree: state.spree[0] };
}

export default connect(mapStateToProps, { editPrizeDetails })(EditPrize);
