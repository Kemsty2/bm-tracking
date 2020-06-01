import React, { Fragment } from 'react';
import {
  Toolbar,
  AppBar,
  IconButton,
  Typography,
  InputBase,
  Badge,
  MenuItem,
  Menu,
  Button,
  Divider,
} from '@material-ui/core';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  AccountCircle,
  Notifications as NotificationsIcon,
  MoreVert as MoreIcon,
} from '@material-ui/icons';
import { useStyles } from '../../../../assets/styles/TopBar.style';
import { selectStatusOfUser } from '../../../../redux/selectors/users';
import { useSelector } from 'react-redux';
import ThemeSlider from './components/ThemeSlider';
import LangageSelect from './components/LangageSelect';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { logout } from '../../../../redux/actions/user';
/* import { useHistory } from 'react-router'; */
type Props = {
  toggleDrawer: () => void;
};

const TopBar: React.FC<Props> = ({ toggleDrawer }) => {
  //#region Constants
  const classes = useStyles();
  const intl = useIntl();
  /* const history = useHistory(); */
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  //#endregion

  //#region Redux Selector

  const isAuthenticated = useSelector(selectStatusOfUser);

  //#endregion

  //#region Handler

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    dispatch(logout());
    /* history.push('/login'); */
  };

  //#endregion

  //#region SubComponent
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <Divider />
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <LangageSelect mobile={true} />
      </MenuItem>
      <Divider />
      <MenuItem>
        <ThemeSlider mobile={true} />
      </MenuItem>
    </Menu>
  );

  //#endregion

  return (
    <Fragment>
      <AppBar>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={() => toggleDrawer()}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            BM Tracking
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder={`${intl.formatMessage({ id: 'topbar.searchText' })}...`}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <LangageSelect mobile={false} />
            <ThemeSlider mobile={false} />
          </div>
          {isAuthenticated ? (
            <Fragment>
              <div className={classes.sectionDesktop}>
                <IconButton aria-label="show 4 new notifications" color="inherit">
                  <Badge badgeContent={4} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </div>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <div className={classes.sectionMobile}>
                <IconButton
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </div>
            </Fragment>
          ) : (
            <Button color="inherit">{intl.formatMessage({ id: 'topbar.loginText' })}</Button>
          )}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Fragment>
  );
};

export default TopBar;
