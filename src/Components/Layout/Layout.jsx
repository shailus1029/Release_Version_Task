import React, { Component } from "react";
import { Table, Button, Input, Icon, Progress, Popover } from "antd";
import "antd/dist/antd.css";
import "./Layout.css";

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
    render: progress => <Progress className="progress" percent={progress} status="active" showInfo={false} />
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
      data: [
        {
          version: "1.1",
          status: "IN PROGRESS",
          progress: 7,
          start: "new Date()",
          release: "new Date ()",
          description: "Awesome"
        },
        {
          version: "1.1",
          status: "IN PROGRESS",
          progress: 50,
          start: "new Date()",
          release: "new Date ()",
          description: "Awesome"
        },
        {
          version: "1.1",
          status: "RELEASED",
          progress: 100,
          start: " new Date()",
          release: "new Date ()",
          description: "Awesome"
        },
        {
          version: "1.1",
          status: "UNRELEASED",
          progress: 0,
          start: "new Date()",
          release: "new Date ()",
          description: "Awesome"
        }
      ]
    };
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
                <Button type="primary">IN PROGRESS</Button>&nbsp;&nbsp;
                <Button type="primary">UNRELEASED</Button>&nbsp;&nbsp;
                <Button type="primary">RELEASED</Button>&nbsp;&nbsp;
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
            <Table columns={columns} dataSource={this.state.data} size="middle" pagination={false} />
            <div className="table-inputs">
              <Input placeholder="Version name" style={{ width: "390px" }} />
              <Input placeholder="Start date" style={{ width: "158px" }} />
              <Input placeholder="Release date" style={{ width: "168px" }} />
              <Input placeholder="Description" style={{ width: "170px" }} />
              <Button type="primary">Add</Button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Layout;
