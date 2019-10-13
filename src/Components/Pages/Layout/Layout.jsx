import React, { Component } from "react";
import { Table, Icon, Popover } from "antd";
import "antd/dist/antd.css";
import "./Layout.css";
import ProgressBar from "../../Atoms/ProgressBar/ProgressBar.jsx";
import AddNewRelease from "../AddNewRelease/AddNewRelease.jsx";
import Header from "../Header/Header.jsx";
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
      filteredVersions: [],
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

  filterVersionsByStatus = type => {
    const { versions } = this.state;
    const filteredVersions = versions.filter(function(version) {
      return version.status === type;
    });
    this.setState({
      filteredVersions: filteredVersions
    });
  };

  handleSearch = event => {
    const { versions } = this.state;
    const searchVal = event.target.value;
    if (searchVal === "") {
      this.setState({
        filteredVersions: []
      });
    } else {
      const filteredVersions = versions.filter(function(version) {
        return version.versionName.includes(searchVal) || version.description.includes(searchVal);
      });
      this.setState({
        filteredVersions: filteredVersions
      });
    }
  };

  render() {
    const { isAdded, filteredVersions, versions } = this.state;

    return (
      <React.Fragment>
        <div className="layout">
          <Header filterVersionsByStatus={this.filterVersionsByStatus} handleSearch={this.handleSearch} />
          <div className="table-layout">
            <Table
              columns={columns}
              dataSource={filteredVersions.length === 0 ? versions : filteredVersions}
              size="middle"
              pagination={false}
            />
            <AddNewRelease isAdded={isAdded} addRelease={this.handleRelease} resetIsAdded={this.resetIsAdded} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Layout;
