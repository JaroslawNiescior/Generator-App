import {
  Alert,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Slider,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { Form, Formik } from 'formik';
import { MultipleItems } from '../../components/types/generator/types';
import AddIcon from '@mui/icons-material/Add';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';

const useStyles = makeStyles({
  contentContainer: {
    padding: '10px',
  },
  title: {
    flexGrow: 1,
    marginBottom: '10px',
  },
  table: {
    '& td': {
      padding: '16px 5px',
      borderBottom: '0',
    },
    '& td.name': {
      width: '10%',
    },
    '& td.adress': {
      width: '45%',
    },
    '& td.remove': {
      width: '10%',
    },
    '& td.slider': {
      width: '27%',
      paddingInline: '2%',
    },
    '& td.ext': {
      width: '8%',
    },
  },
});

const BoxShadow =
  '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

const CustomSlider = styled(Slider)(({ theme }) => ({
  color: theme.palette.mode === 'dark' ? '#3880ff' : '#3880ff',
  height: 2,
  padding: '15px 0',
  '& .MuiSlider-thumb': {
    height: 28,
    width: 28,
    backgroundColor: '#fff',
    boxShadow: BoxShadow,
    '&:focus, &:hover, &.Mui-active': {
      boxShadow:
        '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        boxShadow: BoxShadow,
      },
    },
  },
  '& .MuiSlider-valueLabel': {
    fontSize: 12,
    fontWeight: 'normal',
    top: -6,
    backgroundColor: 'unset',
    color: theme.palette.text.primary,
    '&:before': {
      display: 'none',
    },
    '& *': {
      background: 'transparent',
      color: theme.palette.mode === 'dark' ? '#fff' : '#000',
    },
  },
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-rail': {
    opacity: 0.5,
    backgroundColor: '#bfbfbf',
  },
  '& .MuiSlider-mark': {
    backgroundColor: '#bfbfbf',
    height: 8,
    width: 1,
    '&.MuiSlider-markActive': {
      opacity: 1,
      backgroundColor: 'currentColor',
    },
  },
}));

export const ItemFormMultiple: React.FC<{
  onSubmit: (values: MultipleItems) => void;
}> = ({ onSubmit }) => {
  const classes = useStyles();

  const [sliderValue, setValue2] = useState<number[]>([1, 10]);

  const handleChangeSlider = (
    _event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < 3) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 250 - 3);
        setValue2([clamped, clamped + 3]);
      } else {
        const clamped = Math.max(newValue[1], 3);
        setValue2([clamped - 3, clamped]);
      }
    } else {
      setValue2(newValue as number[]);
    }
  };

  return (
    <Formik
      initialValues={{
        name: '',
        adress: '',
        start: 1,
        end: 10,
        ext: 'jpg',
      }}
      validate={({ name, adress, ext }: MultipleItems) => {
        const errors: { [value: string]: string } = {};
        if (!name) {
          errors.name = 'Brak wpowadzonej nazwy!';
        }

        if (!adress) {
          errors.adress = 'Brak wprowadzonego adresu!';
        }

        if (!ext) {
          errors.ext = 'Brak wybranej wartości rozszerzenia!';
        }

        return errors;
      }}
      onSubmit={(values) => {
        return onSubmit({
          ...values,
          start: sliderValue[0],
          end: sliderValue[1],
        });
      }}
    >
      {({ values, handleChange, handleBlur, handleSubmit, errors }) => {
        return (
          <Form onSubmit={handleSubmit}>
            <TableContainer
              className={classes.contentContainer}
              component={Paper}
            >
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                className={classes.title}
              >
                Dodaj wiele elementów
              </Typography>
              <Table className={classes.table} aria-label="simple table">
                <TableBody>
                  <TableRow>
                    <TableCell className="name">
                      <TextField
                        fullWidth
                        error={!!errors.name}
                        id="name"
                        name="name"
                        label="Nazwa"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        size="small"
                      />
                    </TableCell>
                    <TableCell className="adress" align="left">
                      <TextField
                        fullWidth
                        error={!!errors.adress}
                        id="adress"
                        name="adress"
                        label="Adres"
                        value={values.adress}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        size="small"
                      />
                    </TableCell>
                    <TableCell className="slider" align="left">
                      <CustomSlider
                        min={1}
                        max={250}
                        getAriaLabel={() => 'Minimum distance shift'}
                        value={sliderValue}
                        onChange={handleChangeSlider}
                        valueLabelDisplay="on"
                        disableSwap
                      />
                    </TableCell>
                    <TableCell className="ext" align="left">
                      <FormControl fullWidth sx={{ minWidth: 120 }}>
                        <InputLabel id="ext-label">Rozszerzenie</InputLabel>
                        <Select
                          labelId="ext-label"
                          id="ext"
                          name="ext"
                          value={values.ext}
                          label="Rozszerzenie"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          size="small"
                        >
                          <MenuItem value={'png'}>png</MenuItem>
                          <MenuItem value={'jpg'}>jpg</MenuItem>
                          <MenuItem value={'jpeg'}>jpeg</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>

                    <TableCell className="remove" align="left">
                      <Button
                        fullWidth
                        color="primary"
                        variant="contained"
                        type="submit"
                        startIcon={<AddIcon />}
                      >
                        Dodaj
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Stack sx={{ width: '100%' }} spacing={1}>
                {Object.values(errors).map((error) => (
                  <Alert severity="error">{error}</Alert>
                ))}
              </Stack>
            </TableContainer>
          </Form>
        );
      }}
    </Formik>
  );
};
