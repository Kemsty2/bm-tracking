import React from 'react';
import { Grid, Link, Typography } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { useStyles } from '../../assets/styles/Login.style';
import { useIntl } from 'react-intl';
import LoginForm from './LoginForm';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/actions/user';
/* import { useHistory } from 'react-router'; */
/* import { FaGoogle as GoogleIcon, FaFacebookF as FacebookIcon } from 'react-icons/fa'; */

const LoginPage: React.FC = () => {
  const classes = useStyles();
  const intl = useIntl();
  const dispatch = useDispatch();
  /* const history = useHistory(); */

  const onSubmit = (info: any) => {
    dispatch(login(info));
    /* history.push('/'); */
  };

  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container>
        <Grid className={classes.quoteContainer} item lg={5}>
          <div className={classes.quote}>
            <div className={classes.quoteInner}>
              <Typography className={classes.quoteText} variant="body2">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit laborum dicta unde rerum aspernatur
                rem harum veniam quas! Quaerat distinctio a laborum temporibus aut vitae assumenda quis, nulla ipsa
                tempora.
              </Typography>
            </div>
          </div>
        </Grid>
        <Grid className={classes.content} item lg={7} xs={12}>
          <div className={classes.contentForm}>
            {/* <div className={classes.contentHeader}>
              <IconButton onClick={handleBack}>
                <ArrowBackIcon />
              </IconButton>
            </div> */}
            <div className={classes.contentBody}>
              <LoginForm login={onSubmit} />
              <Grid container justify="space-around" className={classes.footer}>
                <Typography variant="body2" color="inherit">
                  {'Copyright ©'}
                  <Link component={RouterLink} to="/">
                    BM Tracking Cameroun
                  </Link>{' '}
                  {new Date().getFullYear()}
                  {'.'}
                </Typography>
                <Typography variant="body2" color="inherit">
                  <Link component={RouterLink} to="/privacy">
                    {intl.formatMessage({ id: 'footer.privacy' })}
                  </Link>
                  {' - '}
                  <Link component={RouterLink} to="/terms">
                    {intl.formatMessage({ id: 'footer.condition' })}
                  </Link>
                </Typography>
              </Grid>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
export default LoginPage;
