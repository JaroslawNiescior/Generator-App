import {
  DragDropContext,
  Droppable,
  Draggable,
  DraggingStyle,
  NotDraggingStyle,
  DropResult,
  ResponderProvided,
} from 'react-beautiful-dnd';
import { Item } from '../../components/types/generator/types';
import { Form, Formik } from 'formik';
import { ElementType, ReactNode, useState } from 'react';
import { makeStyles } from '@mui/styles';
import {
  Paper,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Tooltip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  TableRowClasses,
  Theme,
  TableBodyClasses,
  Stack,
} from '@mui/material';
import { CommonProps } from '@mui/material/OverridableComponent';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { SxProps } from '@mui/system';

interface Column {
  id: 'name' | 'adress' | 'remove';
  label: string;
  width?: string;
  align?: 'right' | 'center';
}

const columns: Column[] = [
  { id: 'name', label: 'Nazwa', width: '25%' },
  { id: 'adress', label: 'Adress', width: '60%' },
  { id: 'remove', label: 'Akcje', width: '15%', align: 'center' },
];

const useStyles = makeStyles({
  root: {
    width: '100%',
    padding: '10px',
    '& h1.title': {
      flexGrow: 1,
      marginBottom: '16px',
    },
  },
  container: {
    maxHeight: '66vh',
  },
  customHoverFocusRed: {
    '&:hover, &.Mui-focusVisible': {
      backgroundColor: 'rgba(245, 0, 87, 0.20)',
    },
  },
  customHoverFocusBlue: {
    '&:hover, &.Mui-focusVisible': {
      backgroundColor: 'rgba(63, 81, 181, 0.20)',
    },
  },
});

const getItemStyle = (
  isDragging: boolean,
  draggableStyle: DraggingStyle | NotDraggingStyle | undefined,
) => ({
  ...draggableStyle,
  ...(isDragging && {
    background: 'rgb(235,235,235)',
  }),
});

const reorder = (
  list: Item[],
  startIndex: number,
  endIndex: number,
): Item[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

interface ItemTableType {
  items: Item[];
  setItems: (items: Item[]) => void;
}

export const ItemTable: React.FC<ItemTableType> = ({ items, setItems }) => {
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

  const removeItem = (item: Item) => {
    const newItems = items.filter(({ id }) => id !== item.id);
    setItems(
      newItems.map((i, index) => {
        return { ...i, id: index };
      }),
    );
  };

  const removeAllItems = () => {
    setItems([]);
  };

  const saveItem = (item: Item) => {
    let newItems = [...items];
    newItems[items.findIndex((i) => i.id === item.id)] = item;

    setItems(newItems);
  };

  const onDragEnd = (
    result: DropResult,
    _provided: ResponderProvided,
  ): void => {
    if (!result.destination) {
      return;
    }

    setItems(reorder(items, result.source.index, result.destination.index));
  };

  return (
    <Paper className={classes.root}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          className="title"
        >
          Tabela elementów
        </Typography>
        <Button onClick={() => removeAllItems()}>Wyczyść elementy</Button>
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
          <TableBody component={DroppableComponent(onDragEnd)}>
            {items
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item, index) => (
                <>
                  <ItemTableRow
                    item={item}
                    index={index}
                    saveItem={saveItem}
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
        count={items.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

interface ItemTableRowType {
  item: Item;
  index: number;
  removeItem: (item: Item) => void;
  saveItem: (item: Item) => void;
}

export const ItemTableRow: React.FC<ItemTableRowType> = ({
  item,
  removeItem,
  saveItem,
  index,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const RemoveButton: React.FC<{ selectedItem: Item }> = ({ selectedItem }) => (
    <Tooltip title="Usuń">
      <IconButton
        className={classes.customHoverFocusRed}
        aria-label="Delete"
        color="error"
        onClick={() => removeItem(selectedItem)}
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
        onClick={() => setOpen(true)}
      >
        <EditIcon />
      </IconButton>
    </Tooltip>
  );

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <TableRow
        hover
        role="checkbox"
        tabIndex={-1}
        component={DraggableComponent(item.id.toString(), index)}
        key={item.id}
      >
        {columns.map((column) => (
          <TableCell key={column.id} align={column.align}>
            {column.id === 'remove' ? (
              <>
                <EditButton />
                <RemoveButton selectedItem={item} />
              </>
            ) : (
              item[column.id]
            )}
          </TableCell>
        ))}
      </TableRow>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <Formik
          initialValues={item}
          onSubmit={(values) => {
            saveItem(values);
            setOpen(false);
          }}
        >
          {({ values, handleChange, handleBlur, handleSubmit }) => {
            return (
              <Form onSubmit={handleSubmit}>
                <DialogTitle>Edytuj</DialogTitle>
                <DialogContent>
                  <TextField
                    autoFocus
                    margin="dense"
                    fullWidth
                    id="name"
                    name="name"
                    label="Nazwa"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    fullWidth
                    id="adress"
                    name="adress"
                    label="Adres"
                    value={values.adress}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="error">
                    Anuluj
                  </Button>
                  <Button type="submit" color="success">
                    Zapisz
                  </Button>
                </DialogActions>
              </Form>
            );
          }}
        </Formik>
      </Dialog>
    </>
  );
};

const DraggableComponent =
  (id: string, index: number) =>
  (
    props: JSX.IntrinsicAttributes & { component: ElementType<any> } & {
      children?: ReactNode;
      classes?: Partial<TableRowClasses> | undefined;
      hover?: boolean | undefined;
      selected?: boolean | undefined;
      sx?: SxProps<Theme> | undefined;
    } & CommonProps &
      Omit<any, keyof CommonProps | 'children' | 'hover' | 'selected' | 'sx'>,
  ) => {
    return (
      <Draggable draggableId={id} index={index}>
        {(provided, snapshot) => (
          <TableRow
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={getItemStyle(
              snapshot.isDragging,
              provided.draggableProps.style,
            )}
            {...props}
          >
            {props.children}
          </TableRow>
        )}
      </Draggable>
    );
  };

const DroppableComponent =
  (onDragEnd: (result: DropResult, _provided: ResponderProvided) => void) =>
  (
    props: JSX.IntrinsicAttributes & { component: ElementType<any> } & {
      children?: ReactNode;
      classes?: Partial<TableBodyClasses> | undefined;
      sx?: SxProps<Theme> | undefined;
    } & CommonProps &
      Omit<any, keyof CommonProps | 'children' | 'sx'>,
  ) => {
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={'1'} direction="vertical">
          {(provided) => {
            return (
              <TableBody
                ref={provided.innerRef}
                {...provided.droppableProps}
                {...props}
              >
                {props.children}
                {provided.placeholder}
              </TableBody>
            );
          }}
        </Droppable>
      </DragDropContext>
    );
  };
