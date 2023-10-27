import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { tableFontSize } from "constants/constants";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme, styled } from "@mui/material/styles";

const WeatherDataModal = ({ openedModal, modalType, onClose, data }) => {
  const isOpen = openedModal === modalType;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.secondary[200],
      color: theme.palette.common.white
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14
    }
  }));

  return (
    <Dialog
      open={isOpen}
      maxWidth={isMobile ? "xs" : "lg"}
      fullWidth={isMobile ? null : true}
      onClose={onClose}
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
      <DialogContent sx={{ p: 0, overflowY: "hidden" }}>
        <TableContainer
          component={Paper}
          sx={{ borderRadius: 0, overflowY: "auto", maxHeight: "450px" }}
        >
          <Table stickyHeader aria-label="cost table" size="small">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left" sx={{ fontSize: tableFontSize }}>
                  Month
                </StyledTableCell>
                <StyledTableCell align="left" sx={{ fontSize: tableFontSize }}>
                  Avg temperature (ºC)
                </StyledTableCell>
                <StyledTableCell align="left" sx={{ fontSize: tableFontSize }}>
                  Avg cloud cover (%)
                </StyledTableCell>
                <StyledTableCell align="left" sx={{ fontSize: tableFontSize }}>
                  Avg daily precipitation (hours)
                </StyledTableCell>
                <StyledTableCell align="left" sx={{ fontSize: tableFontSize }}>
                  Avg humidity (%)
                </StyledTableCell>
                <StyledTableCell align="left" sx={{ fontSize: tableFontSize }}>
                  Avg air quality
                </StyledTableCell>
                <StyledTableCell align="left" sx={{ fontSize: tableFontSize }}>
                  Avg sunrise (h:m:s)
                </StyledTableCell>
                <StyledTableCell align="left" sx={{ fontSize: tableFontSize }}>
                  Avg sunset (h:m:s)
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data && Object.keys(data).map((key) => (
                <TableRow
                  key={key}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    align="left"
                    sx={{ fontSize: tableFontSize, flex: 2 }}
                  >
                    {key}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ fontSize: tableFontSize, flex: 2 }}
                  >
                    {data[key].avg_daily_temp_celsius}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ fontSize: tableFontSize, flex: 2 }}
                  >
                    {data[key].avg_cloud_cover_percent}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ fontSize: tableFontSize, flex: 2 }}
                  >
                    {data[key].avg_daily_precipitation_hours}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ fontSize: tableFontSize, flex: 2 }}
                  >
                    {data[key].avg_humidity_2m_percent}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ fontSize: tableFontSize, flex: 2 }}
                  >
                    {data[key].avg_european_aqi}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ fontSize: tableFontSize, flex: 2 }}
                  >
                    {data[key].avg_sunrise_hour.padStart(2, "0") + ":" + data[key].avg_sunrise_minute.padStart(2, "0") + ":" + data[key].avg_sunrise_second.padStart(2, "0")}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ fontSize: tableFontSize, flex: 2 }}
                  >
                    {data[key].avg_sunset_hour.padStart(2, "0") + ":" + data[key].avg_sunset_minute.padStart(2, "0") + ":" + data[key].avg_sunset_second.padStart(2, "0")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={onClose} variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WeatherDataModal;
