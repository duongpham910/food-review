import React from 'react';
import {FormGroup, FormControl, Button} from 'react-bootstrap';
import Dropzone from "react-dropzone";
import './index.css';
import ReactQuill, {Quill} from 'react-quill'
import {ImageResize} from './ImageResize';
import {YoutubeResize} from './YoutubeResize';

Quill.register('modules/imageResize', ImageResize);
Quill.register('modules/youtubeResize', YoutubeResize);

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
    this.setState({
      uploadedFile: acceptedFiles[0] || null,
    });
  }

  renderDropZone(fileName) {
    return(
      <Dropzone
        onDrop={this.onFileDropped}
        id="dropzone-upload-component"
      >
        <div>{fileName}</div>
      </Dropzone>
    )
  }

  render() {
    let fileName = this.state.uploadedFile ? this.state.uploadedFile.name : "Upload image";
    const modulesQill = {
      toolbar: [
        [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
        [{size: []}],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'},
         {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image', 'video'],
        ['clean']
      ],
      clipboard: {
        matchVisual: false,
      },
      history: {
        delay: 1000,
        maxStack: 50,
        userOnly: false
      },
      imageResize: {
        displayStyles: {
          backgroundColor: 'black',
          border: 'none',
          color: 'white'
        },
        modules: ['Resize', 'DisplaySize', 'Toolbar']
      },
    }
    const formats = [
      'header', 'font', 'size',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet', 'indent',
      'link', 'image', 'video'
    ]
    return(
      <div>
        <FormGroup controlId="upload-image">
          {this.renderDropZone(fileName)}
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
            modules={modulesQill}
            formats={formats}
            placeholder={"Enter new content here..."}
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
