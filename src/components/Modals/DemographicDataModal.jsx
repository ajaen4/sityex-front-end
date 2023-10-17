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
  const isOpen = ["Demographics"].includes(openedModal);

  const areaSize = data?.area_size.split(" ");
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
        <TableContainer component={Paper} sx={{ borderRadius: 0 }}>
          <Table aria-label="cost table" size="small">
            <TableBody>
              <TableRow
                key="population"
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left" sx={{ fontSize: tableFontSize }}>
                  Population
                </TableCell>
                <TableCell align="left" sx={{ fontSize: tableFontSize }}>
                  {`${new Intl.NumberFormat("es-ES").format(data?.population)}`}
                </TableCell>
              </TableRow>
              <TableRow
                key="currency_code"
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left" sx={{ fontSize: tableFontSize }}>
                  Currency
                </TableCell>
                <TableCell align="left" sx={{ fontSize: tableFontSize }}>
                  {`${data?.currency_code}`}
                </TableCell>
              </TableRow>
              <TableRow
                key="country_name"
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left" sx={{ fontSize: tableFontSize }}>
                  Country name
                </TableCell>
                <TableCell align="left" sx={{ fontSize: tableFontSize }}>
                  {data?.name}
                </TableCell>
              </TableRow>
              <TableRow
                key="area_size"
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left" sx={{ fontSize: tableFontSize }}>
                  Country area size
                </TableCell>
                <TableCell align="left" sx={{ fontSize: tableFontSize }}>
                  {areaSize &&
                    `${new Intl.NumberFormat("es-ES").format(areaSize[0])} ${
                      areaSize[1]
                    }${areaSize[2]}`}
                </TableCell>
              </TableRow>
              <TableRow
                key="continent_name"
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left" sx={{ fontSize: tableFontSize }}>
                  Continent
                </TableCell>
                <TableCell align="left" sx={{ fontSize: tableFontSize }}>
                  {`${data?.continent_name}`}
                </TableCell>
              </TableRow>
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
