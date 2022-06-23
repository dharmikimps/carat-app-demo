import React from 'react';
import classes from './css/LeaderBoard.module.css';
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { InputBase } from '@mui/material';
import { connect } from 'react-redux';
import LeaderBoardTable from './leaderBoard/LeaderBoardTable';
import { getUserSpree } from '../../Services/Message';

function Leaderboard(props) {
  const [userData, setUserData] = React.useState([]);

  const [search, setSearch] = React.useState('');

  React.useEffect(() => {
    loadData();
  }, [props]);

  const loadData = async () => {
    if (props && props.spree) {
      const data = await props.getUserSpree(props.spree.id);
      setUserData(data);
    }
  };

  return (
    <div className={classes.mainLeaderboardContainer}>
      <div className={classes.leaderboardTitleContainer}>
        <h1>Leaderboards</h1>
        <p>Users who are leading the pack.</p>
      </div>

      <div className={classes.maindirec} style={{ position: 'relative' }}>
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
        </div>
        <LeaderBoardTable data={userData} search={search} spree={props.spree} />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return { spree: state && state.spree !== undefined && state.spree[0] ? state.spree[0] : null };
}

export default connect(mapStateToProps, { getUserSpree })(Leaderboard);
