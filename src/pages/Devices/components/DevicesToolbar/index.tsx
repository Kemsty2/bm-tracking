import React from 'react';
import clsx from 'clsx';
import { Button } from '@material-ui/core';

import { useStyles } from '../../../../assets/styles/DevicesPage/devicesToolbar.style';

type Props = {
  className?: any;
};

const UsersToolbar: React.FC<Props> = ({ className }) => {
  const classes = useStyles();

  return (
    <div className={clsx(className)}>
      <div className={classes.row}>
        <span className={classes.spacer} />
        <Button className={classes.importButton}>Import</Button>
        <Button className={classes.exportButton}>Export</Button>
        <Button color="primary" variant="contained">
          Add Device
        </Button>
      </div>
    </div>
  );
};

export default UsersToolbar;
