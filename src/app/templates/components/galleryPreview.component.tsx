import { Paper, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { Code } from '../../../components/types/templates/types';
import { useStyles } from './styles';
import ReactHtmlParser from 'react-html-parser';
import { Item } from '../../../components/types/generator/types';
import placeholder from '../../../assets/placeholder.png';

export const GalletyPreview: React.FC<{ code: Code, items?: Item[] }> = ({ code, items }) => {
  const classes = useStyles();
  const { css } = code;
  const [codeFinal, setCodeFinal] = useState('');

  const mockItem: Item = {
    id: 0,
    name: 'name_1',
    adress: placeholder,
  };

  console.log(placeholder)

  const mockItems: Item[] = Array(10).fill(mockItem);

  useEffect(() => {
    setCodeFinal(generateHTML(items ?? mockItems, code) + '\n' + css);
  }, [code, items, mockItems, css]);

  return (
    <Paper className={classes.paper} sx={{ mt: 2, mb: 2 }}>
      <Typography
        component="h1"
        variant="h6"
        color="inherit"
        noWrap
        className={classes.title}
      >
        Podgląd na żywo
      </Typography>
      {ReactHtmlParser(codeFinal)}
    </Paper>
  );
};

export const generateHTML = (items: Item[], code: Code) => {
  let newItems = '';
  console.log(items);
  console.log(code);
  items.forEach((item) => {
    newItems +=
      '\n' +
      code.item
        .replaceAll('$adress', item.adress)
        .replaceAll('$name', item.name);
  });
  return code.gallery.replace('$items', newItems);
};
