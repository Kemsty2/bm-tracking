import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  OutlinedInput,
  InputAdornment,
  FormControl,
  InputLabel,
  CircularProgress,
  Fab,
} from '@material-ui/core';
import { Cancel, Search, LocalShipping } from '@material-ui/icons';
/* import clsx from "clsx"; */
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useStyles } from '../../../../assets/styles/MonitorPage/deviceList.style';
import TreeList from './TreeList';

type Props = {};

const DevicesList: React.FC<Props> = () => {
  const classes = useStyles();
  const [showLoader, setShowLoader] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  /* const dispatch = useDispatch(); */

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    setTimeout(() => {
      setShowLoader(false);
    }, 1000);
  });

  return (
    <>
      <Drawer
        className={classes.drawer}
        variant="temporary"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
        ModalProps={{ BackdropProps: { invisible: true }, onClose: handleDrawerClose }}
      >
        <PerfectScrollbar>
          <Box className={classes.contentRoot}>
            <Box className={classes.headerRoot}>
              <Typography variant="h6" color="textPrimary">
                Devices List
              </Typography>
              <IconButton onClick={handleDrawerClose}>
                <Cancel />
              </IconButton>
            </Box>
            <Divider />
            <Box className={classes.formContainer}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="search">Search</InputLabel>
                <OutlinedInput
                  id="search"
                  fullWidth
                  startAdornment={
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  }
                  inputProps={{
                    'aria-label': 'search',
                  }}
                  labelWidth={60}
                />
              </FormControl>
            </Box>
            <Box className={classes.deviceRoot}>
              {showLoader ? <CircularProgress /> : null}
              <TreeList />
            </Box>
          </Box>
        </PerfectScrollbar>
      </Drawer>
      <Fab color="primary" className={classes.fabBtn} onClick={handleDrawerOpen}>
        <LocalShipping />
      </Fab>
    </>
  );
};

export default DevicesList;
