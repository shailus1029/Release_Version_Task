import React from "react";
import { DatePicker } from "antd";

const DateField = props => {
  return (
    <DatePicker
      style={{ marginLeft: "10px", marginRight: "10px" }}
      onChange={props.handleDateChange}
      placeholder={props.placeholderText}
    />
  );
};

export default DateField;
