import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const DateRangePickerComponent = ({ onDateChange }) => {
  const [selectedDateRange, setSelectedDateRange] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  const handleDateChange = (ranges) => {
    setSelectedDateRange([ranges.selection]);
    onDateChange(ranges.selection);
  };

  return (
    <div>
      <DateRangePicker ranges={selectedDateRange} onChange={handleDateChange} />
    </div>
  );
};

export default DateRangePickerComponent;
