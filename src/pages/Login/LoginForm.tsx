import React from 'react';
import { useFormik } from 'formik';
import { Grid, Typography, TextField, Button, Link } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { useStyles } from '../../assets/styles/Login.style';
import { object, string } from 'yup';

type Props = {
  login: (info: any) => void;
};

const LoginForm: React.FC<Props> = ({ login }) => {
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: object({
      email: string().email('Invalid Email Address').required('Email is Required'),
      password: string()
        .matches(
          new RegExp('^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$'),
          'Password Must Contains at Least 1 Number, 1 Special Character, 1 Capital Letter, 1 Lower Letter',
        )
        .required('Password is Required'),
    }),
    onSubmit: (values) => {
      console.log(values);
      login(values);
    },
  });

  return (
    <form className={classes.form} onSubmit={formik.handleSubmit}>
      <Grid container justify="space-around">
        <Grid container direction="column" lg={8} md={8} xs={8}>
          <Typography className={classes.title} variant="h2">
            Sign in
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            With Email Address
          </Typography>
        </Grid>
        <Grid item lg={4} md={4} xs={4} className={classes.logoContent}>
          <img src="/images/logo.png" className={classes.logoImage} alt="logo" />
        </Grid>
      </Grid>

      <Grid container>
        <Grid item lg={12} sm={12} md={12} xs={12}>
          <TextField
            className={classes.textField}
            error={formik.touched.password && formik.errors.password ? true : false}
            helperText={formik.touched.email && formik.errors.email ? formik.errors.email : null}
            label="Email address"
            fullWidth
            id="email"
            name="email"
            onChange={formik.handleChange}
            type="text"
            value={formik.values.email}
            variant="outlined"
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item lg={12} sm={12} md={12} xs={12}>
          <TextField
            className={classes.textField}
            error={formik.touched.password && formik.errors.password ? true : false}
            helperText={formik.touched.password && formik.errors.password ? formik.errors.password : null}
            label="Password"
            fullWidth
            id="password"
            name="password"
            onChange={formik.handleChange}
            type="password"
            value={formik.values.password}
            variant="outlined"
          />
        </Grid>
      </Grid>
      <Button
        className={classes.signInButton}
        color="primary"
        /* disabled={!formState.isValid} */
        fullWidth
        size="large"
        type="submit"
        variant="contained"
      >
        Sign in now
      </Button>
      <Typography color="textSecondary" variant="body2">
        <Link component={RouterLink} to="/sign-up">
          Forgot Password?
        </Link>
      </Typography>
    </form>
  );
};

export default LoginForm;
