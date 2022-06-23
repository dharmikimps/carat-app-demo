import React from 'react';
import './Dashboard.css';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { connect } from 'react-redux';
import { getTop5User } from '../../Services/DashboardServices';
import { useNavigate } from 'react-router';

import Loader from '../../Components/Loader';

import caratChecklist from '../../Assets/Images/carat-checklist.svg';
import documentation from '../../Assets/Images/documentation.svg';
import marketingTools from '../../Assets/Images/marketing-tools.svg';

function createData(name, calories) {
  return { name, calories };
}

const Dashboard = (props) => {
  const [userData, setUserData] = React.useState([]);
  const [loader, setloader] = React.useState(false);

  const navigate = useNavigate();

  React.useEffect(() => {
    loadData();
  }, [props]);

  const loadData = async () => {
    setloader(true);
    setUserData([]);
    if (props && props.spree) {
      const data = await props.getTop5User(props.spree.id);
      data.length > 0 && setUserData(data);
      setloader(false);
    }
  };

  let rows = [];
  userData.map((item, index) => {
    index < 5 && rows.push(createData(item.firstName, item.totalStamp));
  });

  const addNewData = () => {
    navigate('/leaderboards', { state: userData });
  };
  return (
    <>
      {loader ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '15%',
            margin: 'auto',
            height: '100%'
          }}>
          <Loader />
        </div>
      ) : (
        <div className={`dashBoardMainContainer dashboard1`}>
          <h1 className="dashboardhead">Welcome, {props.ProfileData.name}</h1>
          <p className="dashdescription">
            Were excited about your upcoming event! You can customize, keep track of leaderboards
            and add destinations in one place!
          </p>
          <div className="mdashboard">
            <div className="FromCaratContainer maintopuser">
              {userData.length === 0 ? (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '110%',
                    width: '100%'
                  }}
                  className="dashdescription">
                  No User Found!!
                </div>
              ) : (
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{ fontSize: '24px', fontFamily: 'Magdelin-Bold', color: '#121212' }}>
                        Top 5 user
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          sx={{
                            backgroundColor: 'black',
                            px: 5,
                            paddingY: '2px',
                            fontSize: '16px',
                            fontFamily: 'Magdelin-Bold',
                            borderRadius: '10px'
                          }}
                          variant="contained"
                          onClick={() => addNewData()}>
                          VIEW ALL
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.name}>
                        <TableCell
                          component="th"
                          scope="row"
                          align="left"
                          sx={{
                            fontFamily: 'Magdelin-Regular',
                            fontSize: '24px',
                            color: '#707070'
                          }}>
                          {row.name}
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{
                            fontFamily: 'Magdelin-Regular',
                            fontSize: '24px',
                            paddingRight: '10%',
                            color: '#707070'
                          }}>
                          {row.calories}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
            <div className="FromCaratContainer m_carat">
              <div>
                <span
                  style={{
                    fontSize: '24px',
                    fontFamily: 'Magdelin-Bold',
                    color: '#121212',
                    textTransform: 'capitalize'
                  }}>
                  From Carat
                </span>
                <div className="form-carat-child">
                  <div className="carat-main">
                    <div className="cmhead">
                      <div className="name">Carat Checklist</div>
                      <div className="description">
                        A step-by-step to ensure a successful Carat experience.
                      </div>
                    </div>
                    <div className="maincaraticon">
                      <img className="caraticon" src={caratChecklist} />
                    </div>
                    <div className="learnbtn" style={{ marginLeft: 'auto' }}>
                      <Button
                        sx={{
                          backgroundColor: 'black',
                          px: 5,
                          py: 0,
                          paddingY: '4px',
                          fontFamily: 'Magdelin-Bold',
                          fontSize: '16px',
                          borderRadius: '10px'
                        }}
                        variant="contained">
                        learn more
                      </Button>
                    </div>
                  </div>
                  <div className="carat-main">
                    <div className="cmhead">
                      <div className="name">Documentation</div>
                      <div className="description">
                        Discover best practices, strategies and more.
                      </div>
                    </div>
                    <div className="maincaraticon">
                      <img className="caraticon" src={documentation} />
                    </div>
                    <div className="learnbtn">
                      <Button
                        sx={{
                          backgroundColor: 'black',
                          px: 5,
                          py: 0,
                          paddingY: '4px',
                          fontFamily: 'Magdelin-Bold',
                          fontSize: '16px',
                          borderRadius: '10px'
                        }}
                        variant="contained">
                        learn more
                      </Button>
                    </div>
                  </div>
                  <div className="carat-main">
                    <div className="cmhead">
                      <div className="name">Download Marketing Tools</div>
                      <div className="description">
                        Download signage and customized marketing assets.
                      </div>
                    </div>

                    <div className="maincaraticon">
                      <img className="caraticon" src={marketingTools} />
                    </div>
                    <div className="learnbtn">
                      <Button
                        sx={{
                          backgroundColor: 'black',
                          px: 5,
                          py: 0,
                          paddingY: '4px',
                          fontFamily: 'Magdelin-Bold',
                          fontSize: '16px',
                          borderRadius: '10px'
                        }}
                        variant="contained">
                        learn more
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

function mapStateToProps(state) {
  return { spree: state && state.spree !== undefined && state.spree[0] ? state.spree[0] : null };
}

export default connect(mapStateToProps, { getTop5User })(Dashboard);
