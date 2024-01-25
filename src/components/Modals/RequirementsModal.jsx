import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const RequirementsModal = ({ title, message, showModal, setShowModal }) => {
  const toggle = () => setShowModal(!showModal);

  return (
      <Dialog open={showModal} onClose={toggle} sx={{ mt: 4, mx: 0}}>
        <DialogTitle style={{ fontSize: 18, textAlign: "center" }}>
          {title}
        </DialogTitle>
        <DialogContent>{message}</DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={toggle} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
  );
};

export default RequirementsModal;
