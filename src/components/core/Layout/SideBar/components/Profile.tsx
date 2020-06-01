import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Avatar, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: 'fit-content',
    },
    avatar: {
      width: 60,
      height: 60,
    },
    name: {
      marginTop: theme.spacing(1),
    },
  }),
);

type Props = {
  className?: any;
  name: string;
  email: string;
};

const Profile: React.FC<Props> = ({ className, name, email }) => {
  const classes = useStyles();

  const user = {
    name,
    avatar: '/images/avatars/avatar.png',
    email,
  };

  return (
    <div className={clsx(classes.root, className)}>
      <Avatar alt="Person" className={classes.avatar} component={RouterLink} src={user.avatar} to="/account" />
      <Typography className={classes.name} variant="h4">
        {user.name}
      </Typography>
      <Typography variant="body2">{user.email}</Typography>
    </div>
  );
};

export default Profile;
