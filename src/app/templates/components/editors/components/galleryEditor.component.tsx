import { Grid, Typography } from '@mui/material';
import { TooltipInfo } from '../../../../../components/TooltipInfo';
import { CustomEditor } from './CustomEditor.component';
import { useStyles } from './styles';

export const GalleryEditor: React.FC<{
  code: string;
  setCode: (value: React.SetStateAction<string>) => void;
}> = ({ code, setCode }) => {
  const classes = useStyles();
  return (
    <Grid item xs={4} className={classes.contentContainer}>
      <Typography
        component="h1"
        variant="h6"
        color="inherit"
        noWrap
        className={classes.title}
      >
        Edytuj galerię
        <TooltipInfo
          message={
            <div>
              <p>Edytuj główny komponent galerii.</p>
              <p>$items - zmienna w której pojawią się dodane pozycje.</p>
            </div>
          }
        />
      </Typography>
      <CustomEditor code={code} setCode={setCode} />
    </Grid>
  );
};
