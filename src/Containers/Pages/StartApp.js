import React from 'react';
import './Login.css';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Header from '../../Components/Header';
import logo from '../../Assets/Images/logo.svg';
import { useParams } from 'react-router-dom';

function StartApp() {
  let { id } = useParams();

  React.useEffect(() => {
    var app = {
      launchApp: function () {
        let url;
        let platform = window.navigator.platform.toLowerCase();
        if (platform.includes('iphone')) {
          url = `https://apps.apple.com/us/app/carat-app/id1617485674`;
        } else {
          url = 'https://play.google.com/store/apps/details?id=io.caratapp.caratapp';
        }
        setTimeout(() => {
          window.location.replace(url);
        }, 50);
        window.location.replace(`caratapp:${id}`);
      }
    };

    app.launchApp();
  }, []);

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
        </div>
      </Container>
    </div>
  );
}
export default StartApp;
