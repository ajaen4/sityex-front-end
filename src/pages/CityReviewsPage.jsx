import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { withAuth } from "session";
import { prettyCity } from "helpers/usefulFunctions";
import { fetchCity } from "actions";

import { Grid } from "@mui/material";
import CenteredLoadingSpinner from "components/Spinner/CenteredLoadingSpinner";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const CityReviewsPage = () => {
  const { location } = useParams();
  const dispatch = useDispatch();

  const chartContainerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  const selectedCity = useSelector((state) => state.selectedCity.data);

  let data = [];
  if (selectedCity) {
    const weather = selectedCity.weather;
    const histAvgTemp = weather.avgTemp;
    let sum = 0;
    for (let temp in weather.avgTemp) {
      sum += parseFloat(weather.avgTemp[temp]);
    }
    const histSunset = weather.sunset;
    const yearAvgTemp = (sum / 12).toFixed(2);

    const histAvgTempIds = [
      { id: "first", value: 0 },
      { id: "second", value: 1 },
      { id: "third", value: 2 },
      { id: "fourth", value: 3 },
      { id: "fifth", value: 4 },
      { id: "sixth", value: 5 },
      { id: "seventh", value: 6 },
      { id: "eight", value: 7 },
      { id: "ninth", value: 8 },
      { id: "tenth", value: 9 },
      { id: "eleventh", value: 10 },
      { id: "twelth", value: 11 },
    ];

    data = histAvgTempIds.map((number) => ({
      monthName: months[number.value],
      avgTemp: parseFloat(histAvgTemp[number.value]),
      sunset: histSunset[number.value].firstSunset,
    }));
  }

  useEffect(() => {
    document.title = "City Reviews Page";

    if (chartContainerRef.current) {
      setContainerWidth(chartContainerRef.current.offsetWidth);

      const resizeObserver = new ResizeObserver(() => {
        setContainerWidth(chartContainerRef.current.offsetWidth);
      });

      resizeObserver.observe(chartContainerRef.current);

      // Clean up the observer when the component is unmounted
      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [selectedCity]);

  useEffect(() => {
    dispatch(fetchCity(prettyCity(location)));
  }, [dispatch, location]);

  if (selectedCity === null || selectedCity.name !== prettyCity(location))
    return <CenteredLoadingSpinner />;

  return (
    <Grid container justifyContent="center" sx={{ py: 2 }}>
      <Grid item xs={12} md={6} ref={chartContainerRef}>
        <LineChart width={containerWidth} height={300} data={data}>
          <Line type="monotone" dataKey="avgTemp" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="monthName" />
          <YAxis />
        </LineChart>
      </Grid>
    </Grid>
  );
};

export default withAuth(CityReviewsPage);
