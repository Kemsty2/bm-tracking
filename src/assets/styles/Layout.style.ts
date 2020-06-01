import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      paddingTop: 56,
      [theme.breakpoints.up('sm')]: {
        paddingTop: 64,
      },
    },
    mainRoot: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      overflow: 'hidden',
    },
    shiftContent: {
      paddingLeft: 240,
    },
    link: {
      display: 'flex',
      justifyContent: 'space-around',
    },
    breadCumbs: {
      padding: theme.spacing(3, 0, 0, 3),
    },
    breadCumbTitle: {
      marginLeft: theme.spacing(1),
    },
  }),
);
