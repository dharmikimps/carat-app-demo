import React from 'react';

import { Routes, Route, Navigate } from 'react-router-dom';
import PageLayout from './PageLayout';
import Login from './Containers/Pages/Login';
import ForgotPassword from './Containers/Pages/ForgotPassword';
import Dashboard from './Containers/Pages/Dashboard';
import Information from './Containers/Pages/Information';
import Appearance from './Containers/Pages/Appearance';
import Directory from './Containers/Pages/Directory';
import EventSchedule from './Containers/Pages/EventSchedule';
import Messages from './Containers/Pages/Messages';
import Rewards from './Containers/Pages/Rewards';
import Leaderboards from './Containers/Pages/Leaderboards';
import NewAndEditEvent from './Containers/Pages/EventSchedule/NewAndEditEvent';
import NewDirectory from './Containers/Pages/directory/NewDirectory';
import NewMessage from './Containers/Pages/Message/NewMessage';
import EditPrize from './Containers/Pages/Rewards/EditPrize';
import Settings from './Containers/Pages/Settings';
import StartApp from './Containers/Pages/StartApp';
import { connect } from 'react-redux';
import { getAdminData } from './Services/AuthServices';
import axios from 'axios';

// Authorize
import { useAppContext } from './Lib/ContextLib';
import ProfileSettings from './Containers/Pages/Settings/ProfileSettings';
import SettingOverview from './Containers/Pages/Settings/SettingOverview';

function Routers(props) {
  const { isAuthenticated, setAuthenticated } = useAppContext();
  const [ProfileData, setProfileData] = React.useState([]);

  React.useEffect(() => {
    const token = localStorage.getItem('isAuthenticated');
    setAuthenticated(token);
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    if (token) {
      loadData();
    }
  }, []);

  const loadData = async () => {
    const data = await props.getAdminData();
    setProfileData(data);
  };

  return (
    <>
      {isAuthenticated ? (
        <PageLayout ProfileData={ProfileData}>
          <Routes>
            <Route index path="/dashboard" element={<Dashboard ProfileData={ProfileData} />} />
            <Route path="/information" element={<Information />} />
            <Route exact path="/appearance" element={<Appearance />} />
            <Route exact path="/directory" element={<Directory />} />
            <Route exact path="/directory/new-directory" element={<NewDirectory />} />
            <Route exact path="/event-schedule" element={<EventSchedule />} />
            <Route exact path="/event-schedule/new-event" element={<NewAndEditEvent />} />
            <Route exact path="/messages" element={<Messages />} />
            <Route exact path="/messages/new-message" element={<NewMessage />} />
            <Route exact path="/messages/edit-message" element={<NewMessage />} />
            <Route exact path="/rewards" element={<Rewards />} />
            <Route exact path="/rewards/edit-prize" element={<EditPrize />} />
            <Route exact path="/leaderboards" element={<Leaderboards />} />
            <Route exact path="/leaderboards/messages/new-message" element={<NewMessage />} />

            <Route path="/settings" element={<Settings />}>
              <Route path="overview" element={<SettingOverview />} />
              <Route path="profile" element={<ProfileSettings />} />
            </Route>

            <Route exact path="/app/:id" element={<StartApp />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </PageLayout>
      ) : (
        <Routes>
          <Route index path="/" element={<Login />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/forgot-password" element={<ForgotPassword />} />
          <Route exact path="/app/:id" element={<StartApp />} />
        </Routes>
      )}
    </>
  );
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, { getAdminData })(Routers);
