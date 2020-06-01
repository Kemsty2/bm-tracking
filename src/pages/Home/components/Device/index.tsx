import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Card, CardContent, Grid, Typography, Avatar, LinearProgress } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100%',
    },
    content: {
      alignItems: 'center',
      display: 'flex',
    },
    title: {
      fontWeight: 700,
    },
    avatar: {
      backgroundColor: (props: any) => props.backgroundColor,
      color: (props: any) => props.color,
      height: 56,
      width: 56,
    },
    icon: {
      height: 32,
      width: 32,
    },
    progress: {
      marginTop: theme.spacing(3),
    },
    colorPrimary: {
      color: (props: any) => props.backgroundColor,
    },
  }),
);

type Props = {
  className?: any;
  color: string;
  Icon: any;
  label: string;
  value: number;
  totalDevices: number;
  backgroundColor: string;
  unit?: string;
};

const Device: React.FC<Props> = ({ className, backgroundColor, color, Icon, label, value, totalDevices, unit }) => {
  const classes = useStyles({ backgroundColor, color });
  const [progress, setProgress] = useState(0.0);

  useEffect(() => {
    if (totalDevices) {
      setProgress((value / totalDevices) * 100);
    }
  }, [value, totalDevices]);

  return (
    <Card className={clsx(classes.root, className)}>
      <CardContent>
        <Grid container justify="space-between">
          <Grid item>
            <Typography className={classes.title} color="textSecondary" gutterBottom variant="body2">
              {label}
            </Typography>
            <Typography variant="h5">
              {value} {unit}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <Icon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
        <LinearProgress
          className={classes.progress}
          classes={{
            colorPrimary: classes.colorPrimary,
          }}
          color="primary"
          value={progress}
          variant="determinate"
        />
      </CardContent>
    </Card>
  );
};

export default Device;
