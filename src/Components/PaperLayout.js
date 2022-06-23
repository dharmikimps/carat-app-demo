import classes from '../Containers/Pages/css/Reward.module.css';

const PaperLayout = (props) => {
  return (
    <div style={{ width: '32%' }} className={classes.newEventScheduleForm}>
      {props.children}
    </div>
  );
};

export default PaperLayout;
