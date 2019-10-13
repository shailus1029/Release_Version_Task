import React from "react";
import { Progress } from "antd";
import "./ProgressBar.css";

const ProgressBar = props => {
  return <Progress className="progress" percent={props.progress} status="active" showInfo={false} />;
};

export default ProgressBar;
