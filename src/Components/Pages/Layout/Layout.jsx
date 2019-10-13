import React, { Component } from "react";
import { Table, Input, Icon, Popover } from "antd";
import "antd/dist/antd.css";
import "./Layout.css";
import ButtonField from "../../Atoms/ButtonField/ButtonField.jsx";
import ProgressBar from "../../Atoms/ProgressBar/ProgressBar.jsx";
import AddNewRelease from "../AddNewRelease/AddNewRelease.jsx";
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
    dataIndex: "versionName"
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
    dataIndex: "startDate"
  },
  {
    title: "Release date",
    dataIndex: "releaseDate"
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
      versions: [],
      isAdded: false
    };
  }

  componentDidMount() {
    this.setState({
      versions: [...versionData]
    });
  }

  handleRelease = newRelease => {
    const { versions } = this.state;
    versions.unshift(newRelease);
    this.setState({
      versions: versions,
      isAdded: true
    });
  };

  resetIsAdded = () => {
    this.setState({
      isAdded: false
    });
  };

  render() {
    const { isAdded } = this.state;
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
            <AddNewRelease isAdded={isAdded} addRelease={this.handleRelease} resetIsAdded={this.resetIsAdded} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Layout;
