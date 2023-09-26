import React from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const EmptyList = ({ message }) => {
  return (
    <Container style={{ justifyContent: "center", textAlign: "center" }}>
      <Card>
        <CardContent>
          <Typography variant="body1">{message}</Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default EmptyList;
