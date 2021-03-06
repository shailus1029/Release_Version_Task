import React, { Component } from "react";
import { Table } from "antd";
import "antd/dist/antd.css";
import "./Layout.css";
import ProgressBar from "../../Atoms/ProgressBar/ProgressBar.jsx";
import AddNewRelease from "../AddNewRelease/AddNewRelease.jsx";
import Header from "../Header/Header.jsx";
import EditVersion from "../EditVersion/EditVersion.jsx";
import versionData from "../../../utils/versionData.json";

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      versions: [],
      filteredVersions: [],
      isAdded: false,
      isEdit: false,
      editVersion: {}
    };
  }

  componentDidMount() {
    this.setState({
      versions: [...versionData]
    });
  }

  handleRelease = newRelease => {
    const { versions } = this.state;
    const updateNewRelease = { ...newRelease, id: versions.length + 1 };
    versions.unshift(updateNewRelease);
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
    const filteredVersions = versions.filter(version => {
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
      const filteredVersions = versions.filter(version => {
        return version.versionName.includes(searchVal) || version.description.includes(searchVal);
      });
      this.setState({
        filteredVersions: filteredVersions
      });
    }
  };

  deleteVersion = id => {
    const { versions } = this.state;
    const remainingArray = versions.filter(version => {
      return version.id !== id;
    });
    this.setState({
      versions: remainingArray
    });
  };

  editVersion = record => {
    this.setState({
      isEdit: true,
      editVersion: record
    });
  };

  closeEditModal = () => {
    this.setState({
      isEdit: false
    });
  };

  updateVersion = updatedVersion => {
    const { versions } = this.state;
    const OldVersions = versions.map(version => {
      if (version.id === updatedVersion.id) {
        (version.versionName = updatedVersion.versionName),
          (version.startDate = updatedVersion.startDate),
          (version.releaseDate = updatedVersion.releaseDate),
          (version.description = updatedVersion.description);
      }
      return version;
    });
    this.setState({
      versions: OldVersions,
      isEdit: false
    });
  };

  render() {
    const { isAdded, isEdit, editVersion, filteredVersions, versions } = this.state;
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
        dataIndex: "releaseDate",
        render: releaseDate => <span>{releaseDate !== null ? releaseDate : "---"} </span>
      },
      {
        title: "Description",
        dataIndex: "description"
      },
      {
        title: "Actions",
        render: record => (
          <span>
            <i
              className="fa fa-edit mr-2 editIcon"
              onClick={() => {
                this.editVersion(record);
              }}
            />
            <i
              className="fa fa-trash mr-2 closeIcon"
              onClick={() => {
                this.deleteVersion(record.id);
              }}
            />
          </span>
        )
      }
    ];

    return (
      <React.Fragment>
        <div className="layout">
          <Header filterVersionsByStatus={this.filterVersionsByStatus} handleSearch={this.handleSearch} />
          <div className="table-layout">
            <Table
              rowKey={record => record.id}
              columns={columns}
              dataSource={filteredVersions.length === 0 ? versions : filteredVersions}
              size="middle"
              pagination={false}
            />
            <AddNewRelease isAdded={isAdded} addRelease={this.handleRelease} resetIsAdded={this.resetIsAdded} />
          </div>
        </div>
        {isEdit ? (
          <EditVersion
            openModal={isEdit}
            data={editVersion}
            handleUpdate={this.updateVersion}
            closeModal={this.closeEditModal}
            title={"Edit Version"}
          />
        ) : null}
      </React.Fragment>
    );
  }
}

export default Layout;
