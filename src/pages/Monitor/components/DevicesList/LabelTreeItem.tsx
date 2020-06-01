import React from 'react';
import { AccountCircle, BatteryFullOutlined } from '@material-ui/icons';
import { Typography, Paper, Avatar } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

type Props = {
  color: string;
  label: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    labelTreeRoot: {
      display: 'flex',
      padding: theme.spacing(1, 2, 1, 2),
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: theme.spacing(1),
    },
    labelAvatar: { flex: 1, backgroundColor: (props: Props) => `${props.color}` },
    labelRoot: { flex: 5 },
    battery: { marginLeft: theme.spacing(3), color: (props: Props) => `${props.color}` },
    batteryIcon: {
      width: '20px',
      height: '20px',
      transform: 'rotate(-90deg)',
    },
    batteryRoot: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      color: (props: Props) => `${props.color}`,
    },
    batteryText: {
      fontSize: '0.8em',
      marginLeft: theme.spacing(1),
      color: (props: Props) => `${props.color}`,
    },
    labelVitesse: {
      flex: 2,
      color: (props: Props) => `${props.color}`,
      fontSize: '1em',
    },
    outlined: {
      border: (props: Props) => `1px solid ${props.color}`,
    },
  }),
);

const LabelTreeItem: React.FC<Props> = ({ color, label }) => {
  const classes = useStyles({ color, label });
  return (
    <Paper className={classes.labelTreeRoot} variant="outlined" classes={{ outlined: classes.outlined }}>
      <Avatar className={classes.labelAvatar}>
        <AccountCircle />
      </Avatar>
      <div className={classes.labelRoot}>
        <div className={classes.battery}>
          <Typography color="inherit" variant="body1">
            {label}
          </Typography>
          <div className={classes.batteryRoot}>
            <BatteryFullOutlined className={classes.batteryIcon} />
            <span className={classes.batteryText}>50 %</span>
          </div>
        </div>
      </div>
      <Typography variant="body2" className={classes.labelVitesse}>
        {'22 km/h'}
      </Typography>
    </Paper>
  );
};

export default LabelTreeItem;
