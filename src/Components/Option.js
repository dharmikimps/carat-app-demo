import React, { useState } from 'react';
import Select from 'react-select';
import { useNavigate, useLocation } from 'react-router';
import { getSpree } from '../Services/DashboardServices';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getSpreeData } from '../Actions/Refresh';
import { useAppContext } from '../Lib/ContextLib';
import { spreeOptionsStyles } from '../Assets/styles/OptionStyle';

function Option(props) {
  const location = useLocation();

  let navigate = useNavigate();
  const { setAuthenticated } = useAppContext();

  const [spreeData, setSpreeData] = React.useState([]);
  const dispatch = useDispatch();

  React.useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    let userInfo = JSON.parse(localStorage.getItem('user'));

    const data = await props.getSpree();

    if (data.status === 'ok' && !userInfo.shop_spree) {
      setSpreeData(data.data);
      dispatch(getSpreeData(data.data[0]));
    } else if (data.staus === 'ok' || userInfo.shop_spree) {
      let shopAdminSpree = data.data.filter((spree) => {
        return spree.id === userInfo.shop_spree;
      });
      setSpreeData(shopAdminSpree);
      dispatch(getSpreeData(shopAdminSpree[0]));
    } else if (data.message === 'Unauthorized Request') {
      console.log('call Unauthorized Request', data);
      setAuthenticated(false);
      navigate('/login');
    }
  };

  const handleRoute = () => {
    if (
      location.pathname === '/messages/new-message' ||
      location.pathname === '/messages/edit-message'
    ) {
      navigate('/messages');
    } else if (location.pathname === '/event-schedule/new-event') {
      navigate('/event-schedule');
    } else if (location.pathname === '/directory/new-directory') {
      navigate('/directory');
    } else if (location.pathname === '/leaderboards/messages/new-message') {
      navigate('/leaderboards');
    } else if (location.pathname === '/rewards/edit-prize') {
      navigate('/rewards');
    }
  };

  const [selectedOption, setSelectedOption] = useState(spreeData[0]);

  let options = spreeData.map(function (item) {
    return { value: item.name, label: item.name, id: item.id, spreeData: item };
  });

  const data = (data) => {
    dispatch(getSpreeData(data.spreeData));
  };

  const handleSpreeDataChange = async (data) => {
    const spreeDatas = await props.getSpree();
    const selectedSpreeData = spreeDatas.data.filter((spreeData) => {
      return spreeData.id === data.id;
    });

    dispatch(getSpreeData(selectedSpreeData[0]));
  };

  return (
    <Select
      defaultValue={selectedOption}
      onChange={(item) => {
        setSelectedOption(item);
        data(item);
        handleRoute();
        handleSpreeDataChange(item);
      }}
      options={options}
      value={selectedOption === undefined ? options[0] : selectedOption}
      styles={spreeOptionsStyles}
      components={{
        IndicatorSeparator: () => null
      }}
    />
  );
}

function mapStateToProps(state) {
  return { todos: state.spree[0] };
}

export default connect(mapStateToProps, { getSpree })(Option);
