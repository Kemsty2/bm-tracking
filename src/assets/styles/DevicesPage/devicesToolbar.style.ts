import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    row: {
      height: '42px',
      display: 'flex',
      alignItems: 'center',
      marginTop: theme.spacing(1),
    },
    spacer: {
      flexGrow: 1,
    },
    importButton: {
      marginRight: theme.spacing(1),
    },
    exportButton: {
      marginRight: theme.spacing(1),
    },
  }),
);
