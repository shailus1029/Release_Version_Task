import React, { Component } from "react";
import { Input, Icon } from "antd";
import ButtonField from "../../Atoms/ButtonField/ButtonField.jsx";
import "./Header.css";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      versions: [],
      isAdded: false
    };
  }

  render() {
    const { filterVersionsByStatus, handleSearch } = this.props;
    return (
      <div className="header">
        <span>Projects / ENV1.5</span>
        <h1>Releases</h1>
        <div className="tabs">
          <div>
            <ButtonField
              margin="5px"
              type="primary"
              btnClass="statusBtn"
              buttonText="IN PROGRESS"
              handleChange={() => {
                filterVersionsByStatus("IN PROGRESS");
              }}
            />
            <ButtonField
              margin="5px"
              type="primary"
              btnClass="statusBtn"
              buttonText="UNRELEASED"
              handleChange={() => {
                filterVersionsByStatus("UNRELEASED");
              }}
            />
            <ButtonField
              margin="5px"
              type="primary"
              btnClass="statusBtn"
              buttonText="RELEASED"
              handleChange={() => {
                filterVersionsByStatus("RELEASED");
              }}
            />
          </div>
          <div>
            <Input
              placeholder="Search..."
              style={{ width: 200 }}
              onChange={handleSearch}
              prefix={<Icon type="search" style={{ color: "black" }} />}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
