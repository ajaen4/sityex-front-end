import React from "react";
import { List, ListItem, ListItemText, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { prettyCity } from "helpers/usefulFunctions";
import LoadingSpinner from "components/Spinner/LoadingSpinner.jsx";

function ScrollDestinations({ destinations, isFetching }) {
  const renderItem = (destination) => (
    <Link
      to={"/destination/" + destination.name.toString()}
      key={destination.name.toString()}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <ListItem divider>
        <Grid container alignItems="center" justifyContent="center">
          <Grid item>
            <img
              alt="country flag"
              src={require(
                "assets/img/flags/" + destination.countryCode + ".png"
              )}
              style={{ marginRight: "10px", marginTop: "6px" }}
            />
          </Grid>
          <Grid item>
            <ListItemText primary={prettyCity(destination.name)} />
          </Grid>
        </Grid>
      </ListItem>
    </Link>
  );

  if (!isFetching) {
    return (
      <div style={{ overflow: "auto", height: "400px" }}>
        <List style={{ my: "10px" }}>
          {destinations.map((destination) => renderItem(destination))}
        </List>
      </div>
    );
  } else {
    return <LoadingSpinner />;
  }
}

export default ScrollDestinations;
