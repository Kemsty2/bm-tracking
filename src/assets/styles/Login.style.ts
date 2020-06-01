import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.default,
      minHeight: '100vh',
    },
    grid: {
      minHeight: '100vh',
      overflow: 'hidden',
    },
    quoteContainer: {
      [theme.breakpoints.down('md')]: {
        display: 'none',
      },
    },
    quote: {
      backgroundColor: theme.palette.background.default,
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
      backgroundImage: 'url(/images/login-background.png)',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    },
    quoteInner: {
      textAlign: 'center',
      flexBasis: '500px',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      marginBottom: theme.spacing(2),
      padding: theme.spacing(3),
      /* marginBottom: theme.spacing(5), */
    },
    quoteText: {
      color: '#FFF',
      fontWeight: 400,
      textAlign: 'justify',
    },
    name: {
      marginTop: theme.spacing(3),
      color: '#FFF',
    },
    bio: {
      color: '#FFF',
    },
    contentContainer: {},
    content: {
      display: 'flex',
      flexDirection: 'column',
    },
    contentForm: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
    },
    contentHeader: {
      display: 'flex',
      alignItems: 'center',
      paddingTop: theme.spacing(5),
      paddingBototm: theme.spacing(2),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    logoContent: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    logoImage: {
      width: '150px',
      height: '50px',
      [theme.breakpoints.down('sm')]: {
        width: '100px',
      },
    },
    contentBody: {
      flexGrow: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    form: {
      alignSelf: 'center',
      [theme.breakpoints.up('xs')]: {
        width: '45vh',
      },
      [theme.breakpoints.down('sm')]: {
        width: '55vh',
      },
      [theme.breakpoints.up('sm')]: {
        width: '85vh',
      },
      [theme.breakpoints.up('md')]: {
        width: '95vh',
      },
      [theme.breakpoints.up('lg')]: {
        width: '90vh',
      },
      [theme.breakpoints.up('xl')]: {
        width: '100vh',
      },
      [theme.breakpoints.down('sm')]: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
      },
    },
    title: {
      marginTop: theme.spacing(3),
    },
    socialButtons: {
      marginTop: theme.spacing(3),
    },
    socialIcon: {
      marginRight: theme.spacing(1),
    },
    sugestion: {
      marginTop: theme.spacing(2),
    },
    textField: {
      marginTop: theme.spacing(2),
    },
    signInButton: {
      margin: theme.spacing(2, 0),
    },
    person: {},
    footer: {
      position: 'relative',
      bottom: '-110px',
      alignSelf: 'flex-end',
      padding: theme.spacing(2, 2),
      [theme.breakpoints.down('md')]: {
        bottom: '-80px',
      },
    },
  }),
);
