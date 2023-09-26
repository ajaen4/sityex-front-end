import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { withAuth } from "session";
import { prettyCity } from "helpers/usefulFunctions";
import { fetchCity } from "actions";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import CenteredLoadingSpinner from "components/Spinner/CenteredLoadingSpinner";
import { Grid } from "@mui/material";

const CostOfLiving = () => {
  const { location } = useParams();
  const dispatch = useDispatch();
  const selectedCity = useSelector((state) => state.selectedCity.data);
  const auth = useSelector((state) => state.auth.data);

  useEffect(() => {
    document.title = "Community Page";
  }, []);

  useEffect(() => {
    dispatch(fetchCity(prettyCity(location)));
  }, [dispatch, location]);

  function createData(name, unit, cost) {
    return { name, unit, cost };
  }

  const rows = [
    createData("Frozen yoghurt", "1 month", 159),
    createData("Ice cream sandwich", "1kg", 237),
    createData("Eclair", "1 unit", 262),
    createData("Cupcake", "1 unit", 300),
    createData("Gingerbread", "5 units", 356),
  ];

  if (selectedCity === null || selectedCity.name !== prettyCity(location))
    return <CenteredLoadingSpinner />;

  return (
    <TableContainer component={Paper}>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={6}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell align="right">Unit</TableCell>
                <TableCell align="right">Cost</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.unit}</TableCell>
                  <TableCell align="right">{row.cost}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </TableContainer>
  );
};

export default withAuth(CostOfLiving);
