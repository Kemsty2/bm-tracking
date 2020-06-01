import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    content: {
      padding: 0,
    },
    inner: {
      minWidth: 1050,
    },
    nameContainer: {
      display: 'flex',
      alignItems: 'center',
    },
    avatar: {
      marginRight: theme.spacing(2),
    },
    actions: {
      justifyContent: 'flex-end',
    },
    tableRow: {},
    searchInput: {
      marginRight: theme.spacing(1),
    },
    row: {
      display: 'flex',
      alignItems: 'center',
      marginTop: theme.spacing(1),
    },
  }),
);
