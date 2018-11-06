import React from 'react';
import {FormGroup, FormControl, Button} from 'react-bootstrap';
import Dropzone from "react-dropzone";

class ReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foodName: '',
      uploadedFile: null,
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
        <FormGroup
          controlId="formBasicText"
        >
          {this.renderDropZone("not yet")}
          <FormControl
            type="text"
            value={this.state.foodName}
            placeholder="Enter food name"
            onChange={this.handleInput}
          />
          <Button
            bsStyle="primary"
            type="submit"
            onClick={() => this.handleSubmit()}
            className="btnSubmit"
          >
            Submit
          </Button>
        </FormGroup>
      </div>
    );
  }
}

export default ReviewForm
