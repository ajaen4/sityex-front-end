import React from "react";
import { useTheme } from "@mui/material/styles";

import { Typography, Grid, Card, Avatar } from "@mui/material";
import AddIcon from "@mui/icons-material/AddOutlined";

const SingleDataCard = ({
  title,
  text,
  number,
  units,
  icon,
  backgroundColor,
  onClickData
}) => {
  const theme = useTheme();

  return (
    <Card sx={{ padding: 0.5, height: "100%" }}>
      <Grid container sx={{ alignItems: "center" }}>
        <Grid
          item
          xs={2}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <span style={{ fontSize: "3em" }}>{icon}</span>
        </Grid>
        <Grid item xs={8}>
          <Typography
            sx={{ fontSize: 20, color: theme.palette.grey[900] }}
            gutterBottom
          >
            {title}
          </Typography>
          {text && number && (
            <Typography
              variant="body2"
              sx={{ fontSize: 15, color: theme.palette.grey[900] }}
            >
              {text}
              {new Intl.NumberFormat("es-ES").format(number)}
              {units && ` ${units}`}
            </Typography>
          )}
        </Grid>
        <Grid
          item
          xs={2}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Avatar
            variant="rounded"
            sx={{
              ...theme.typography.commonAvatar,
              ...theme.typography.largeAvatar,
              backgroundColor: backgroundColor[800],
              color: "#fff"
            }}
            onClick={() => onClickData(title)}
          >
            <AddIcon />
          </Avatar>
        </Grid>
      </Grid>
    </Card>
  );
};

export default SingleDataCard;
