import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Card, CardHeader, CardContent, Divider, IconButton } from '@material-ui/core';
import { makeStyles, createStyles, useTheme, Theme } from '@material-ui/core/styles';
import RefreshIcon from '@material-ui/icons/Refresh';
import { options } from './components/chart';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100%',
    },
    chartContainer: {
      position: 'relative',
      height: '300px',
    },
    stats: {
      marginTop: theme.spacing(2),
      display: 'flex',
      justifyContent: 'center',
    },
  }),
);

type Props = {
  chartValues: number[];
  labels: string[];
  labelsColor: string[];
  title: string;
};

const PieChart: React.FC<Props> = ({ chartValues, labels, labelsColor, title }) => {
  const classes = useStyles();
  const theme = useTheme();

  const [data, setData] = React.useState({
    labels: labels,
    datasets: [
      {
        data: [0, 0, 0, 0],
        backgroundColor: labelsColor,
        borderWidth: 8,
        borderColor: theme.palette.background.paper,
        hoverBorderColor: theme.palette.background.paper,
      },
    ],
  });

  React.useEffect(() => {
    setData((previousData) => {
      return Object.assign({}, data, {
        ...previousData,
        datasets: [
          {
            ...previousData.datasets[0],
            data: [...chartValues],
          },
        ],
      });
    });
  }, []);

  return (
    <Card>
      <CardHeader
        action={
          <IconButton size="small">
            <RefreshIcon />
          </IconButton>
        }
        title={title}
      />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <Doughnut data={data} options={options(theme)} />
        </div>
      </CardContent>
    </Card>
  );
};

export default PieChart;
