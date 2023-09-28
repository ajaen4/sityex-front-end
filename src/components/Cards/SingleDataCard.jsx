import React from "react";
import { useTheme } from "@mui/material/styles";

import { Typography, Grid, Card, Avatar } from "@mui/material";

const SingleDataCard = ({ title, number, icon }) => {
  const theme = useTheme();

  const cardStyle = {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.light,
    overflow: "hidden",
    position: "relative",
    "&:after": {
      content: '""',
      position: "absolute",
      width: 210,
      height: 210,
      background: `linear-gradient(210.04deg, ${theme.palette.primary[200]} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
      borderRadius: "50%",
      top: -30,
      right: -180,
    },
    "&:before": {
      content: '""',
      position: "absolute",
      width: 210,
      height: 210,
      background: `linear-gradient(140.9deg, ${theme.palette.primary[200]} -14.02%, rgba(144, 202, 249, 0) 77.58%)`,
      borderRadius: "50%",
      top: -160,
      right: -130,
    },
  };

  return (
    <Card sx={{ ...cardStyle, padding: 1 }}>
      <Grid container>
        <Grid
          item
          xs={3}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Avatar
            variant="rounded"
            sx={{
              ...theme.typography.commonAvatar,
              ...theme.typography.largeAvatar,
              backgroundColor: theme.palette.primary[800],
              color: "#fff",
            }}
          >
            {icon}
          </Avatar>
        </Grid>
        <Grid item xs={9}>
          <Typography
            sx={{ fontSize: 14, color: theme.palette.grey[50] }}
            color="text.secondary"
            gutterBottom
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontSize: 30, color: theme.palette.grey[50] }}
          >
            {number}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
};

export default SingleDataCard;
