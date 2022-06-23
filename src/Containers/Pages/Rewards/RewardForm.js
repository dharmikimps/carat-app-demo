import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { editRewardDescription } from '../../../Services/Rewards';
import { connect, useDispatch } from 'react-redux';
import classes from '../css/Reward.module.css';
import { Form, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import rewarddark from '../../../Assets/Images/reward1.svg';
import rewardsilver from '../../../Assets/Images/reward2.svg';
import rewardyellow from '../../../Assets/Images/reward3.svg';
import { getSpreeData } from '../../../Actions/Refresh';

const rewardsDescriptionSchema = Yup.object().shape({
  explore: Yup.string().required('Explore is Required'),
  earningCarats: Yup.string().required('Earning Carats is Required')
});

function RewardForm(props) {
  let navigate = useNavigate();
  let dispatch = useDispatch();

  const [spreeInfo, setSpreeInfo] = React.useState(null);

  React.useEffect(() => {
    if (props && props.spree) {
      setSpreeInfo(props.spree);
    }
  }, [props]);

  const editRewardsForm = async (values) => {
    let data = await props.editRewardDescription(values);

    dispatch(getSpreeData(data));
  };

  const editPrizeData = () => {
    navigate('/rewards/edit-prize', { state: false });
  };

  return (
    <div className={classes.newEventScheduleContainer}>
      <div></div>
      <Formik
        enableReinitialize
        initialValues={{
          explore: spreeInfo && spreeInfo.infoExploreText ? spreeInfo.infoExploreText : '',
          earningCarats:
            spreeInfo && spreeInfo.infoEarnCaratsText ? spreeInfo.infoEarnCaratsText : ''
        }}
        validationSchema={rewardsDescriptionSchema}
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

          editRewardsForm(values);
        }}>
        {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) => (
          <Form
            onSubmit={handleSubmit}
            role="form"
            className={classes.rewardFormContainer}
            style={{ width: '100%', display: 'flex' }}>
            <div style={{ display: 'flex', width: '100%' }}>
              <div
                style={{
                  width: '75%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
                className={classes.newEventScheduleForm}>
                <Form.Group>
                  <Row className={classes.newEventScheduleFormRow}>
                    <Col xl={6}>
                      <h4 className={classes.rewardFormLabel}>Explore</h4>
                      <Form.Label className={classes.newEventFormLabel}>
                        Explore Description
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        name="explore"
                        value={values.explore}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        rows="8"
                        style={{ resize: 'none' }}
                        className={classes.newEventFormInput}
                      />
                      {errors.explore && touched.explore && (
                        <div style={{ color: 'red' }}>{errors.explore} </div>
                      )}
                      <div
                        style={{
                          color: '#121212',
                          fontFamily: 'Magdelin-Medium',
                          fontSize: '14px'
                        }}>
                        In a couple sentences describe how users will explore your event.
                      </div>
                    </Col>

                    <Col xl={6}>
                      <h4 className={classes.rewardFormLabel}>Earning Carats</h4>
                      <Form.Label className={classes.newEventFormLabel}>
                        Earning Description
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        name="earningCarats"
                        value={values.earningCarats}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        rows="8"
                        style={{ resize: 'none' }}
                        className={classes.newEventFormInput}
                      />
                      {errors.earningCarats && touched.earningCarats && (
                        <div style={{ color: 'red' }}>{errors.earningCarats} </div>
                      )}
                      <div
                        style={{
                          color: '#121212',
                          fontFamily: 'Magdelin-Medium',
                          fontSize: '14px'
                        }}>
                        How do users earn carats? Where are they checking in at your event?
                      </div>
                    </Col>
                  </Row>
                </Form.Group>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end'
                  }}>
                  <button type="submit" className={`${classes.saveChangeBtn}`}>
                    Save Changes
                  </button>
                </div>
              </div>

              <div className={classes.eventDetailsContainer}>
                <span className={classes.prizeTxt}>Prize Details</span>
                <div>
                  <div className={classes.prizeContainer}>
                    <img src={rewarddark} width="100%" />
                    <div>
                      <h4 className={classes.prizehead}>Bronze Prizes</h4>
                      <div className={classes.prizedec}>
                        Require{' '}
                        {props.spree && spreeInfo && spreeInfo.prize_bronze_number_carats
                          ? spreeInfo.prize_bronze_number_carats
                          : 'NaN'}{' '}
                        Carats
                      </div>
                    </div>
                  </div>

                  <div className={classes.prizeContainer}>
                    <img width={'100%'} src={rewardsilver} />
                    <div>
                      <h4 className={classes.prizehead}>Silver Prizes</h4>
                      <div className={classes.prizedec}>
                        Require{' '}
                        {props && props.spree && spreeInfo && spreeInfo.prize_silver_number_carats
                          ? spreeInfo.prize_silver_number_carats
                          : 'NaN'}{' '}
                        Carats
                      </div>
                    </div>
                  </div>

                  <div className={classes.prizeContainer}>
                    <img width={'100%'} src={rewardyellow} />
                    <div>
                      <h4 className={classes.prizehead}>Gold Prizes</h4>
                      <div className={classes.prizedec}>
                        Require{' '}
                        {props && props.spree && spreeInfo && spreeInfo.prize_gold_number_carats
                          ? spreeInfo.prize_gold_number_carats
                          : 'NaN'}{' '}
                        Carats
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => editPrizeData()}
                  type="button"
                  className={`w-100 ${classes.editprizeBtn}`}>
                  Edit Prize Details
                </button>
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

export default connect(mapStateToProps, { editRewardDescription })(RewardForm);
