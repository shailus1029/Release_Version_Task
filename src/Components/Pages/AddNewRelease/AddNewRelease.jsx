import React, { Component } from "react";
import InputField from "../../Atoms/InputField/InputField.jsx";
import ButtonField from "../../Atoms/ButtonField/ButtonField.jsx";
import DateField from "../../Atoms/DateField/DateField.jsx";

class AddNewRelease extends Component {
  constructor(props) {
    super(props);
    this.state = {
      versionName: "",
      startDate: "",
      releaseDate: "",
      description: ""
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.isAdded) {
      nextProps.resetIsAdded();
      return {
        versionName: "",
        startDate: "",
        releaseDate: "",
        description: ""
      };
    }
  }

  handleStartDate = (date, dateString) => {
    this.setState({
      startDate: dateString
    });
  };

  handleReleaseChange = (date, dateString) => {
    this.setState({
      releaseDate: dateString
    });
  };

  handleVersionName = event => {
    const value = event.target.value;
    this.setState({
      versionName: value
    });
  };

  handleDescription = event => {
    const value = event.target.value;
    this.setState({
      description: value
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
    addRelease(newRelease);
  };

  resetState = () => {
    const { resetIsAdded } = this.props;
    this.setState({
      versionName: "",
      startDate: "",
      releaseDate: "",
      description: ""
    });
    resetIsAdded();
  };

  render() {
    const { versionName, description } = this.state;
    return (
      <div className="table-inputs">
        <InputField
          inputFieldWidth="390px"
          value={versionName}
          placeholderText="Version Name"
          handleChange={this.handleVersionName}
        />
        <DateField handleDateChange={this.hand} placeholderText="Start Date" />
        <DateField handleDateChange={this.handleReleaseChange} placeholderText="Release Date" />
        <InputField
          inputFieldWidth="170px"
          placeholderText="Descriptions"
          value={description}
          handleChange={this.handleDescription}
        />
        <ButtonField type="primary" buttonText="Add" handleChange={this.handleNewVersion} />
      </div>
    );
  }
}

export default AddNewRelease;
