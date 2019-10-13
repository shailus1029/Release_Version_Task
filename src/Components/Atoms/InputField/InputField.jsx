import React from "react";
import { Input } from "antd";

const InputField = props => {
  return <Input placeholder={props.placeholderText} style={{ width: `${props.inputFieldWidth}` }} />;
};

export default InputField;
