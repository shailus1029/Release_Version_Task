import React from "react";
import { Button } from "antd";

const ButtonField = props => {
  return (
    <Button style={{ margin: `${props.margin}` }} type={props.type}>
      {props.buttonText}
    </Button>
  );
};

export default ButtonField;
