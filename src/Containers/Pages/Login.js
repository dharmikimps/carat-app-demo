import React from 'react';
import './Login.css';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import FormControl from '@mui/material/FormControl';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Header from '../../Components/Header';
import logo from '../../Assets/Images/logo.svg';
import google from '../../Assets/Images/google-icon.svg';
import apple from '../../Assets/Images/apple-icon.svg';
import { useNavigate } from 'react-router';
import { connect } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import { loginAuth } from '../../Services/AuthServices';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import { client_id } from '../../env/config';
import AppleSignin from 'react-apple-signin-auth';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3)
  },
  '& .MuiInputBase-input': {
    borderRadius: 8,
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
    border: '1px solid #707070',
    fontSize: 16,
    width: '100%',
    transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow']),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(','),
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main
    }
  }
}));

function Login(props) {
  let navigate = useNavigate();
  const [passwordShow, setPasswordShow] = React.useState(false);
  const signInvalidation = Yup.object().shape({
    password: Yup.string().required('This field is Required'),
    email: Yup.string().email('Invalid email').required('This field is Required')
  });

  const route = () => {
    navigate('/forgot-password');
  };

  React.useEffect(() => {
    gapi.load(`client:auth2`, () => {
      gapi.client.init({
        clientId: client_id
      });
    });
  }, []);

  const onSuccess = async (res) => {
    console.log('response  =====...', res);
    let payload;
    if (res.googleId) {
      payload = { accessToken: res.accessToken, loginType: 'google' };
    } else if (res && res.email && res.password) {
      payload = { username: res.email, password: res.password, loginType: 'web' };
    } else {
      payload = {
        accessToken: res.identityToken,
        loginType: 'apple',
        firstName: res?.fullName?.givenName,
        lastName: res?.fullName?.familyName
      };
    }
    const data = await props.loginAuth(payload);
    if (data) {
      navigate('/dashboard');
      localStorage.setItem('isAuthenticated', data.token);
      localStorage.setItem('user', JSON.stringify(data));
      window.location.reload(false);
    }
  };

  const onLoginFailure = (res) => {
    console.log('Login Failed:', res);
  };

  const customStyle = {
    width: '100%',
    padding: '5px 0',
    border: '1px solid #707070',
    borderRadius: '10px',
    backgroundColor: 'transparent',
    fontFamily: 'Magdelin-Bold',
    fontSize: '16px'
  };

  const customStyleApple = {
    width: '100%',
    padding: '5px 0',
    border: '1px solid #000',
    borderRadius: '10px',
    backgroundColor: '#000',
    color: '#fff',
    fontFamily: 'Magdelin-Bold',
    fontSize: '16px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '40px'
  };

  return (
    <div className="main">
      <Header />
      <Container
        maxWidth="sm"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '-65px',
          height: '100vh'
        }}>
        <div className="container-child">
          <img src={logo} className="logo-img" />
          <Typography sx={{ fontFamily: 'Magdelin-Black', fontSize: '32px', color: '#121212' }}>
            Carat Apps
          </Typography>
          <Typography sx={{ fontFamily: 'Magdelin-Medium', fontSize: '20px', color: '#121212' }}>
            Destination Dashboard
          </Typography>
        </div>
        <Grid
          sx={{
            borderRadius: '10px',
            p: 2,
            boxShadow: 5,
            backgroundColor: 'white',
            marginTop: '8%'
          }}>
          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            validationSchema={signInvalidation}
            onSubmit={(values) => {
              onSuccess(values);
            }}>
            {({ values, handleChange, errors, touched }) => (
              <Form>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12} sx={{ paddingTop: '40px' }}>
                    <FormControl variant="standard" fullWidth>
                      <Typography
                        htmlFor="bootstrap-input"
                        sx={{
                          color: '#121212',
                          fontFamily: 'Magdelin-Bold',
                          fontSize: '16px'
                        }}>
                        Email or Username
                      </Typography>
                      <BootstrapInput
                        id="bootstrap-input"
                        name="email"
                        label="email"
                        value={values.email}
                        onChange={handleChange}
                      />
                    </FormControl>
                    {errors.email && touched.email && <div className="error">{errors.email}</div>}
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                    style={{ paddingTop: '10px' }}>
                    <Typography variant="standard"></Typography>
                    <Typography
                      variant="caption"
                      onClick={route}
                      sx={{
                        color: '#121212',
                        fontFamily: 'Magdelin-Medium',
                        fontSize: '16px',
                        cursor: 'pointer'
                      }}>
                      Forgot Password?
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} style={{ paddingTop: '0px' }}>
                    <FormControl variant="standard" fullWidth>
                      <Typography
                        htmlFor="bootstrap-input-password"
                        sx={{
                          color: '#121212',
                          fontFamily: 'Magdelin-Bold',
                          fontSize: '16px'
                        }}>
                        Password
                      </Typography>
                      <div>
                        <BootstrapInput
                          id="bootstrap-input-password"
                          name="password"
                          label="password"
                          type={passwordShow ? 'text' : 'password'}
                          value={values.password}
                          sx={{ '& label': { padding: '0px 10px' }, width: '100%' }}
                          onChange={handleChange}
                        />
                        <IconButton
                          onClick={() => setPasswordShow(!passwordShow)}
                          style={{ position: 'absolute', right: '0', padding: '5px' }}>
                          {passwordShow ? <VisibilityOffRoundedIcon /> : <VisibilityRoundedIcon />}
                        </IconButton>
                      </div>
                    </FormControl>

                    {errors.password && touched.password && (
                      <div className="error">{errors.password}</div>
                    )}
                  </Grid>

                  <Grid item xs={12} sm={12} align="center">
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        backgroundColor: 'black',
                        width: '100%',
                        fontFamily: 'Magdelin-Bold',
                        fontSize: '16px',
                        borderRadius: '10px'
                      }}>
                      Log in
                    </Button>
                  </Grid>
                </Grid>
                <div style={{ width: '100%', textAlign: 'center', margin: '3% 0' }}>OR</div>

                <Grid
                  item
                  xs={12}
                  sm={12}
                  align="center"
                  style={{ width: '100%', marginBottom: '3%' }}>
                  <GoogleLogin
                    clientId={client_id}
                    buttonText="Sign In with Google"
                    onSuccess={onSuccess}
                    onFailure={onLoginFailure}
                    cookiePolicy={'single_host_origin'}
                    render={(renderProps) => (
                      <button
                        onClick={renderProps.onClick}
                        style={customStyle}
                        className="google-signin-btn">
                        <img style={{ marginRight: '1rem' }} src={google} /> Sign in with Google
                      </button>
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={12} align="center" style={{ width: '100%' }}>
                  <AppleSignin
                    authOptions={{
                      clientId: 'io.caratapp.caratapp.client',
                      scope: 'email name',
                      redirectURI: 'https://carat-admin-stage.herokuapp.com/login',
                      state: 'state',
                      nonce: 'nonce',
                      usePopup: true
                    }}
                    uiType="dark"
                    className="apple-auth-btn"
                    buttonExtraChildren="Continue with Apple"
                    onSuccess={(response) => {
                      onSuccess(response);
                    }}
                    onError={(error) => console.log('error', error)}
                    skipScript={false}
                    render={(props) => (
                      <button {...props} style={customStyleApple} className="apple-signin">
                        <img style={{ marginRight: '1rem' }} src={apple} /> Sign in with Apple
                      </button>
                    )}
                  />
                </Grid>
              </Form>
            )}
          </Formik>
        </Grid>
      </Container>
    </div>
  );
}

function mapStateToProps(state) {
  return { todos: state.spree };
}

export default connect(mapStateToProps, { loginAuth })(Login);
