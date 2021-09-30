import React, { useEffect, useState } from 'react';
import { ItemForm } from './form';
import { ItemTable } from './table';
import {
  CodeObject,
  Item,
  MultipleItems,
} from '../../components/types/generator/types';
import { useStyles } from './styles';
import { ItemFormMultiple } from './form-multiple';
import {
  Paper,
  Divider,
  Button,
  Box,
  CircularProgress,
  Grid,
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';

import { Code } from './code';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducers';
import { Template } from '../../components/types/templates/types';
import { TemplatePicker } from './templatePicker.component';
import {
  GalletyPreview,
  generateHTML,
} from '../templates/components/galleryPreview.component';
import { fetchTemplates } from '../../actions/templates';

export const Generator: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [items, setItems] = useState<Item[]>([]);
  const [code, setCode] = useState<CodeObject>({
    html: '',
    css: '',
  });
  const [generate, setGenerate] = useState(false);
  const [generateLoader, setGenerateLoader] = useState(false);
  const templates = useSelector((state: RootState) => state.templates);
  const [selectedTemplate, setSelectedTemplate] = useState<Template>(
    templates[0],
  );

  const addItem = (item: Omit<Item, 'id'>) => {
    const newItem = {
      ...item,
      id: items.length,
    };
    setItems([...items, newItem]);
  };

  const addMultipleItems = ({
    name,
    adress,
    start,
    end,
    ext,
  }: MultipleItems) => {
    const newItems = Array.from(
      Array.from(Array(Math.ceil(end - start + 1)).keys()),
      (x) => start + x,
    ).map((item, index) => {
      return {
        id: items.length + index,
        name: `${name}${item}`,
        adress: `${adress}/${item}.${ext}`,
      };
    });
    setItems(items.concat(newItems));
  };

  const generateCode = async () => {
    setGenerateLoader(true);
    const html = generateHTML(items, selectedTemplate.code);
    const css = selectedTemplate.code.css;
    setCode({ html, css });
    setGenerateLoader(false);
    setGenerate(true);
  };

  useEffect(() => {
    dispatch(fetchTemplates());
  }, [dispatch]);

  useEffect(() => {
    setGenerate(false);
  }, [items]);

  useEffect(() => {
    setSelectedTemplate(templates[0]);
  }, [templates]);

  return (
    <Grid className={classes.root} item xs={12} spacing={1}>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <TemplatePicker
            templates={templates}
            selectedTemplate={selectedTemplate}
            setSelectedTemplate={setSelectedTemplate}
          />
          <Divider component="hr" />
          <ItemForm onSubmit={addItem} />
          <Divider component="hr" />
          <ItemFormMultiple onSubmit={addMultipleItems} />
          <Divider component="hr" />
          <ItemTable items={items} setItems={setItems} />
          <Divider component="hr" />
          {!!(items.length && selectedTemplate) && (
            <Paper>
              <Button
                fullWidth
                color="primary"
                variant="contained"
                onClick={() => generateCode()}
                startIcon={<AddIcon />}
                size="large"
              >
                Generuj
              </Button>
            </Paper>
          )}
          {generate &&
            (generateLoader ? (
              <Box sx={{ display: 'flex' }}>
                <CircularProgress />
              </Box>
            ) : (
              <>
                <Divider component="hr" />
                <Code code={code} />

                <Divider component="hr" />
                {<GalletyPreview code={selectedTemplate.code} items={items} />}
              </>
            ))}
        </Paper>
      </Grid>
    </Grid>
  );
};
