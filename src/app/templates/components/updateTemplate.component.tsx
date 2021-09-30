import React, { useEffect, useState } from 'react';
import { Paper, Grid, Button, Typography, TextField } from '@mui/material';

import { useStyles } from './styles';
import SaveIcon from '@mui/icons-material/Save';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTemplate, updateTemplate } from '../../../actions/templates';
import { Redirect, useParams } from 'react-router';
import { ROUTES } from '../../../components/consts';
import { Code } from '../../../components/types/templates/types';
import { RootState } from '../../../reducers';
import { initialStateCode } from './editors/components/initialStateCode';
import { Editors } from './editors';
import { GalletyPreview } from './galleryPreview.component';

export const UpdateTemplate: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const classes = useStyles();
  const dispatch = useDispatch();
  const template = useSelector((state: RootState) => state.templates).find(
    (t) => t._id === id,
  );
  const [name, setName] = useState('');
  const [code, setCode] = useState<Code>(initialStateCode);

  useEffect(() => {
    dispatch(fetchTemplate(id));
  }, [id, dispatch]);

  useEffect(() => {
    if(template?.name){
      setName(template.name);
    }
  }, [template]);

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
            Edytuj szablon
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
                updateTemplate(id, {
                  name: name,
                  code: code,
                }),
              );
              return <Redirect to={ROUTES.templates.href} />;
            }}
            startIcon={<SaveIcon />}
          >
            Zapisz
          </Button>
        </Paper>
        <GalletyPreview code={code} />
      </Grid>
    </Grid>
  );
};
