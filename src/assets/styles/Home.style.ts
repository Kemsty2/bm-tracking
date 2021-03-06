import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      padding: theme.spacing(4),
    },
    mainRoot: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      overflow: 'hidden',
      paddingBottom: 200,
    },
    grid: {
      width: 1200,
      marginTop: 40,
      [theme.breakpoints.down('sm')]: {
        width: 'calc(100% - 20px)',
      },
    },
    paper: {
      padding: theme.spacing(3),
      textAlign: 'left',
      color: theme.palette.text.secondary,
    },
    rangeLabel: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingTop: theme.spacing(2),
    },
    topBar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 32,
    },
    outlinedButtom: {
      textTransform: 'uppercase',
      margin: theme.spacing(1),
    },
    actionButtom: {
      textTransform: 'uppercase',
      margin: theme.spacing(1),
      width: 152,
    },
    blockCenter: {
      padding: theme.spacing(2),
      textAlign: 'center',
    },
    block: {
      padding: theme.spacing(2),
    },
    box: {
      marginBottom: 40,
      height: 65,
    },
    inlining: {
      display: 'inline-block',
      marginRight: 10,
    },
    buttonBar: {
      display: 'flex',
    },
    alignRight: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    noBorder: {
      borderBottomStyle: 'hidden',
    },
    loadingState: {
      opacity: 0.05,
    },
    loadingMessage: {
      position: 'absolute',
      top: '40%',
      left: '40%',
    },
  }),
);
