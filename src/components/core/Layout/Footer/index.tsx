import React from 'react';
import { Typography, Container } from '@material-ui/core';
import useStyles from '../../../../assets/styles/Footer.style';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

const Copyright: React.FC = () => {
  const classes = useStyles();

  return (
    <Typography variant="body2" color="inherit">
      {'Copyright ©'}
      <Link to="/" className={classes.link}>
        BM Tracking Cameroun
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

const Footer: React.FC = () => {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <footer className={classes.footer}>
      <Container className={classes.root}>
        <Typography variant="body2" color="inherit">
          <Link to="/privacy" className={classes.link}>
            {intl.formatMessage({ id: 'footer.privacy' })}
          </Link>
          {' - '}
          <Link to="/terms" className={classes.link}>
            {intl.formatMessage({ id: 'footer.condition' })}
          </Link>
        </Typography>
        <Copyright />
      </Container>
    </footer>
  );
};

export default Footer;
