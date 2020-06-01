import React, { useState } from 'react';

import { DevicesTable /* DevicesToolbar */ } from './components';
import mockData from './data';
import { useStyles } from '../../assets/styles/DevicesPage/index.style';

const UserList = () => {
  const classes = useStyles();

  const [devices] = useState(mockData);

  return (
    <div className={classes.root}>
      {/* <DevicesToolbar /> */}
      <div className={classes.content}>
        <DevicesTable devices={devices} />
      </div>
    </div>
  );
};

export default UserList;
