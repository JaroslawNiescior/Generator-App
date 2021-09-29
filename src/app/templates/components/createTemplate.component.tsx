import React, { useState } from 'react';
import { Paper, Grid, Button, Typography, TextField } from '@mui/material';

import { useStyles } from './styles';
import { useDispatch } from 'react-redux';
import { createTemplate } from '../../../actions/templates';
import { Redirect } from 'react-router';
import { ROUTES } from '../../../components/consts';
import { Code } from '../../../components/types/templates/types';
import { initialStateCode } from './editors/components/initialStateCode';
import { Editors } from './editors';
import { GalletyPreview } from './galleryPreview.component';
import AddIcon from '@mui/icons-material/Add';

export const CreateTemplate: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [code, setCode] = useState<Code>(initialStateCode);

  return (
    <Grid className={classes.root} container spacing={1}>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Dodaj szablon
          </Typography>
          <TextField
            placeholder="Nazwa szablonu"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mt: 2, mb: 2 }}
          ></TextField>
          <Editors setCode={setCode} />
          <Button
            fullWidth
            color="primary"
            variant="contained"
            onClick={() => {
              dispatch(
                createTemplate({
                  name: name,
                  code: code,
                }),
              );
              return <Redirect to={ROUTES.templates.href} />;
            }}
            startIcon={<AddIcon />}
          >
            Dodaj
          </Button>
        </Paper>
        <GalletyPreview code={code} />
      </Grid>
    </Grid>
  );
};
