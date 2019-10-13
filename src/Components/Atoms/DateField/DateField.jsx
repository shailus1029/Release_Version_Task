import React from "react";
import { DatePicker } from "antd";

const DateField = props => {
  const dateFormat = "MM/DD/YYYY";
  return (
    <DatePicker
      style={{ marginLeft: "10px", marginRight: "10px" }}
      format={dateFormat}
      onChange={props.handleDateChange}
      placeholder={props.placeholderText}
    />
  );
};

export default DateField;
