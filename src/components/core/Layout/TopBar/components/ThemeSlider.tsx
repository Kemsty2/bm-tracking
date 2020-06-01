import React from 'react';
import { IconButton, Tooltip, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme } from '../../../../../redux/actions/settings';
import { selectTheme } from '../../../../../redux/selectors/settings';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import WbSunnyRoundedIcon from '@material-ui/icons/WbSunnyRounded';
import Brightness3RoundedIcon from '@material-ui/icons/Brightness3Rounded';
import { yellow, blueGrey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    switchBase: {
      color: theme.palette.primary.main,
      '&$checked': {
        color: theme.palette.primary.main,
      },
      '&$checked + $track': {
        backgroundColor: theme.palette.primary.main,
      },
    },
    checked: {},
    track: {},
    flex: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    sun: {
      color: yellow[400],
    },
    moon: {
      color: blueGrey[400],
    },
    root: {
      padding: theme.spacing(0, 1, 0, 1),
    },
    flexGrow: {
      flexGrow: 1,
    },
  }),
);

type Props = {
  mobile: boolean;
};

const ThemeSlider: React.FC<Props> = ({ mobile }) => {
  const classes = useStyles();

  const theme = useSelector(selectTheme);
  const [checked, setChecked] = React.useState(theme === 'dark');

  const dispatch = useDispatch();

  const toogleTheme = (checked: boolean) => {
    setChecked(checked);
    dispatch(changeTheme(checked ? 'dark' : 'light'));
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const value = event.target.value;

    toogleTheme(value === 'dark');
  };

  const renderDesktop = () =>
    checked ? (
      <Tooltip title="Toogle Theme To Bright Theme" aria-label="">
        <IconButton color="inherit" onClick={() => toogleTheme(false)} className={classes.checked}>
          <Brightness3RoundedIcon />
        </IconButton>
      </Tooltip>
    ) : (
      <Tooltip title="Toogle Theme To Dark Theme" aria-label="">
        <IconButton color="inherit" onClick={() => toogleTheme(true)}>
          <WbSunnyRoundedIcon />
        </IconButton>
      </Tooltip>
    );

  const renderMobile = () => (
    <FormControl className={classes.flexGrow}>
      <InputLabel id="theme-label">Theme</InputLabel>
      <Select labelId="theme-label" id="theme-select" value={checked ? 'dark' : 'bright'} onChange={handleChange}>
        <MenuItem value={'dark'}>Dark</MenuItem>
        <MenuItem value={'bright'}>Bright</MenuItem>
      </Select>
    </FormControl>
  );

  return mobile ? renderMobile() : renderDesktop();
};

export default ThemeSlider;
