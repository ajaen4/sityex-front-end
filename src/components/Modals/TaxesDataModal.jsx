import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { tableFontSize } from "constants/constants";

const DemographicDataModal = ({ openedModal, setOpenedModal, data }) => {
  const isOpen = ["Taxes & Indicators"].includes(openedModal);
  const indicators = data?.indicators ? data.indicators : null;
  const taxes = data?.taxes ? data.taxes : null;

  const onClickClose = () => setOpenedModal(false);

  return (
    <Dialog
      open={isOpen}
      onClose={onClickClose}
      sx={{
        "& .MuiPaper-root": {
          margin: 0
        },
        my: 5,
        mx: 1
      }}
    >
      <DialogTitle
        variant="h3"
        sx={{ display: "flex", justifyContent: "center" }}
      >
        {openedModal}
      </DialogTitle>
      <DialogContent sx={{ p: 0 }}>
        <TableContainer
          component={Paper}
          sx={{ borderRadius: 0, overflowY: "auto", maxHeight: "800px" }}
        >
          <Table aria-label="cost table" size="small">
            <TableBody>
              {indicators &&
                Object.keys(indicators).map(
                  (key) =>
                    key !== "purchasing_power_parity" && (
                      <TableRow
                        key={key}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 }
                        }}
                      >
                        <TableCell
                          align="left"
                          sx={{ fontSize: tableFontSize }}
                        >
                          {key.replace(/_/g, " ")}
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{ fontSize: tableFontSize }}
                        >
                          {`${new Intl.NumberFormat("es-ES").format(
                            indicators[key].value
                          )} ${
                            indicators[key].unit ? indicators[key].unit : "%"
                          }`}
                        </TableCell>
                      </TableRow>
                    )
                )}
              {taxes &&
                Object.keys(taxes).map((key) => (
                  <TableRow
                    key={key}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left" sx={{ fontSize: tableFontSize }}>
                      {key.replace(/_/g, " ")}
                    </TableCell>
                    <TableCell align="left" sx={{ fontSize: tableFontSize }}>
                      {`${new Intl.NumberFormat("es-ES").format(
                        taxes[key].value
                      )} ${taxes[key].unit}`}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={onClickClose} variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DemographicDataModal;
