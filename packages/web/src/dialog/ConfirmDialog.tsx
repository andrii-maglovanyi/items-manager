import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

import { Item } from "../types";

interface ConfirmDialogProps {
  onClose: () => void;
  onConfirm: (id: number) => void;
  open: boolean;
  item?: Item;
}

export function ConfirmDialog({
  onClose,
  onConfirm,
  open,
  item,
}: ConfirmDialogProps) {
  return item ? (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="confirm-item-deletion"
      aria-describedby="confirm-item-deletion-description"
    >
      <DialogTitle id="confirm-item-deletion">Delete item</DialogTitle>
      <DialogContent>
        <DialogContentText id="confirm-item-deletion-description">
          Are you sure you would like to delete item?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={() => onConfirm(item.id)} color="secondary" autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  ) : null;
}
