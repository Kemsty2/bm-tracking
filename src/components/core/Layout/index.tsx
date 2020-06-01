import React from 'react';
import clsx from 'clsx';
import TopBar from './TopBar';
import Footer from './Footer';
import { CssBaseline, useMediaQuery, Breadcrumbs, Link } from '@material-ui/core';
import { useStyles } from '../../../assets/styles/Layout.style';
import { useTheme } from '@material-ui/core/styles';
import Sidebar from './SideBar';
import { useSelector, useDispatch } from 'react-redux';
import { selectSidebarStatus } from '../../../redux/selectors/settings';
import { setSidebarOpen, toggleSidebar } from '../../../redux/actions/settings';
import { Link as RouterLink } from 'react-router-dom';
import { useLocation } from 'react-router';
import {
  LocalShipping,
  MapRounded,
  PeopleAltRounded,
  Notifications,
  ShowChartOutlined,
  Dashboard as DashboardIcon,
  AccountBox as AccountBoxIcon,
  Settings as SettingsIcon,
} from '@material-ui/icons';
import { Page } from '../../commonTypes';

type Props = {
  children: any;
};

const pages = {
  dashboard: {
    title: 'Dashboard',
    href: '/dashboard',
    icon: <DashboardIcon />,
  },
  devices: {
    title: 'Devices',
    href: '/devices',
    icon: <LocalShipping />,
  },
  monitor: {
    title: 'Monitor',
    href: '/monitor',
    icon: <MapRounded />,
  },
  drivers: {
    title: 'Drivers',
    href: '/drivers',
    icon: <PeopleAltRounded />,
  },
  events: {
    title: 'Events',
    href: '/events',
    icon: <Notifications />,
  },
  reports: {
    title: 'Reports',
    href: '/reports',
    icon: <ShowChartOutlined />,
  },
  account: {
    title: 'Account',
    href: '/account',
    icon: <AccountBoxIcon />,
  },
  settings: {
    title: 'Settings',
    href: '/settings',
    icon: <SettingsIcon />,
  },
} as Page;

const Layout: React.FC<Props> = ({ children }) => {
  const classes = useStyles();
  const theme = useTheme();
  const location = useLocation();
  const dispatch = useDispatch();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true,
  });

  const openSidebarRedux = useSelector(selectSidebarStatus);

  const handleSidebarClose = () => {
    dispatch(setSidebarOpen());
  };

  const toggleDrawer = () => {
    dispatch(toggleSidebar());
  };

  const open = isDesktop ? openSidebarRedux : !openSidebarRedux;
  const pathname = location.pathname.split('/')[1];
  const page = pages[pathname];
  console.log(page);

  return (
    <div
      className={clsx({
        [classes.root]: true,
        [classes.shiftContent]: open,
      })}
    >
      <CssBaseline />
      <TopBar toggleDrawer={toggleDrawer} />
      <Sidebar
        open={open}
        onClose={handleSidebarClose}
        variant={isDesktop ? 'persistent' : 'temporary'}
        pages={pages}
      />
      <div className={classes.mainRoot}>
        <Breadcrumbs aria-label="breadcrumb" className={classes.breadCumbs}>
          <Link color="inherit" aria-current="page" component={RouterLink} to={page.href} className={classes.link}>
            {page.icon}
            <span className={classes.breadCumbTitle}>{page.title}</span>
          </Link>
        </Breadcrumbs>
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
