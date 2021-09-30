import React, { useEffect, useState } from 'react';
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Button,
  IconButton,
  Tooltip,
  Stack,
} from '@mui/material';

import moment from 'moment';

import { useStyles } from './components/styles';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTemplate, fetchTemplates } from '../../actions/templates';
import { RootState } from '../../reducers';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Template } from '../../components/types/templates/types';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../components/consts';

interface Column {
  id: 'name' | 'createdAt' | 'updatedAt' | 'actions';
  label: string;
  width?: string;
  align?: 'right' | 'center';
}

const columns: Column[] = [
  { id: 'name', label: 'Nazwa', width: '25%' },
  { id: 'createdAt', label: 'Stworzony', width: '25%' },
  { id: 'updatedAt', label: 'Zaktualizowany', width: '25%' },
  { id: 'actions', label: 'Akcje', width: '25%', align: 'center' },
];

export const Templates: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const templates = useSelector((state: RootState) => state.templates);

  moment.locale('pl');

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

  const removeItem = (id: string) => {
    dispatch(deleteTemplate(id));
  };

  useEffect(() => {
    dispatch(fetchTemplates());
  }, [dispatch]);

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
                  <ItemTableRow
                    item={item}
                    index={index}
                    removeItem={removeItem}
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
  removeItem: (id: string) => void;
}

export const ItemTableRow: React.FC<ItemTableRowType> = ({
  item,
  removeItem,
}) => {
  const classes = useStyles();

  const RemoveButton: React.FC<{ selectedItem: Template }> = ({
    selectedItem,
  }) => (
    <Tooltip title="Usuń">
      <IconButton
        className={classes.customHoverFocusRed}
        aria-label="Delete"
        color="error"
        onClick={() => removeItem(selectedItem._id!)}
      >
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  );

  const EditButton: React.FC = () => (
    <Tooltip title="Edytuj">
      <IconButton
        className={classes.customHoverFocusBlue}
        aria-label="Edit"
        color="info"
        component={Link}
        to={`${ROUTES.templateUpdate.preHref}/${item._id}`}
      >
        <EditIcon />
      </IconButton>
    </Tooltip>
  );

  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={item._id}>
      {columns.map((column) => (
        <TableCell key={column.id} align={column.align}>
          {column.id === 'actions' ? (
            <>
              <EditButton />
              <RemoveButton selectedItem={item} />
            </>
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
