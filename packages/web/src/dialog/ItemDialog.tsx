import React, { useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  TextField,
} from "@material-ui/core";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";

import { Item } from "../pages/Items";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      display: "flex",
      flexDirection: "column",
      margin: "auto",
      width: "fit-content",
    },
    formControl: {
      marginBottom: theme.spacing(2),
      minWidth: 500,
    },
  })
);

interface ItemDialogProps {
  onClose: () => void;
  onSubmit: (title: string, id?: number) => void;
  item?: Item;
}

export function ItemDialog({ onClose, onSubmit, item }: ItemDialogProps) {
  const classes = useStyles();
  const [title, setTitle] = useState(item?.title);

  const handleSubmit = () => {
    if (title) {
      onSubmit(title, item?.id);
    }
  };

  return (
    <Dialog open={true} onClose={onClose} aria-labelledby="item-title">
      <DialogTitle id="item-title">Change Item title</DialogTitle>
      <DialogContent>
        <form className={classes.form} noValidate>
          <FormControl className={classes.formControl}>
            <TextField
              id="title"
              label="Title"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
        <Button disabled={!title} onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
