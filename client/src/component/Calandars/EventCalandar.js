import React, { useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import {
  Calendar,
  Views,
  DateLocalizer,
  momentLocalizer,
} from "react-big-calendar";
import moment from "moment";

const localizer = momentLocalizer(moment);

export default function EventCalandar() {
  const [myEvents, setEvents] = useState(events);

  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      const title = window.prompt("New Event name");
      if (title) {
        setEvents((prev) => [...prev, { start, end, title }]);
      }
    },
    [setEvents]
  );

  const handleSelectEvent = useCallback(
    (event) => window.alert(event.title),
    []
  );

  const { defaultDate, scrollToTime } = useMemo(
    () => ({
      defaultDate: new Date(),
      scrollToTime: new Date(1970, 1, 1, 6),
    }),
    []
  );
  return (
    <>
      <Calendar
        defaultDate={defaultDate}
        defaultView={Views.MONTH}
        events={myEvents}
        localizer={localizer}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        selectable
        scrollToTime={scrollToTime}
        style={{
          height: 500,
          backgroundColor: "#fff",
          padding: 10,
          borderRadius: "8px",
          boxShadow:
            "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
        }}
      />
    </>
  );
}

EventCalandar.propTypes = {
  localizer: PropTypes.instanceOf(DateLocalizer),
};

const now = new Date();
let events = [
  {
    id: 0,
    title: "All Day Event very long title",
    allDay: true,
    start: new Date(2022, 3, 0),
    end: new Date(2022, 3, 1),
  },
  {
    id: 1,
    title: "Long Event",
    start: new Date(2022, 4, 7),
    end: new Date(2022, 4, 10),
  },
  {
    id: 2,
    title: "DTS STARTS",
    start: new Date(2022, 2, 13, 0, 0, 0),
    end: new Date(2022, 2, 20, 0, 0, 0),
  },

  {
    id: 3,
    title: "DTS ENDS",
    start: new Date(2022, 10, 6, 0, 0, 0),
    end: new Date(2022, 10, 13, 0, 0, 0),
  },

  {
    id: 4,
    title: "Some Event",
    start: new Date(2022, 3, 9, 0, 0, 0),
    end: new Date(2022, 3, 10, 0, 0, 0),
  },
  {
    id: 6,
    title: "Meeting",
    start: new Date(2022, 3, 4, 10, 30, 0, 0),
    end: new Date(2022, 3, 4, 12, 30, 0, 0),
    desc: "Pre-meeting meeting, to prepare for the meeting",
  },
  {
    id: 7,
    title: "Lunch",
    start: new Date(2022, 3, 12, 12, 0, 0, 0),
    end: new Date(2022, 3, 12, 13, 0, 0, 0),
    desc: "Power lunch",
  },
  {
    id: 8,
    title: "Meeting",
    start: new Date(2022, 3, 6, 14, 0, 0, 0),
    end: new Date(2022, 3, 6, 15, 0, 0, 0),
  },
  {
    id: 9,
    title: "Happy Hour",
    start: new Date(2022, 3, 12, 17, 0, 0, 0),
    end: new Date(2022, 3, 12, 17, 30, 0, 0),
    desc: "Most important meal of the day",
  },
  {
    id: 10,
    title: "Dinner",
    start: new Date(2022, 3, 12, 20, 0, 0, 0),
    end: new Date(2022, 3, 12, 21, 0, 0, 0),
  },
  {
    id: 11,
    title: "Planning Meeting with Paige",
    start: new Date(2022, 3, 13, 8, 0, 0),
    end: new Date(2022, 3, 13, 10, 30, 0),
  },
  {
    id: 11.1,
    title: "Inconvenient Conference Call",
    start: new Date(2022, 3, 13, 9, 30, 0),
    end: new Date(2022, 3, 13, 12, 0, 0),
  },
  {
    id: 11.2,
    title: "Project Kickoff - Lou's Shoes",
    start: new Date(2022, 3, 13, 11, 30, 0),
    end: new Date(2022, 3, 13, 14, 0, 0),
  },
  {
    id: 11.3,
    title: "Quote Follow-up - Tea by Tina",
    start: new Date(2022, 3, 13, 15, 30, 0),
    end: new Date(2022, 3, 13, 16, 0, 0),
  },
  {
    id: 12,
    title: "Late Night Event",
    start: new Date(2022, 3, 17, 19, 30, 0),
    end: new Date(2022, 3, 17, 2, 0, 0),
  },
  {
    id: 13,
    title: "Multi-day Event",
    start: new Date(2022, 6, 20, 19, 30, 0),
    end: new Date(2022, 6, 22, 2, 0, 0),
  },
  {
    id: 15,
    title: "Point in Time Event",
    start: now,
    end: now,
  },
  {
    id: 16,
    title: "Video Record",
    start: new Date(2022, 3, 22, 15, 30, 0),
    end: new Date(2022, 3, 22, 19, 0, 0),
  },
  {
    id: 17,
    title: "Dutch Song Producing",
    start: new Date(2022, 7, 14, 16, 30, 0),
    end: new Date(2022, 7, 14, 20, 0, 0),
  },
  {
    id: 20,
    title: "An overlapped Event",
    start: new Date(2022, 3, 29, 17, 0, 0),
    end: new Date(2022, 3, 29, 18, 30, 0),
  },
];
