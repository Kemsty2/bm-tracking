import React from 'react';
import clsx from 'clsx';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { TextField, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      borderRadius: '4px',
      alignItems: 'center',
      padding: theme.spacing(1),
      display: 'flex',
      flexBasis: 420,
    },
    icon: {
      marginRight: theme.spacing(1),
      color: theme.palette.text.secondary,
    },
    input: {
      flexGrow: 1,
      fontSize: '14px',
      lineHeight: '16px',
      letterSpacing: '-0.05px',
    },
  }),
);

type Props = {
  onChange?: () => void;
  className?: any;
  style?: any;
  placeholder?: string;
};

const SearchInput: React.FC<Props> = ({ onChange, style, className, placeholder }) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)} style={style}>
      <TextField
        className={classes.input}
        error={false}
        placeholder={placeholder}
        label="Search"
        id="search"
        name="search"
        onChange={onChange}
        type="text"
        /* value={} */
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon className={classes.icon} />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default SearchInput;
