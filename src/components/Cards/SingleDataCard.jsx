import React from "react";
import { useTheme } from "@mui/material/styles";

import { Typography, Grid, Card, Avatar } from "@mui/material";
import AddIcon from "@mui/icons-material/AddOutlined";

const SingleDataCard = ({ title, text, number, icon, backgroundColor }) => {
  const theme = useTheme();

  const cardStyle = {
    backgroundColor: backgroundColor.pastel,
    color: backgroundColor.light,
    overflow: "hidden",
    position: "relative",
    "&:after": {
      content: '""',
      position: "absolute",
      width: 210,
      height: 210,
      background: `linear-gradient(210.04deg, ${backgroundColor[200]} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
      borderRadius: "50%",
      top: -30,
      right: -180,
    },
    "&:before": {
      content: '""',
      position: "absolute",
      width: 210,
      height: 210,
      background: `linear-gradient(140.9deg, ${backgroundColor[200]} -14.02%, rgba(144, 202, 249, 0) 77.58%)`,
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
              backgroundColor: backgroundColor.pastel,
              color: "#fff",
              pointerEvents: "none",
            }}
          >
            {icon}
          </Avatar>
        </Grid>
        <Grid item xs={7}>
          <Typography
            sx={{ fontSize: 20, color: theme.palette.grey[50] }}
            color="text.primary"
            gutterBottom
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontSize: 15, color: theme.palette.grey[50] }}
          >
            {text}
            {number}
          </Typography>
        </Grid>
        <Grid
          item
          xs={2}
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
              backgroundColor: backgroundColor[800],
              color: "#fff",
            }}
          >
            <AddIcon />
          </Avatar>
        </Grid>
      </Grid>
    </Card>
  );
};

export default SingleDataCard;
