import React from 'react';
import {FormGroup, FormControl, Button} from 'react-bootstrap';
import Dropzone from "react-dropzone";
import './index.css';
import ReactQuill from 'react-quill';

class ReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foodName: '',
      uploadedFile: null,
      text: '',
    };
  }

  handleInput = (e) => {
    this.setState({
      foodName: e.target.value
    })
  }

  handleSubmit = () => {
    // package all data

    //Call api
  }

  handleChange = (value) => {
    this.setState({
      text: value
    })
  }

  onFileDropped = (acceptedFiles, rejectedFiles) => {
    if (acceptedFiles[0].size < this.maxUpLoadFileSize){
      this.setState({
        uploadedFile: acceptedFiles[0] || null,
      });
    }else {

    }
  }

  renderDropZone(fileName) {
    return(
      <Dropzone
        onDrop={this.onFileDropped}
        disablePreview={true}
        id="dropzone-upload-component"
      >
        <div>{fileName}</div>
      </Dropzone>
    )
  }

  render() {
    return(
      <div>
        <FormGroup controlId="upload-image">
          {this.renderDropZone("Upload image")}
        </FormGroup>
        <FormGroup controlId="food-name">
          <FormControl
            type="text"
            value={this.state.foodName}
            placeholder="Enter food name"
            onChange={this.handleInput}
          />
        </FormGroup>
        <FormGroup controlId="editor">
          <ReactQuill
            value={this.state.text}
            onChange={this.handleChange}
          />
        </FormGroup>
        <div className="btnSubmit">
          <Button
            bsStyle="success"
            type="submit"
            onClick={() => this.handleSubmit()}
          >
            Submit
          </Button>
        </div>
      </div>
    );
  }
}

export default ReviewForm
