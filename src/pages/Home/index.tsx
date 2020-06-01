import React from 'react';
import { Grid } from '@material-ui/core';
import { useStyles } from '../../assets/styles/Home.style';
import Device from './components/Device';
import PieChart from './components/PieChart';
import BarChart from './components/BarChart';

import { FaCar } from 'react-icons/fa';
type Props = {};

const Home: React.FC<Props> = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <Device
            color="#FFF"
            backgroundColor="#1976d2"
            Icon={FaCar}
            label="Online Devices"
            value={60}
            unit={'Cars'}
            totalDevices={100}
          />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <Device
            color="#FFF"
            backgroundColor="#1976d2"
            Icon={FaCar}
            label="Online Devices"
            value={60}
            unit={'Cars'}
            totalDevices={100}
          />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <Device
            color="#FFF"
            backgroundColor="#1976d2"
            Icon={FaCar}
            label="Online Devices"
            value={60}
            unit={'Cars'}
            totalDevices={100}
          />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <Device
            color="#FFF"
            backgroundColor="#1976d2"
            Icon={FaCar}
            label="Online Devices"
            value={60}
            unit={'Cars'}
            totalDevices={100}
          />
        </Grid>
        <Grid item lg={6} md={6} xl={6} xs={12}>
          <PieChart
            chartValues={[44, 56]}
            labels={['Online', 'Offline']}
            labelsColor={['#36A2EB', '#FF6384']}
            title="Devices By Status #1"
          />
        </Grid>
        <Grid item lg={6} md={6} xl={6} xs={12}>
          <PieChart
            chartValues={[65, 35]}
            labels={['Active', 'Inactive']}
            labelsColor={['#36A2EB']}
            title="Devices By Status #2"
          />
        </Grid>
        <Grid item lg={12} md={12} xl={12} xs={12}>
          <BarChart label="Devices By Position" chartValues={[12, 34, 21, 4, 3, 2, 3]} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
