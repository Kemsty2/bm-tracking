import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Card, CardHeader, CardContent, CardActions, Divider, Button } from '@material-ui/core';
import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { options } from './components/chart';

const useStyles = makeStyles((/* theme: Theme */) =>
  createStyles({
    root: {},
    chartContainer: {
      height: 400,
      position: 'relative',
    },
    actions: {
      justifyContent: 'flex-end',
    },
  }));

type Props = {
  chartValues: number[];
  label: string;
};

const PieChart: React.FC<Props> = ({ chartValues, label }) => {
  const classes = useStyles();
  const theme = useTheme();

  const [data, setData] = React.useState({
    labels: ['1 Aug', '2 Aug', '3 Aug', '4 Aug', '5 Aug', '6 Aug'],
    datasets: [
      {
        label,
        data: [0, 0, 0, 0, 0, 0, 0],
        backgroundColor: theme.palette.primary.main,
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
  }, [chartValues, data]);

  return (
    <Card>
      <CardHeader
        action={
          <Button size="small" variant="text">
            Last 7 days <ArrowDropDownIcon />
          </Button>
        }
        title={label}
      />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <Bar data={data} options={options(theme)} />
        </div>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button color="primary" size="small" variant="text">
          Overview <ArrowRightIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

export default PieChart;
