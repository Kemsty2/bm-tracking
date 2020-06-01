import React from 'react';
import clsx from 'clsx';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Divider, Drawer } from '@material-ui/core';

import SidebarNav from './components/SidebarNav';
import Profile from './components/Profile';
import { Page } from '../../../commonTypes';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: 240,
      [theme.breakpoints.up('lg')]: {
        marginTop: 64,
        height: 'calc(100% - 64px)',
      },
    },
    root: {
      backgroundColor: theme.palette.background.paper,
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      padding: theme.spacing(2),
    },
    divider: {
      margin: theme.spacing(2, 0),
    },
    nav: {
      marginBottom: theme.spacing(2),
    },
  }),
);

type Props = {
  open: boolean;
  variant: any;
  onClose: any;
  className?: any;
  pages: Page;
};

const Sidebar: React.FC<Props> = ({ open, variant, onClose, className, pages }) => {
  const classes = useStyles();

  return (
    <Drawer anchor="left" classes={{ paper: classes.drawer }} onClose={onClose} open={open} variant={variant}>
      <div className={clsx(classes.root, className)}>
        <Profile name="admin" email="admin" />
        <Divider className={classes.divider} />
        <SidebarNav className={classes.nav} pages={pages} />
      </div>
    </Drawer>
  );
};

export default Sidebar;
