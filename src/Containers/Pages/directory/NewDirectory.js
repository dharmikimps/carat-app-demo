import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import classes from '../EventSchedule.module.css';
import back from '../../../Assets/Images/back.svg';
import { Form, Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import uploadImg from '../../../Assets/Images/image.svg';
import { imageUpload } from '../../../Services/ImageUploadServices';
import { createNewDirectory, editDirectory, deleteDirectory } from '../../../Services/Directory';
import { connect } from 'react-redux';
import { directoryOptionsStyles } from '../../../Assets/styles/OptionStyle';
import moment from 'moment';
import { useNavigate, useLocation } from 'react-router';
import DeleteModal from '../../../Components/DeleteModal';

function NewDirectory(props) {
  const [active, setActive] = React.useState({ label: 'true', value: true });
  const [hidden, setHidden] = React.useState({ label: 'false', value: false });
  const [loader, setLoader] = React.useState(false);
  const [image, setImage] = React.useState();
  const [logo, setLogo] = React.useState();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const { state } = useLocation();
  let navigate = useNavigate();

  const directoryvalidation = Yup.object().shape({
    dirName: Yup.string().required('Directory Name is Required'),
    dirCategory: Yup.string().required('Directory Category is Required'),
    dirTagline: Yup.string(),
    dirDescription: Yup.string().required('Directory Description is Required'),
    bannerImage: Yup.mixed(),
    logo: Yup.mixed(),
    caratValue: Yup.number(),
    website: Yup.string().url('Please Enter a Valid URL')
  });

  React.useEffect(() => {
    state && state.active && setActive({ label: state.active.toString(), value: state.active });
    state && state.hidden && setHidden({ label: state.hidden.toString(), value: state.hidden });
    state && state.featured_image && setImage(state.featured_image);
    state && state.logo && setLogo(state.logo);
  }, []);

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
    const data = await props.imageUpload(imageObj);
    console.log('handleChangeImage logo :::', data);
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
    console.log('handleChangeLogo logo :::', data);
    setLogo(data.url);
    setLoader(false);
  }

  const saveDirectory = async (values) => {
    values.spree = props.spree.id;
    const data = await props.createNewDirectory(values);
    console.log('saveDirectory data :::', data);
    navigate('/directory');
  };

  const editDirectory = async (values) => {
    values.spree = props.spree.id;
    const data = await props.editDirectory(values);
    console.log('editDirectory data :::', data);
    navigate('/directory');
  };

  const deleteDirectoryData = async () => {
    const id = state.id;
    await props.deleteDirectory(id);
    navigate('/directory');
  };

  return (
    <div className={classes.newEventScheduleContainer}>
      <div>
        <Link to="/directory">
          <img src={back} alt="Back Button" />
        </Link>
        <h1> {state ? 'Edit Shop' : 'Create New Shop'}</h1>
      </div>
      <Formik
        initialValues={{
          dirName: state && state.name ? state.name : '',
          dirCategory: state && state.category ? state.category : '',
          dirTagline: state && state.tagline ? state.tagline : '',
          dirDescription: state && state.description ? state.description : '',
          bannerImage: state && state.featured_image ? state.featured_image : '',
          logo: state && state.logo ? state.logo : '',
          caratValue: state && state.value ? state.value : 0,
          active: state && state.active ? state.active : true,
          hidden: state && state.hidden ? state.hidden : false,
          website: state && state.website ? state.website : ''
        }}
        validationSchema={directoryvalidation}
        onSubmit={(values) => {
          values.active = active.value;
          values.hidden = hidden.value;
          if (logo || image) {
            values.logo = logo;
            values.bannerImage = image;
          }
          if (state && state.createdAt && state.updatedAt) {
            values.id = state.id;
            editDirectory(values);
          } else {
            saveDirectory(values);
          }
        }}>
        {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) => (
          <Form
            onSubmit={handleSubmit}
            role="form"
            className={classes.newEventScheduleFormsContainer}
            style={{ width: '100%', display: 'flex' }}>
            <div style={{ display: 'flex', width: '100%' }}>
              <div style={{ width: '72%' }} className={classes.newEventScheduleForm}>
                <Form.Group>
                  <Row className={classes.newEventScheduleFormRow}>
                    <Col xl={7}>
                      <Form.Label className={classes.newEventFormLabel}>Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={values.dirName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="dirName"
                        className={classes.newEventFormInput}
                      />
                      {errors.dirName && touched.dirName && (
                        <div style={{ color: 'red' }}>{errors.dirName} </div>
                      )}
                    </Col>

                    <Col xl={5}>
                      <Form.Label className={classes.newEventFormLabel}>Category</Form.Label>
                      <Form.Control
                        type="text"
                        name="dirCategory"
                        value={values.dirCategory}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={classes.newEventFormInput}
                      />
                      {errors.dirCategory && touched.dirCategory && (
                        <div style={{ color: 'red' }}>{errors.dirCategory} </div>
                      )}
                    </Col>
                  </Row>
                </Form.Group>

                <Row className={classes.newEventScheduleFormRow}>
                  <Form.Group>
                    <Col xl={12}>
                      <Form.Label className={classes.newEventFormLabel}>Tagline</Form.Label>
                      <Form.Control
                        as="textarea"
                        name="dirTagline"
                        value={values.dirTagline}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        rows="4"
                        style={{ resize: 'none' }}
                        className={classes.newEventFormInput}
                      />
                      {errors.dirTagline && touched.dirTagline && (
                        <div style={{ color: 'red' }}>{errors.dirTagline} </div>
                      )}
                    </Col>
                  </Form.Group>
                </Row>
                <Row className={classes.newEventScheduleFormRow}>
                  <Form.Group>
                    <Col xl={12}>
                      <Form.Label className={classes.newEventFormLabel}>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        name="dirDescription"
                        value={values.dirDescription}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        rows="4"
                        style={{ resize: 'none' }}
                        className={classes.newEventFormInput}
                      />
                      {errors.dirDescription && touched.dirDescription && (
                        <div style={{ color: 'red' }}>{errors.dirDescription} </div>
                      )}
                    </Col>
                  </Form.Group>
                </Row>

                <Form.Group>
                  <Row className={classes.newEventScheduleFormRow}>
                    <Col xl={7}>
                      <Form.Label className={classes.newEventFormLabel}>Banner Image</Form.Label>
                      <label
                        htmlFor="inputImageTag"
                        className={classes.labelFile}
                        style={{ width: '100%' }}>
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
                          name="bannerImage"
                          id="inputImageTag"
                          type="file"
                          onChange={handleChangeImage}
                          className={classes.inputFile}
                        />
                      </label>
                    </Col>

                    <Col xl={5}>
                      <Form.Label className={classes.newEventFormLabel}>Logo</Form.Label>
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
                  </Row>
                </Form.Group>

                <Row style={{ width: '102%' }}>
                  <div style={{ width: '12%' }}>
                    <Form.Label className={classes.newEventFormLabel}>Carat Value</Form.Label>
                    <Form.Control
                      type="number"
                      value={values.caratValue}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="caratValue"
                      className={classes.newEventFormInput}
                    />
                    {errors.caratValue && touched.caratValue && (
                      <div style={{ color: 'red' }}>{errors.caratValue} </div>
                    )}
                  </div>

                  <div style={{ width: '12%' }}>
                    <Form.Label className={classes.newEventFormLabel}>Active</Form.Label>

                    <Select
                      options={[
                        { label: 'true', value: true },
                        { label: 'false', value: false }
                      ]}
                      styles={directoryOptionsStyles}
                      defaultValue={(values.active = active)}
                      onChange={(val) => setActive(val)}
                      value={(values.active = active)}
                    />
                    {errors.active && touched.active && (
                      <div style={{ color: 'red' }}>{errors.active} </div>
                    )}
                  </div>

                  <div style={{ width: '12%' }}>
                    <Form.Label className={classes.newEventFormLabel}>Hidden</Form.Label>
                    <Select
                      options={[
                        { label: 'true', value: true },
                        { label: 'false', value: false }
                      ]}
                      styles={directoryOptionsStyles}
                      defaultValue={(values.hidden = hidden)}
                      onChange={(val) => setHidden(val)}
                      value={(values.hidden = hidden)}
                    />
                    {errors.hidden && touched.hidden && (
                      <div style={{ color: 'red' }}>{errors.hidden} </div>
                    )}
                  </div>

                  <div style={{ width: '64%' }}>
                    <Form.Label className={classes.newEventFormLabel}>Learn More Link</Form.Label>
                    <Form.Control
                      type="url"
                      name="website"
                      value={values.website}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      rows="4"
                      style={{ resize: 'none' }}
                      className={classes.newEventFormInput}
                    />
                    {errors.website && touched.website && (
                      <div style={{ color: 'red' }}>{errors.website} </div>
                    )}
                    <div
                      style={{
                        color: '#121212',
                        fontFamily: 'Magdelin-Medium',
                        fontSize: '14px'
                      }}>
                      Usually link to website, social media, etc... COMPLETE URL ONLY
                    </div>
                  </div>
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
                    disabled={loader && true}>
                    {state && state.createdAt && state.updatedAt ? 'Update' : 'Save'}
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
        delete={deleteDirectoryData}
      />
    </div>
  );
}

function mapStateToProps(state) {
  return { spree: state && state.spree !== undefined && state.spree[0] ? state.spree[0] : null };
}

export default connect(mapStateToProps, {
  imageUpload,
  createNewDirectory,
  editDirectory,
  deleteDirectory
})(NewDirectory);
