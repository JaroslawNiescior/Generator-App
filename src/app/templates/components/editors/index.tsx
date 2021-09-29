import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Code } from '../../../../components/types/templates/types';
import { ItemEditor } from './components/itemEditor.component';
import { CssEditor } from './components/cssEditor.component';
import { GalleryEditor } from './components/galleryEditor.component';
import { initialStateCode } from './components/initialStateCode';

export const Editors: React.FC<{
  setCode: React.Dispatch<React.SetStateAction<Code>>;
}> = ({ setCode }) => {
  const [codeGallery, setCodeGallery] = useState(initialStateCode.gallery);
  const [codeItem, setCodeItem] = useState(initialStateCode.item);
  const [codeCss, setCodeCss] = useState(initialStateCode.css);

  useEffect(() => {
    setCode({ gallery: codeGallery, item: codeItem, css: codeCss });
  }, [codeGallery, codeItem, codeCss, setCode]);

  return (
    <Grid container spacing={1}>
      <GalleryEditor code={codeGallery} setCode={setCodeGallery} />
      <ItemEditor code={codeItem} setCode={setCodeItem} />
      <CssEditor code={codeCss} setCode={setCodeCss} />
    </Grid>
  );
};
