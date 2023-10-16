import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const DataModal = ({ isOpenModal, setisOpenModal, title, data }) => {

  const onClickClose = () => setisOpenModal(false);
  const fontSize = "0.9em";

  const titleCategories = {
    "Employment": ["salaries and financing",],
    "Month costs": ["markets", "utilities (monthly)", "rent per month", "childcare", "transportation"],
    "Social": ["restaurants", "sports and leisure"]
  }

  const filteredCosts = [];
  for (const cost of data){
    const category = cost.category.toLowerCase()
    const categories = titleCategories[title]
    if (categories?.includes(category))
      filteredCosts.push(cost);
  }

  return (
    <Dialog open={isOpenModal} onClose={onClickClose} sx={{my: 5}}>
      <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>{title}</DialogTitle>
      <DialogContent sx={{width: "100%", p: 0}}>
      <TableContainer component={Paper} sx={{ borderRadius: 0 }}>
      <Table aria-label="cost table" size="small">
        <TableHead>
          <TableRow >
            {/* <TableCell align="right" sx={{fontSize: fontSize}} >Category</TableCell> */}
            <TableCell align="right" sx={{fontSize: fontSize}} >Subcategory</TableCell>
            <TableCell align="right"sx={{fontSize: fontSize}} >Cost</TableCell>
            <TableCell align="right" sx={{fontSize: fontSize}} >Currency</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredCosts?.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {/* <TableCell component="th" scope="row" sx={{fontSize: fontSize}}>
                {row.category}
              </TableCell> */}
              <TableCell align="right" sx={{fontSize: fontSize}}>{row.subcategories.replace(/\[|\]|'/g, '')}</TableCell>
              <TableCell align="right" sx={{fontSize: fontSize}}>{row.price}</TableCell>
              <TableCell align="right" sx={{fontSize: fontSize}}>$</TableCell>
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
