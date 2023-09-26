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

const CostOfLivingPage = () => {
  const { location } = useParams();
  const dispatch = useDispatch();
  const selectedCity = useSelector((state) => state.selectedCity.data);
  const auth = useSelector((state) => state.auth.data);

  useEffect(() => {
    document.title = "Cost of Living Page";
  }, []);

  useEffect(() => {
    dispatch(fetchCity(prettyCity(location)));
  }, [dispatch, location]);

  function createData(name, unit, cost) {
    return { name, unit, cost };
  }
  const prices = selectedCity.prices;
  const rent = new Intl.NumberFormat("es-418").format(
    prices["Apartment (1 bedroom) Outside of Centre"].replace(",", ""),
  );
  const apartmentCost = new Intl.NumberFormat("es-418").format(
    prices[
      "Basic (Electricity, Heating, Cooling, Water, Garbage) for 85m2 Apartment"
    ],
  );
  const internetCost = new Intl.NumberFormat("es-418").format(
    prices["Internet (60 Mbps or More, Unlimited Data, Cable/ADSL)"],
  );
  const salaryAvg = new Intl.NumberFormat("es-418").format(
    prices["Average Monthly Net Salary (After Tax)"].replace(",", ""),
  );
  const mobileFee = new Intl.NumberFormat("es-418").format(
    prices["1 min. of Prepaid Mobile Tariff Local (No Discounts or Plans)"],
  );
  const costOfCinema = new Intl.NumberFormat("es-418").format(
    prices["Cinema, International Release, 1 Seat"],
  );
  const costOfApples = new Intl.NumberFormat("es-418").format(
    prices["Apples (1kg)"],
  );
  const costOfEggs = new Intl.NumberFormat("es-418").format(
    prices["Eggs (regular) (12)"],
  );
  const costOfChicken = new Intl.NumberFormat("es-418").format(
    prices["Chicken Breasts (Boneless, Skinless), (1kg)"],
  );
  const costOfBeer = new Intl.NumberFormat("es-418").format(
    prices["Domestic Beer (0.5 liter bottle)"],
  );
  const costOfMilk = new Intl.NumberFormat("es-418").format(
    prices["Milk (regular), (1 liter)"],
  );
  const rows = [
    createData("Rent", "1 month", rent),
    createData("Apartment costs", "1 month", apartmentCost),
    createData("Internet", "1 month", internetCost),
    createData("Salary", "1 month", salaryAvg),
    createData("Mobile fee", "1 month", mobileFee),
    createData("Cinema", "1 ticket", costOfCinema),
    createData("Apples", "1 kg", costOfApples),
    createData("Eggs", "12 units", costOfEggs),
    createData("Chicken", "1 kg", costOfChicken),
    createData("Beer", "0.5 liters", costOfBeer),
    createData("Milk", "1 liter", costOfMilk),
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

export default withAuth(CostOfLivingPage);
