import { Grid, Typography } from '@mui/material';
import { TooltipInfo } from '../../../../../components/TooltipInfo';
import { CustomEditor } from './CustomEditor.component';
import { useStyles } from '../../styles';

export const ItemEditor: React.FC<{
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
        Edytuj pozycję
        <TooltipInfo
          message={
            <div>
              <p>Edytuj komponent pozycji.</p>
              <p>
                $adress - zmienna w której pojawią się podany adress pozycji.
              </p>
              <p>$name - zmienna w której pojawią się podana nazwa pozycji.</p>
            </div>
          }
        />
      </Typography>
      <CustomEditor code={code} setCode={setCode} />
    </Grid>
  );
};
