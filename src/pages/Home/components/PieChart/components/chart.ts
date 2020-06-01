import { Theme } from '@material-ui/core/styles';

export const options = (theme: Theme) => ({
  legend: {
    display: true,
  },
  responsive: true,
  maintainAspectRatio: false,
  animation: true,
  cutoutPercentage: 80,
  layout: { padding: 0 },
  tooltips: {
    enabled: true,
    mode: 'index',
    intersect: false,
    borderWidth: 1,
    borderColor: theme.palette.divider,
    backgroundColor: theme.palette.background.paper,
    titleFontColor: theme.palette.text.primary,
    bodyFontColor: theme.palette.text.secondary,
    footerFontColor: theme.palette.text.secondary,
  },
});
