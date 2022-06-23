import React, { useState } from 'react';

import MessageTable from './Message/MessageTable';
import classes from './css/Message.module.css';
import plus from '../../Assets/Images/plus.svg';
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { InputBase, Button } from '@mui/material';
import { useNavigate } from 'react-router';
import { connect } from 'react-redux';
import { getMessageList, deleteMessage } from '../../Services/Message';

function Messages(props) {
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [messageData, setMessageData] = useState([]);

  React.useEffect(() => {
    loadData();
  }, [props]);

  const loadData = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user.id;
    if (props.spree && userId) {
      const data = await props.getMessageList(props.spree.id, userId);
      const dataValue =
        data && data.length > 0 && data.filter((item) => item.spree === props.spree.id);
      setMessageData(dataValue);
    }
  };

  const addNewData = () => {
    navigate('/messages/new-message', { state: false });
  };

  const deleteMessageData = async (msgIdArray) => {
    await props.deleteMessage(msgIdArray);
    loadData();
  };

  return (
    <div className={classes.mainMessageContainer}>
      <div className={classes.messageTitleContainer}>
        <h1>Messages</h1>
        <p>Schedule Messages to send to your users.</p>
      </div>

      <div style={{ position: 'relative' }}>
        <div
          style={{
            textAlign: 'right',
            margin: '1rem 0',
            display: 'flex',
            justifyContent: 'flex-end'
          }}>
          <div
            style={{
              background: 'white',
              display: 'flex',
              borderRadius: '15px',
              width: '250px',
              boxShadow: '3px 3px 8px rgba(0,0,0,0.1)'
            }}>
            <IconButton type="submit" sx={{ p: '10px 5px 10px 10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <InputBase
              sx={{ p: '3.5px 0 0 5px', font: '18px' }}
              placeholder="Search..."
              inputProps={{ 'aria-label': 'search google maps' }}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div style={{ marginLeft: '3%', display: 'flex' }}>
            <Button
              sx={{
                backgroundColor: 'black',
                fontFamily: 'Magdelin-Bold',
                fontSize: '15px',
                borderRadius: '10px',
                width: '200px',
                display: 'flex',
                color: '#fff'
              }}
              onClick={() => addNewData()}>
              <div style={{ width: '40px' }}>
                <img src={plus} alt="Add_Icon" style={{ padding: '0.1rem 0 0.2rem' }} />
              </div>
              <div style={{ width: '160px', paddingRight: '20px', letterSpacing: '0.2em' }}>
                Add New
              </div>
            </Button>
          </div>
        </div>
        <MessageTable
          data={messageData}
          search={search}
          spree={props.spree}
          delete={deleteMessageData}
        />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return { spree: state && state.spree !== undefined && state.spree[0] ? state.spree[0] : null };
}

export default connect(mapStateToProps, { getMessageList, deleteMessage })(Messages);
