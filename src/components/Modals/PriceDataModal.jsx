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
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const DataModal = ({ openedModal, setOpenedModal, data }) => {
  const onClickClose = () => setOpenedModal(false);
  const fontSize = "0.9em";
  const isOpen = ["Employment", "Month costs", "Social"].includes(openedModal);

  const titleCategories = {
    Employment: ["salaries and financing"],
    "Month costs": [
      "markets",
      "utilities (monthly)",
      "rent per month",
      "childcare",
      "transportation"
    ],
    Social: ["restaurants", "sports and leisure"]
  };

  const filteredCosts = [];
  for (const cost of data) {
    const category = cost.category.toLowerCase();
    const categories = titleCategories[openedModal];
    if (categories?.includes(category)) filteredCosts.push(cost);
  }

  return (
    <Dialog open={isOpen} onClose={onClickClose} sx={{ my: 5 }}>
      <DialogTitle
        variant="h3"
        sx={{ display: "flex", justifyContent: "center" }}
      >
        {openedModal}
      </DialogTitle>
      <DialogContent sx={{ width: "100%", p: 0 }}>
        <TableContainer component={Paper} sx={{ borderRadius: 0 }}>
          <Table aria-label="cost table" size="small">
            <TableHead>
              <TableRow>
                <TableCell align="left" sx={{ fontSize: fontSize }}>
                  Subcategory
                </TableCell>
                <TableCell align="left" sx={{ fontSize: fontSize }}>
                  Cost
                </TableCell>
                <TableCell align="left" sx={{ fontSize: fontSize }}>
                  Currency
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCosts?.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left" sx={{ fontSize: fontSize }}>
                    {row.subcategories.replace(/\[|\]|'/g, "")}
                  </TableCell>
                  <TableCell align="left" sx={{ fontSize: fontSize }}>
                    {row.price}
                  </TableCell>
                  <TableCell align="left" sx={{ fontSize: fontSize }}>
                    $
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

export default DataModal;