import {
  Alert,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
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

const MAX_MULIPLE_ADD = 201;

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
      width: '15%',
    },
    '& td.adress': {
      width: '45%',
    },
    '& td.remove': {
      width: '10%',
    },
    '& td.start': {
      width: '8%',
    },
    '& td.end': {
      width: '8%',
    },
    '& td.ext': {
      width: '8%',
    },
  },
});

export const ItemFormMultiple: React.FC<{
  onSubmit: (values: MultipleItems) => void;
}> = ({ onSubmit }) => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        name: '',
        adress: '',
        start: 1,
        end: 10,
        ext: 'jpg',
      }}
      validate={({ name, adress, start, end, ext }: MultipleItems) => {
        const errors: { [value: string]: string } = {};
        if (!name) {
          errors.name = 'Brak wpowadzonej nazwy!';
        }

        if (!adress) {
          errors.adress = 'Brak wprowadzonego adresu!';
        }

        if (!start) {
          errors.start = 'Brak wpisanej wartości początkowej!';
        } else if (start < 0) {
          errors.start = 'Wartość początkowa mniejsza od 0!';
        }

        if (!end) {
          errors.end = 'Brak wpisanej wartości końcowej!';
        } else if (end < 0) {
          errors.end = 'Wartość końcowa mniejsza od 0!';
        } else if (end <= start) {
          errors.end = 'Wartość końcowa mniejsza od początkowej!';
        } else if (start + end > MAX_MULIPLE_ADD) {
          errors.end = 'Suma wartości większa od dopuszczalnego limitu!';
        }

        if (!ext) {
          errors.ext = 'Brak wybranej wartości rozszerzenia!';
        }

        return errors;
      }}
      onSubmit={onSubmit}
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
                    <TableCell className="start" align="left">
                      <TextField
                        fullWidth
                        error={!!errors.start}
                        id="start"
                        name="start"
                        label="Od"
                        type="number"
                        value={values.start}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        size="small"
                      />
                    </TableCell>
                    <TableCell className="end" align="left">
                      <TextField
                        fullWidth
                        error={!!errors.end}
                        id="end"
                        name="end"
                        label="Do"
                        type="number"
                        value={values.end}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        size="small"
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
                          <MenuItem value={'svg'}>svg</MenuItem>
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
