import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const drawerWidth = 500;

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fabBtn: {
      position: 'fixed',
      bottom: '50%',
      right: '0',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-start',
    },
    contentRoot: {
      padding: theme.spacing(3),
    },
    headerRoot: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    formContainer: {
      marginTop: theme.spacing(2),
    },
    deviceRoot: {
      marginTop: theme.spacing(2),
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
    },
  }),
);
