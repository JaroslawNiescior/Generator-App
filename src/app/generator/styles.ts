import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
  root: {
    '& hr': {
      margin: '10px auto',
    },
  },
  toolbar: {
    paddingRight: 24,
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
    marginBottom: '10px',
  },
  appBarSpacer: {
    minHeight: '64px',
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: '20px',
    paddingBottom: '20px',
  },
  paper: {
    padding: '10px',
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  table: {
    '& td': {
      padding: '16px 5px',
      borderBottom: '0',
    },
    '& td.name': {
      width: '15%',
    },
    '& td.adress': {
      width: '75%',
    },
    '& td.remove': {
      width: '10%',
    },
  },
  contentContainer: {
    padding: '10px',
  },
  customHoverFocusRed: {
    '&:hover, &.Mui-focusVisible': {
      backgroundColor: 'rgba(245, 0, 87, 0.20)',
    },
  },
  customHoverFocusBlue: {
    '&:hover, &.Mui-focusVisible': {
      backgroundColor: 'rgba(63, 81, 181, 0.20)',
    },
  },
}));
