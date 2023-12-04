import React, { useEffect, useState } from "react";

import dayjs from "dayjs";

import { Box, Badge, Chip, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";

function ServerDay(props) {
  const { highlightedDates = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !outsideCurrentMonth &&
    highlightedDates.some((date) => date.isSame(day, "day"));

  return (
    <Badge
      key={day.toString()}
      overlap="circular"
      badgeContent={isSelected ? "🌟" : undefined}
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Badge>
  );
}

export default function EventCalendar({ selectedEvent }) {
  const [value, setValue] = useState(dayjs());
  const [highlightedDates, setHighlightedDates] = useState([]);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const hasRealTime = [...new Set(highlightedDates.map(
    date => date.format('HH:mm')
  ))
  ].some(
    time => time !== "00:00"
  );

  const isSelectedDateHighlighted = highlightedDates.some((date) =>
    date.isSame(value, "day")
  );

  const parseEventDates = (sessions) => {
    return sessions.split(", ").map((session) => dayjs(session.trim()));
  };

  useEffect(() => {
    if (selectedEvent && selectedEvent.sessions) {
      const parsedDates = parseEventDates(selectedEvent.sessions);
      setHighlightedDates(parsedDates);
    }
  }, [selectedEvent]);

  const timesForSelectedDate = highlightedDates
    .filter((date) => date.isSame(value, "day"))
    .map((date) => date.format("HH:mm"));

  return (
    <Box>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          readOnly={!hasRealTime}
          value={hasRealTime ? value : null}
          onChange={(newValue) => setValue(newValue)}
          loading={false}
          renderLoading={() => <DayCalendarSkeleton />}
          slots={{
            day: ServerDay
          }}
          slotProps={{
            day: {
              highlightedDates
            }
          }}
        />
      </LocalizationProvider>
      <Box sx={{display: { xs: 'flex', md: 'flex' }, flexWrap: { xs: 'nowrap', md: 'wrap' }, overflowX: { xs: 'auto', md: 'none' }, p: 1, minHeight: 60 }}>
        {isSelectedDateHighlighted && (
          timesForSelectedDate.map((time, index) => (
            (time !== "00:00") &&
            <Chip label={time} color="secondary" sx={{ mx: 0.5, my: 0.5 }} />
          )))}
        </Box>
    </Box>
  );
}
