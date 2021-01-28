import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";

import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";

import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
} from "@material-ui/core";

import { UserData } from "../types";

import { useSelector, useDispatch } from "react-redux";

import { ConfirmDialog } from "../dialog/ConfirmDialog";
import { ItemDialog } from "../dialog/ItemDialog";

import { State } from "../types";

import { openActionCreator, closeActionCreator } from "../redux";

import { GET_ITEMS_QUERY } from "../operations/queries";
import {
  CREATE_ITEM_MUTATION,
  UPDATE_ITEM_MUTATION,
  DELETE_ITEM_MUTATION,
} from "../operations/mutations";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    layer: {
      margin: "auto",
      marginTop: theme.spacing(5),
      maxWidth: "90vw",
    },
    tableRow: {
      cursor: "pointer",
    },
  })
);

export interface Item {
  id: number;
  title: string;
  user: UserData;
}

export const Items = () => {
  const dispatch = useDispatch();
  const dialog = useSelector((state: State) => state.dialog);

  const { loading, error, data } = useQuery(GET_ITEMS_QUERY);
  const [editedItem, setEditedItem] = useState<Item | undefined>();
  const classes = useStyles();

  const mutationOptions = {
    onCompleted: () => {
      dispatch(closeActionCreator());
      setEditedItem(undefined);
    },
    refetchQueries: [{ query: GET_ITEMS_QUERY }],
  };

  const [addItem] = useMutation(CREATE_ITEM_MUTATION, mutationOptions);
  const [updateItem] = useMutation(UPDATE_ITEM_MUTATION, mutationOptions);
  const [deleteItem] = useMutation(DELETE_ITEM_MUTATION, mutationOptions);

  const handleAddItem = () => {
    setEditedItem(undefined);
    dispatch(openActionCreator("edit"));
  };

  const handleEdit = (item: Item) => {
    setEditedItem(item);
    dispatch(openActionCreator("edit"));
  };

  const handleDelete = (item: Item) => {
    setEditedItem(item);
    dispatch(openActionCreator("confirm"));
  };

  const handleSubmit = (title: string, id?: number) => {
    if (id) {
      updateItem({
        variables: {
          id,
          title,
        },
      });
    } else {
      addItem({ variables: { title } });
    }
  };

  const handleConfirm = (id: number) => {
    deleteItem({ variables: { id } });
  };

  const handleClose = () => {
    dispatch(closeActionCreator());
  };

  return (
    <>
      {loading || error || data.items.length === 0 ? (
        <Grid container className={classes.layer} justify="center">
          {loading ? "Loading..." : error ? "Error..." : "No items..."}
        </Grid>
      ) : (
        <TableContainer className={classes.layer} component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>User</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.items.map((item: Item) => (
                <TableRow
                  key={item.id}
                  className={classes.tableRow}
                  onClick={() => handleEdit(item)}
                >
                  <TableCell component="th" scope="row">
                    {item.title}
                  </TableCell>
                  <TableCell>{item.user.fullName}</TableCell>
                  <TableCell align="right">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(item);
                      }}
                      color="secondary"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Grid container className={classes.layer} justify="flex-end">
        <Button variant="contained" onClick={handleAddItem}>
          Add item
        </Button>
      </Grid>

      <ConfirmDialog
        onClose={handleClose}
        onConfirm={handleConfirm}
        open={dialog === "confirm"}
        item={editedItem}
      />
      {dialog === "edit" && (
        <ItemDialog
          onClose={handleClose}
          onSubmit={handleSubmit}
          item={editedItem}
        />
      )}
    </>
  );
};
