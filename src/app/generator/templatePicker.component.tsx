import {
  Paper,
  Stack,
  Typography,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Radio,
} from '@mui/material';
import moment from 'moment';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../components/consts';
import { Template } from '../../components/types/templates/types';
import { useStyles } from './styles';

interface Column {
  id: 'name' | 'createdAt' | 'updatedAt' | 'actions';
  label: string;
  width?: string;
  align?: 'right' | 'center';
}

const columns: Column[] = [
  { id: 'actions', label: 'Wybierz', width: '10%' },
  { id: 'name', label: 'Nazwa', width: '30%' },
  { id: 'createdAt', label: 'Stworzony', width: '30%' },
  { id: 'updatedAt', label: 'Zaktualizowany', width: '30%' },
];

export const TemplatePicker: React.FC<{
  templates: Template[];
  selectedTemplate: Template;
  setSelectedTemplate: React.Dispatch<React.SetStateAction<Template>>;
}> = ({ templates, selectedTemplate, setSelectedTemplate }) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        sx={{
          padding: '10px',
        }}
      >
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          className="title"
        >
          Tabela szablonów
        </Typography>
        <Button to={ROUTES.templateCreate.href} component={Link}>
          Dodaj szablon
        </Button>
      </Stack>
      <TableContainer className={classes.container}>
        <Table size="small" stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ width: column.width }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {templates
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item, index) => (
                <>
                  <TemplateTableRow
                    item={item}
                    index={index}
                    selectedTemplate={selectedTemplate}
                    setSelectedTemplate={setSelectedTemplate}
                  />
                </>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        component="div"
        count={templates.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

interface ItemTableRowType {
  item: Template;
  index: number;
  selectedTemplate: Template;
  setSelectedTemplate: React.Dispatch<React.SetStateAction<Template>>;
}

export const TemplateTableRow: React.FC<ItemTableRowType> = ({
  item,
  selectedTemplate,
  setSelectedTemplate,
}) => {
  const isItemSelected = item._id !== selectedTemplate?._id ? false : true;

  return (
    <TableRow
      hover
      onClick={() => setSelectedTemplate(item)}
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={item._id}
      selected={isItemSelected}
    >
      {columns.map((column) => (
        <TableCell key={column.id} align={column.align}>
          {column.id === 'actions' ? (
            <Radio
              value={item._id}
              checked={isItemSelected}
              onChange={() => setSelectedTemplate(item)}
            />
          ) : column.id === 'createdAt' || column.id === 'updatedAt' ? (
            moment(item[column.id]).format('DD.MM.YYYY HH:mm')
          ) : (
            item[column.id]
          )}
        </TableCell>
      ))}
    </TableRow>
  );
};
