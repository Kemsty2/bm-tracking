/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { forwardRef } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { List, ListItem, Button, colors } from '@material-ui/core';
import { Page } from '../../../../commonTypes';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    item: {
      display: 'flex',
      paddingTop: 0,
      paddingBottom: 0,
    },
    button: {
      color: theme.palette.type === 'light' ? colors.blueGrey[800] : '#FFF',
      padding: '10px 8px',
      justifyContent: 'flex-start',
      textTransform: 'none',
      letterSpacing: 0,
      width: '100%',
      fontWeight: theme.typography.fontWeightMedium,
    },
    icon: {
      color: theme.palette.type === 'light' ? colors.blueGrey[800] : '#FFF',
      width: 24,
      height: 24,
      display: 'flex',
      alignItems: 'center',
      marginRight: theme.spacing(1),
    },
    active: {
      color: theme.palette.primary.main,
      fontWeight: theme.typography.fontWeightBold,
      '& $icon': {
        color: theme.palette.primary.main,
      },
    },
  }),
);

const CustomRouterLink = forwardRef((props: any, ref: any) => (
  <div ref={ref} style={{ flexGrow: 1 }}>
    <RouterLink {...props} />
  </div>
));

type Props = {
  pages: Page;
  className: any;
};

const SidebarNav: React.FC<Props> = ({ className, pages }) => {
  const classes = useStyles();

  return (
    <List className={clsx(classes.root, className)}>
      {Object.values(pages).map((page) => (
        <ListItem className={classes.item} disableGutters key={page.title}>
          <Button
            activeClassName={classes.active}
            className={classes.button}
            component={CustomRouterLink}
            to={page.href}
          >
            <div className={classes.icon}>{page.icon}</div>
            {page.title}
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

export default SidebarNav;
