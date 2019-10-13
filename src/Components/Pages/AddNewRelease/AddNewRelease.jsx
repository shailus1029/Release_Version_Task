import React, { Component } from "react";
import InputField from "../../Atoms/InputField/InputField.jsx";
import ButtonField from "../../Atoms/ButtonField/ButtonField.jsx";
import DateField from "../../Atoms/DateField/DateField.jsx";
import moment from "moment";

const dateFormat = "MM/DD/YYYY";

class AddNewRelease extends Component {
  constructor(props) {
    super(props);
    this.state = {
      versionName: "",
      startDate: moment().format("l"),
      releaseDate: moment().format("l"),
      description: "",
      error: ""
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.isAdded) {
      nextProps.resetIsAdded();
      return {
        versionName: "",
        startDate: moment().format("l"),
        releaseDate: moment().format("l"),
        description: ""
      };
    }
  }

  handleStartDate = (date, dateString) => {
    this.setState({
      startDate: dateString,
      error: ""
    });
  };

  handleReleaseChange = (date, dateString) => {
    this.setState({
      releaseDate: dateString,
      error: ""
    });
  };

  handleVersionName = event => {
    const value = event.target.value;
    this.setState({
      versionName: value,
      error: ""
    });
  };

  handleDescription = event => {
    const value = event.target.value;
    this.setState({
      description: value,
      error: ""
    });
  };

  handleNewVersion = () => {
    const { versionName, startDate, releaseDate, description } = this.state;
    const { addRelease } = this.props;
    const newRelease = {
      status: "IN PROGRESS",
      progress: 0,
      versionName,
      startDate,
      releaseDate,
      description
    };

    let isError = false;
    Object.keys(newRelease).map(function(key, index) {
      if (newRelease[key] === "" || newRelease[key] === undefined || newRelease[key] === null) {
        isError = true;
      }
    });
    if (isError) {
      this.setState({
        error: "Please fill all the fields ***"
      });
    } else {
      addRelease(newRelease);
    }
  };

  resetState = () => {
    const { resetIsAdded } = this.props;
    this.setState({
      versionName: "",
      startDate: moment().format("l"),
      releaseDate: moment().format("l"),
      description: ""
    });
    resetIsAdded();
  };

  render() {
    const { versionName, description } = this.state;
    return (
      <>
        <div className="table-inputs">
          <InputField
            inputFieldWidth="390px"
            value={versionName}
            placeholderText="Version Name"
            handleChange={this.handleVersionName}
          />
          <DateField handleDateChange={this.handleStartDate} placeholderText="Start Date" />
          <DateField handleDateChange={this.handleReleaseChange} placeholderText="Release Date" />
          <InputField
            inputFieldWidth="170px"
            placeholderText="Descriptions"
            value={description}
            handleChange={this.handleDescription}
          />
          <ButtonField type="primary" buttonText="Add" handleChange={this.handleNewVersion} />
        </div>
        <div>
          <p style={{ color: "red" }}>{this.state.error}</p>
        </div>
      </>
    );
  }
}

export default AddNewRelease;
