import React from 'react';
import classes from '../EventSchedule.module.css';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { eventScheduleSaveChanges, getEvent } from '../../../Services/EventSchedule';
import { imageUpload } from '../../../Services/ImageUploadServices';
import { connect } from 'react-redux';
import { Row, Col, Form } from 'react-bootstrap';
import uploadImg from '../../../Assets/Images/image.svg';
import moment from 'moment';

const saveChangesvalidation = Yup.object().shape({
  days: Yup.number().required('Day is Required'),
  date: Yup.date().required('Date is Required'),
  color: Yup.string(),
  logo: Yup.mixed(),
  image: Yup.mixed()
});

function EventScheduleTableForm(props) {
  const { data } = props;

  const { date, numberOfDays, logo, featured_image, primary_color } = data;

  const [featured_logo, setLogo] = React.useState();
  const [image, setImage] = React.useState();
  const [colorName, setColorName] = React.useState(data && primary_color ? primary_color : null);
  const [loader, setLoader] = React.useState(false);

  React.useEffect(() => {
    var color_picker = document.getElementById('color-picker');
    var color_picker_wrapper = document.getElementById('color-picker-wrapper');
    color_picker.onChange = function () {
      color_picker_wrapper.style.backgroundColor = color_picker.value;
    };
    color_picker_wrapper.style.backgroundColor = color_picker.value;
  }, [colorName, props]);

  React.useEffect(() => {
    data && data.primary_color && primary_color ? setColorName(primary_color) : null;
    data && data.logo && logo ? setLogo(logo) : '';
    data && data.featured_image && featured_image ? setImage(featured_image) : '';
  }, [props]);

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  async function handleChangeImage(e) {
    setLoader(true);
    setImage(URL.createObjectURL(e.target.files[0]));
    let base64 = await convertBase64(e.target.files[0]);
    base64 = base64.split(',')[1];
    const imageObj = {
      name: e.target.files[0].name,
      contentType: e.target.files[0].type,
      file: base64
    };
    console.log('imageObj', imageObj);
    const data = await props.imageUpload(imageObj);
    setImage(data.url);
    setLoader(false);
  }

  async function handleChangeLogo(e) {
    setLoader(true);
    setLogo(URL.createObjectURL(e.target.files[0]));
    let base64 = await convertBase64(e.target.files[0]);
    base64 = base64.split(',')[1];
    const imageObj = {
      name: e.target.files[0].name,
      contentType: e.target.files[0].type,
      file: base64
    };
    const data = await props.imageUpload(imageObj);
    console.log('login data logo :::', data);
    setLogo(data.url);
    setLoader(false);
  }

  const saveChanges = async (values) => {
    values.spree = props.spree.id;
    await props.eventScheduleSaveChanges(values);
  };

  return (
    <div
      style={{
        width: '100%',
        background: '#fff',
        borderRadius: '10px',
        boxShadow: '3px 3px 8px rgba(0,0,0,0.1)',
        padding: '7% 10%',
        marginTop: '4.3rem'
      }}>
      <Formik
        enableReinitialize
        initialValues={{
          date: data && date ? moment(date).format('yyyy-MM-DD') : '',
          days: data && numberOfDays ? numberOfDays : '',
          logo: data && logo ? logo : '',
          image: data && featured_image ? featured_image : '',
          color: data && primary_color ? primary_color : '#000000'
        }}
        validationSchema={saveChangesvalidation}
        onSubmit={(values) => {
          values.spree = props.spree.id;
          values.logo = featured_logo;
          values.image = image;
          saveChanges(values);
        }}>
        {({ values, handleChange, handleSubmit, isSubmitting, errors, touched, handleBlur }) => (
          <Form onSubmit={handleSubmit}>
            <Row className={`${classes.newEventScheduleFormRow} ${classes.marginBottom}`}>
              <Form.Group>
                <Col xl={12}>
                  <Form.Label className={classes.newEventFormLabel}>StartDate*</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    value={values.date}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                    className={classes.newEventFormInput}
                  />
                  {errors.date && touched.date && (
                    <div style={{ color: 'red' }}>{errors.date} </div>
                  )}
                </Col>
              </Form.Group>
            </Row>

            <Row className={`${classes.newEventScheduleFormRow} ${classes.marginBottom}`}>
              <Form.Group>
                <Col xl={12}>
                  <Form.Label className={classes.newEventFormLabel}>Number for Days*</Form.Label>
                  <Form.Control
                    type="number"
                    name="days"
                    value={values.days}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                    className={classes.newEventFormInput}
                  />
                  {errors.days && touched.days && (
                    <div style={{ color: 'red' }}>{errors.days} </div>
                  )}
                </Col>
              </Form.Group>
            </Row>

            <Row className={`${classes.newEventScheduleFormRow} ${classes.marginBottom}`}>
              <Form.Group>
                <Col xl={12}>
                  <Form.Label className={classes.newEventFormLabel}>Featured Logo*</Form.Label>
                  <label htmlFor="inputLogoTag" className={classes.labelFile}>
                    <p className={classes.selectedFile}>
                      <span className="googleSpan">
                        <img
                          src={featured_logo === undefined ? uploadImg : featured_logo}
                          alt=""
                          style={{
                            maxWidth: featured_logo !== undefined && '95%',
                            maxHeight: featured_logo !== undefined && '100px'
                          }}
                        />
                      </span>
                    </p>
                    <input
                      id="inputLogoTag"
                      type="file"
                      onChange={handleChangeLogo}
                      className={classes.inputFile}
                    />
                  </label>
                </Col>
              </Form.Group>
            </Row>

            <Row className={`${classes.newEventScheduleFormRow} ${classes.marginBottom}`}>
              <Form.Group>
                <Col xl={12}>
                  <Form.Label className={classes.newEventFormLabel}>Banner Image*</Form.Label>
                  <label htmlFor="inputImageTag" className={classes.labelFile}>
                    <p className={classes.selectedFile}>
                      <span className="googleSpan">
                        <img
                          src={image === undefined ? uploadImg : image}
                          alt=""
                          style={{
                            maxWidth: image !== undefined && '95%',
                            maxHeight: image !== undefined && '100px'
                          }}
                        />
                      </span>
                    </p>
                    <input
                      id="inputImageTag"
                      type="file"
                      onChange={handleChangeImage}
                      className={classes.inputFile}
                    />
                  </label>
                </Col>
              </Form.Group>
            </Row>

            <Row className={`${classes.newEventScheduleFormRow}`} style={{ marginBottom: '4rem' }}>
              <Form.Group>
                <Col xl={12}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Form.Label
                      className={classes.newEventFormLabel}
                      style={{ marginBottom: '10rem', paddingBottom: '10%' }}>
                      Background Color*
                    </Form.Label>

                    <div className={classes.colorPickerContainer}>
                      <div
                        id="color-picker-wrapper"
                        style={{
                          width: '2rem',
                          height: '2rem',
                          borderRadius: '50%',
                          marginRight: '1rem',
                          zIndex: '10'
                        }}>
                        <Form.Control
                          type="color"
                          name="color"
                          id="color-picker"
                          value={
                            colorName === null
                              ? (values.color = '#000000')
                              : (values.color = colorName)
                          }
                          onChange={(e) => setColorName(e.target.value)}
                          onBlur={handleBlur}
                        />
                      </div>
                      <span className={classes.colorNameText}>
                        {colorName === null ? '#000000' : colorName}
                      </span>
                    </div>
                  </div>
                  {errors.color && touched.color && (
                    <div style={{ color: 'red' }}>{errors.color} </div>
                  )}
                </Col>
              </Form.Group>
            </Row>

            <Grid item xs={12} sm={12} align="center">
              <Button
                type="submit"
                variant="contained"
                disabled={loader && true}
                sx={{
                  backgroundColor: 'black',
                  width: '100%',
                  fontFamily: 'Magdelin-Bold',
                  fontSize: '16px',
                  borderRadius: '10px'
                }}>
                save changes
              </Button>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
}

function mapStateToProps(state) {
  return { spree: state && state.spree !== undefined && state.spree[0] ? state.spree[0] : null };
}

export default connect(mapStateToProps, { imageUpload, getEvent, eventScheduleSaveChanges })(
  EventScheduleTableForm
);
