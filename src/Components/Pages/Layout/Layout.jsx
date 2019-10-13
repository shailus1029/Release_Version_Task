import React, { Component } from "react";
import { Table, Input, Icon, Popover } from "antd";
import "antd/dist/antd.css";
import "./Layout.css";
import InputField from "../../Atoms/InputField/InputField.jsx";
import ButtonField from "../../Atoms/ButtonField/ButtonField.jsx";
import ProgressBar from "../../Atoms/ProgressBar/ProgressBar.jsx";
import DateField from "../../Atoms/DateField/DateField.jsx";
import versionData from "../../../utils/versionData.json";

const content = (
  <div className="content">
    <p>Edit</p>
    <p>Delete</p>
  </div>
);

const columns = [
  {
    title: "Version",
    dataIndex: "version"
  },
  {
    title: "Status",
    dataIndex: "status",
    render: status => (
      <span className={status === "RELEASED" ? "green" : status === "UNRELEASED" ? "red" : "yellow"}>{status}</span>
    )
  },
  {
    title: "Progress",
    dataIndex: "progress",
    render: progress => <ProgressBar progress={progress} />
  },
  {
    title: "Start date",
    dataIndex: "start"
  },
  {
    title: "Release date",
    dataIndex: "release"
  },
  {
    title: "Description",
    dataIndex: "description"
  },
  {
    title: "Actions",
    dataIndex: "actions",
    render: action => (
      <Popover placement="right" content={content} trigger="click" className="popover">
        <Icon type="more" className="action-icon" rotate="90" />
      </Popover>
    )
  }
];

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      versions: []
    };
  }

  componentDidMount() {
    this.setState({
      versions: [...versionData]
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="layout">
          <div className="header">
            <span>Projects / ENV1.5</span>
            <h1>Releases</h1>
            <div className="tabs">
              <div>
                <ButtonField margin="5px" type="primary" buttonText="IN PROGRESS" />
                <ButtonField margin="5px" type="primary" buttonText="UNRELEASED" />
                <ButtonField margin="5px" type="primary" buttonText="RELEASED" />
              </div>
              <div>
                <Input
                  placeholder="Search..."
                  style={{ width: 200 }}
                  prefix={<Icon type="search" style={{ color: "black" }} />}
                />
              </div>
            </div>
          </div>
          <div className="table-layout">
            <Table columns={columns} dataSource={this.state.versions} size="middle" pagination={false} />
            <div className="table-inputs">
              <InputField inputFieldWidth="390px" placeholderText="Version Name" />
              <DateField handleDateChange={this.handleDateChange} placeholderText="Start Date" />
              <DateField handleDateChange={this.handleDateChange} placeholderText="Release Date" />
              <InputField inputFieldWidth="170px" placeholderText="Descriptions" />
              <ButtonField type="primary" buttonText="Add" />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Layout;
