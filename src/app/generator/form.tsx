import {
  TableContainer,
  Paper,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Button,
} from '@mui/material';
import { Formik, Form } from 'formik';
import { useStyles } from './styles';
import { Item } from '../../components/types/generator/types';
import AddIcon from '@mui/icons-material/Add';

export const ItemForm: React.FC<{
  onSubmit: (item: Omit<Item, 'id'>) => void;
}> = ({ onSubmit }) => {
  const classes = useStyles();
  return (
    <Formik
      initialValues={{
        name: '',
        adress: '',
      }}
      onSubmit={onSubmit}
    >
      {({ values, handleChange, handleBlur, handleSubmit }) => {
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
                Dodaj element
              </Typography>
              <Table className={classes.table} aria-label="simple table">
                <TableBody>
                  <TableRow>
                    <TableCell className="name">
                      <TextField
                        fullWidth
                        id="name"
                        name="name"
                        label="Nazwa"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        size='small'
                      />
                    </TableCell>
                    <TableCell className="adress" align="left">
                      <TextField
                        fullWidth
                        id="adress"
                        name="adress"
                        label="Adres"
                        value={values.adress}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        size='small'
                      />
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
            </TableContainer>
          </Form>
        );
      }}
    </Formik>
  );
};
