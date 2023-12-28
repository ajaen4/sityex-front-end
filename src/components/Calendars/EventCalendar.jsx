import React, { useEffect, useState } from "react";

import dayjs from "dayjs";

import { Box, Badge, Chip, Typography, Stack } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTimeOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonthOutlined";

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

  const hasRealTime = [
    ...new Set(highlightedDates.map((date) => date.format("HH:mm"))),
  ].some((time) => time !== "00:00");

  const isSelectedDateHighlighted = highlightedDates.some((date) =>
    date.isSame(value, "day"),
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
    <Box sx={{ width: "100%", overflow: "hidden", px: 1 }}>
      <Box sx={{ display: "flex", mb: 1 }}>
        <CalendarMonthIcon sx={{ fontSize: 25 }} />
        <Typography variant="h3" sx={{ fontSize: 22 }}>
          Calendar
        </Typography>
      </Box>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          readOnly={!hasRealTime}
          value={hasRealTime ? value : null}
          onChange={(newValue) => setValue(newValue)}
          loading={false}
          renderLoading={() => <DayCalendarSkeleton />}
          slots={{
            day: ServerDay,
          }}
          slotProps={{
            day: {
              highlightedDates,
            },
          }}
        />
      </LocalizationProvider>
      {hasRealTime &&
      <Stack>
        <Box sx={{ my: 1, display: "flex" }}>
          <AccessTimeIcon sx={{ fontSize: 25 }} />
          <Typography variant="h3" sx={{ fontSize: 22 }}>
            Time slots
          </Typography>
        </Box>
        <Box
          sx={{
            display: { xs: "flex", md: "flex" },
            flexWrap: { xs: "nowrap", md: "wrap" },
            overflowX: { xs: "scroll", md: "none" },
            py: 2,
            minHeight: 75,
            maxWidth: { xs: "320px" },
            alignSelf: "center",
            width: "100%",
          }}
        >
          {isSelectedDateHighlighted &&
            timesForSelectedDate.map(
              (time, index) =>
                time !== "00:00" && (
                  <Chip
                    key={index}
                    label={time}
                    color="secondary"
                    sx={{ mx: 0.5, my: 0.5 }}
                  />
                ),
            )}
        </Box>
      </Stack>
      }
    </Box>
  );
}
