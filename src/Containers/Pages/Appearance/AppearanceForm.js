import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { editAppearance } from '../../../Services/Appearance';
import { connect } from 'react-redux';
import classes from '../css/Appearance.module.css';
import { Form, Row, Col } from 'react-bootstrap';
import uploadImg from '../../../Assets/Images/image.svg';
import { imageUpload } from '../../../Services/ImageUploadServices';

const appearanceFormValidationSchema = Yup.object().shape({
  logo: Yup.mixed(),
  secondary_logo: Yup.mixed(),
  featured_image: Yup.mixed(),
  primary_color: Yup.string(),
  secondary_color: Yup.string(),
  background_color: Yup.string(),
  opacity: Yup.number()
});

function AppearanceForm(props) {
  const [loader, setLoader] = React.useState(false);

  const [logo, setLogo] = React.useState();
  const [secondary_logo, setSecondaryLogo] = React.useState();
  const [featured_image, setFeaturedImage] = React.useState();
  const [primary_color, setPrimary_color] = React.useState(null);
  const [secondary_color, setSecondaryColor] = React.useState(null);
  const [background_color, setBackgroundColor] = React.useState(null);

  React.useEffect(() => {
    if (props && props.spree) {
      props.spree.primary_color ? setPrimary_color(props.spree.primary_color) : '';
      props.spree.secondary_color ? setSecondaryColor(props.spree.secondary_color) : '';
      props.spree.background_color ? setBackgroundColor(props.spree.background_color) : '';
      props.spree.logo ? setLogo(props.spree.logo) : '';
      props.spree.secondary_logo ? setSecondaryLogo(props.spree.secondary_logo) : '';
      props.spree.featured_image ? setFeaturedImage(props.spree.featured_image) : '';
    }
  }, [props]);

  React.useEffect(() => {
    var color_picker = document.getElementById('color-picker');
    var color_picker_wrapper = document.getElementById('color-picker-wrapper-primary');
    color_picker.onChange = function () {
      color_picker_wrapper.style.backgroundColor = color_picker.value;
    };
    color_picker_wrapper.style.backgroundColor = color_picker.value;
  }, [primary_color]);

  React.useEffect(() => {
    var color_picker = document.getElementById('color-picker-secondary');
    var color_picker_wrapper = document.getElementById('color-picker-wrapper-secondary');
    color_picker.onChange = function () {
      color_picker_wrapper.style.backgroundColor = color_picker.value;
    };
    color_picker_wrapper.style.backgroundColor = color_picker.value;
  }, [secondary_color]);

  React.useEffect(() => {
    var color_picker = document.getElementById('color-picker-background');
    var color_picker_wrapper = document.getElementById('color-picker-wrapper-background');
    color_picker.onChange = function () {
      color_picker_wrapper.style.backgroundColor = color_picker.value;
    };
    color_picker_wrapper.style.backgroundColor = color_picker.value;
  }, [background_color]);

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

  async function handleChangeFeaturedImage(e) {
    setLoader(true);
    setFeaturedImage(URL.createObjectURL(e.target.files[0]));
    let base64 = await convertBase64(e.target.files[0]);
    base64 = base64.split(',')[1];
    const imageObj = {
      name: e.target.files[0].name,
      contentType: e.target.files[0].type,
      file: base64
    };
    const data = await props.imageUpload(imageObj);
    console.log('handleChangeImage logo :::', data);
    setFeaturedImage(data.url);
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
    console.log('handleChangeLogo logo :::', data);
    setLogo(data.url);
    setLoader(false);
  }

  async function handleChangeSecondaryLogo(e) {
    setLoader(true);
    setSecondaryLogo(URL.createObjectURL(e.target.files[0]));
    let base64 = await convertBase64(e.target.files[0]);
    base64 = base64.split(',')[1];
    const imageObj = {
      name: e.target.files[0].name,
      contentType: e.target.files[0].type,
      file: base64
    };
    const data = await props.imageUpload(imageObj);
    console.log('handleChangeLogo logo :::', data);
    setSecondaryLogo(data.url);
    setLoader(false);
  }

  const editAppearance = async (values) => {
    await props.editAppearance(values);
  };

  return (
    <div className={classes.appearanceContainer}>
      <Formik
        enableReinitialize
        initialValues={{
          logo: logo ? logo : null,
          secondary_logo: secondary_logo ? secondary_logo : null,
          featured_image: featured_image ? featured_image : null,
          primary_color: primary_color ? primary_color : '',
          secondary_color: secondary_color ? secondary_color : '',
          background_color: background_color ? background_color : '',
          opacity: props && props.spree && props.spree.opacity ? props.spree.opacity : 100
        }}
        validationSchema={appearanceFormValidationSchema}
        onSubmit={(values) => {
          values.id = props.spree.id;
          values.name = props.spree.name;
          values.address = props.spree.address;
          values.website = props.spree.website;
          values.aboutUs = props.spree.aboutUs;
          values.partnerName = props.spree.partnerName;
          values.stamp_value = props.spree.stamp_value;
          values.caratId = props.spree.caratId;
          values.latitude = props.spree.latitude;
          values.longitude = props.spree.longitude;

          editAppearance(values);
        }}>
        {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) => (
          <Form
            onSubmit={handleSubmit}
            role="form"
            className={classes.appearanceFormContainer}
            style={{ width: '100%', display: 'flex' }}>
            <div style={{ display: 'flex', width: '100%' }}>
              <div style={{ width: '100%' }} className={classes.newAppearanceForm}>
                <Form.Group>
                  <Row className={classes.newAppearanceFormRow}>
                    <Col xl={3}>
                      <Form.Label className={classes.newAppearanceFormLabel}>
                        Event Logo* (Will appear on dark backgrounds)
                      </Form.Label>
                      <label
                        htmlFor="inputLogoTag"
                        className={classes.labelFile}
                        style={{ width: '100%' }}>
                        <p className={classes.selectedFile}>
                          <span className="googleSpan">
                            <img
                              src={logo === undefined ? uploadImg : logo}
                              alt=""
                              style={{
                                maxWidth: logo !== undefined && '95%',
                                maxHeight: logo !== undefined && '100px'
                              }}
                            />
                          </span>
                        </p>
                        <input
                          name="logo"
                          id="inputLogoTag"
                          type="file"
                          onChange={handleChangeLogo}
                          className={classes.inputFile}
                        />
                      </label>
                    </Col>

                    <Col xl={3}>
                      <Form.Label
                        className={classes.newAppearanceFormLabel}
                        style={{ width: '386px' }}>
                        Secondary Event Logo* (Will appear on white backgrounds)
                      </Form.Label>
                      <label
                        htmlFor="input-secondary-logo"
                        className={classes.labelFile}
                        style={{ width: '100%' }}>
                        <p className={classes.selectedFile}>
                          <span className="googleSpan">
                            <img
                              src={secondary_logo === undefined ? uploadImg : secondary_logo}
                              alt=""
                              style={{
                                maxWidth: secondary_logo !== undefined && '95%',
                                maxHeight: secondary_logo !== undefined && '100px'
                              }}
                            />
                          </span>
                        </p>
                        <input
                          name="secondarylogo"
                          id="input-secondary-logo"
                          type="file"
                          onChange={handleChangeSecondaryLogo}
                          className={classes.inputFile}
                        />
                      </label>
                    </Col>
                  </Row>
                  <Row className={classes.newAppearanceFormRow}>
                    <Col xl={6}>
                      <Form.Label className={classes.newAppearanceFormLabel}>
                        Background Image (Will appear behind Home & Login Screens)
                      </Form.Label>
                      <label
                        htmlFor="input-featured-image"
                        className={classes.labelFile}
                        style={{ width: '100%' }}>
                        <p className={classes.selectedFile}>
                          <span className="googleSpan">
                            <img
                              src={featured_image === undefined ? uploadImg : featured_image}
                              alt=""
                              style={{
                                maxWidth: featured_image !== undefined && '95%',
                                maxHeight: featured_image !== undefined && '100px'
                              }}
                            />
                          </span>
                        </p>
                        <input
                          name="bannerImage"
                          id="input-featured-image"
                          type="file"
                          onChange={handleChangeFeaturedImage}
                          className={classes.inputFile}
                        />
                      </label>
                    </Col>
                  </Row>

                  <Row className={`${classes.newAppearanceFormRow}`}>
                    <Form.Group style={{ display: 'flex' }}>
                      <Col xl={2}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <Form.Label className={classes.newAppearanceFormLabel}>
                            Primary Color
                          </Form.Label>

                          <div className={classes.colorPickerContainer}>
                            <div
                              id="color-picker-wrapper-primary"
                              style={{
                                width: '2rem',
                                height: '2rem',
                                borderRadius: '50%',
                                marginRight: '1rem',
                                zIndex: '10'
                              }}>
                              <Form.Control
                                type="color"
                                name="primary_color"
                                id="color-picker"
                                value={
                                  primary_color === null
                                    ? (values.primary_color = '#121212')
                                    : (values.primary_color = primary_color)
                                }
                                onChange={(e) => setPrimary_color(e.target.value)}
                              />
                            </div>
                            <span className={classes.colorNameText}>
                              {primary_color === null ? '#121212' : primary_color}
                            </span>
                          </div>
                        </div>
                        {errors.color && touched.color && (
                          <div style={{ color: 'red' }}>{errors.color} </div>
                        )}
                      </Col>
                      <Col xl={2}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <Form.Label className={classes.newAppearanceFormLabel}>
                            Secondary Color
                          </Form.Label>

                          <div className={classes.colorPickerContainer}>
                            <div
                              id="color-picker-wrapper-secondary"
                              style={{
                                width: '2rem',
                                height: '2rem',
                                borderRadius: '50%',
                                marginRight: '1rem'
                              }}>
                              <Form.Control
                                type="color"
                                name="secondaryColor"
                                id="color-picker-secondary"
                                value={
                                  secondary_color === null
                                    ? (values.secondary_color = '#121212')
                                    : (values.secondary_color = secondary_color)
                                }
                                onChange={(e) => setSecondaryColor(e.target.value)}
                              />
                            </div>
                            <span className={classes.colorNameText}>
                              {secondary_color === null ? '#121212' : secondary_color}
                            </span>
                          </div>
                        </div>
                        {errors.color && touched.color && (
                          <div style={{ color: 'red' }}>{errors.color} </div>
                        )}
                        <div
                          style={{
                            color: '#121212',
                            fontFamily: 'Magdelin-Medium',
                            fontSize: '14px',
                            fontWeight: '100'
                          }}>
                          Darker Color Recommended.
                        </div>
                      </Col>
                    </Form.Group>
                  </Row>

                  <Row className={`${classes.newAppearanceFormRow}`}>
                    <Form.Group style={{ display: 'flex' }}>
                      <Col xl={2}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <Form.Label className={classes.newAppearanceFormLabel}>
                            Background Color
                          </Form.Label>

                          <div className={classes.colorPickerContainer}>
                            <div
                              id="color-picker-wrapper-background"
                              style={{
                                width: '2rem',
                                height: '2rem',
                                borderRadius: '50%',
                                marginRight: '1rem',
                                zIndex: '10'
                              }}>
                              <Form.Control
                                type="color"
                                name="background_color"
                                id="color-picker-background"
                                value={
                                  background_color === null
                                    ? (values.background_color = '#121212')
                                    : (values.background_color = background_color)
                                }
                                onChange={(e) => setBackgroundColor(e.target.value)}
                              />
                            </div>
                            <span className={classes.colorNameText}>
                              {background_color === null ? '#121212' : background_color}
                            </span>
                          </div>
                        </div>
                        {errors.color && touched.color && (
                          <div style={{ color: 'red' }}>{errors.color} </div>
                        )}
                        <div
                          style={{
                            color: '#121212',
                            fontFamily: 'Magdelin-Medium',
                            fontSize: '14px',
                            fontWeight: '100'
                          }}>
                          Recommended for busy Images.
                        </div>
                      </Col>

                      <Col xl={2}>
                        <Form.Label className={classes.newAppearanceFormLabel}>
                          Background Color Opacity
                        </Form.Label>
                        <Form.Control
                          type="number"
                          min="0"
                          max="100"
                          value={values.opacity}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="opacity"
                          className={classes.newAppearanceFormInput}
                        />
                        {errors.opacity && touched.opacity && (
                          <div style={{ color: 'red' }}>{errors.opacity} </div>
                        )}
                        <div
                          style={{
                            color: '#121212',
                            fontFamily: 'Magdelin-Medium',
                            fontSize: '14px',
                            fontWeight: '100'
                          }}>
                          100% is full color.
                        </div>
                      </Col>
                    </Form.Group>
                  </Row>
                </Form.Group>

                <Row className={`${classes.newSettingsFormRow}`}>
                  <Col xl={12}>
                    <div style={{ display: 'flex', justifyContent: 'end' }}>
                      <button
                        type="submit"
                        className={`${classes.saveChangeBtn}`}
                        disabled={loader && true}>
                        Save Changes
                      </button>
                      <button className={`${classes.customizeBtn}`} type="button">
                        Change Information
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

export default connect(mapStateToProps, { editAppearance, imageUpload })(AppearanceForm);
