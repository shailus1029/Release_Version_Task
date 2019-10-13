import React, { Component, Suspense } from "react";
import { Modal } from "antd";
import "antd/dist/antd.css";
import InputField from "../../Atoms/InputField/InputField.jsx";
import ButtonField from "../../Atoms/ButtonField/ButtonField.jsx";
import DateField from "../../Atoms/DateField/DateField.jsx";
import "./EditVersion.css";
import moment from "moment";

class EditVersion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      versionName: "",
      startDate: "",
      releaseDate: "",
      description: "",
      error: ""
    };
  }

  componentDidMount() {
    const { data } = this.props;
    this.setState({
      id: data.id,
      versionName: data.versionName,
      startDate: data.startDate,
      releaseDate: data.releaseDate !== null ? data.releaseDate : moment().format("l"),
      description: data.description
    });
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

  handleUpdate = () => {
    const { handleUpdate } = this.props;
    const data = { ...this.state };
    let isError = false;
    Object.keys(data).map(function(key, index) {
      if (key !== "error") {
        if (data[key.toString()] === "" || data[key.toString()] === undefined || data[key.toString()] === null) {
          isError = true;
        }
      }
    });
    if (isError) {
      this.setState({
        error: "Please fill all the fields ***"
      });
    } else {
      handleUpdate(this.state);
    }
  };

  render() {
    const { versionName, startDate, releaseDate, description } = this.state;
    return (
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <Modal
            visible={this.props.openModal}
            title={this.props.title}
            centered={true}
            footer={null}
            onCancel={this.props.closeModal}
          >
            <div>
              <div className="editDiv">
                <InputField
                  inputFieldWidth="250px"
                  value={versionName}
                  handleChange={this.handleVersionName}
                  placeholderText="Version Name"
                />
              </div>
              <div className="editDiv">
                <DateField
                  className="datePicker"
                  value={startDate}
                  handleDateChange={this.handleStartDate}
                  placeholderText="Start Date"
                />
              </div>
              <div className="editDiv">
                <DateField
                  className="datePicker"
                  value={releaseDate}
                  handleDateChange={this.handleReleaseChange}
                  placeholderText="Release Date"
                />
              </div>
              <div className="editDiv">
                <InputField
                  inputFieldWidth="250px"
                  value={description}
                  placeholderText="Descriptions"
                  handleChange={this.handleDescription}
                />
              </div>
              <div className="updateBtn">
                <ButtonField type="primary" buttonText="Update" handleChange={this.handleUpdate} />
                <ButtonField
                  type="default"
                  btnClass="marginLeft"
                  buttonText="Cancel"
                  handleChange={this.props.closeModal}
                />
              </div>
              <div>
                <p style={{ color: "red" }}>{this.state.error}</p>
              </div>
            </div>
          </Modal>
        </Suspense>
      </div>
    );
  }
}

export default EditVersion;
