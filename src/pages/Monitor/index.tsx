import React from 'react';
import { useStyles } from '../../assets/styles/MonitorPage/index.style';
/* import { setSidebarClose } from '../../redux/actions/settings';
import { useDispatch } from 'react-redux'; */
import { DevicesList } from './components';
import { Map } from './components';
/* import clsx from "clsx"; */

type Props = {};

const Monitor: React.FC<Props> = () => {
  const classes = useStyles();
  /* const dispatch = useDispatch(); */

  return (
    <div className={classes.root}>
      <Map />
      <DevicesList />
    </div>
  );
};

export default Monitor;
