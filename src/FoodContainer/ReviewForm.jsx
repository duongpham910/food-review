import React from 'react';
import {FormGroup, FormControl, Button} from 'react-bootstrap';
import {Grid, Row} from 'react-bootstrap';
import Dropzone from "react-dropzone";
import update from 'react-addons-update'
import ReactQuill, {Quill} from 'react-quill'
import {ImageResize} from './ImageResize';
import { Video } from './quill-video-resize'
import './quill-video-resize.css'
import './index.css';

Quill.register('modules/imageResize', ImageResize);
Quill.register({'formats/video': Video})

const imageMaxSize = 1000000000 //bytes
const acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif'
const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => item.trim())

class ReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foodName: '',
      uploadedFiles: [],
      text: '',
      imagePreviews: [],
    };
  }

  componentDidMount() {
    this.attachQuillRefs(true)
  }

  componentDidUpdate() {
    this.attachQuillRefs()
  }

  attachQuillRefs = (onMount) => {
    if (typeof this.reactQuill.getEditor !== 'function') return;
    this.quill = this.reactQuill.getEditor()
    this.quill.root.addEventListener('click', this.handleClick, false)
    this.quill.root.quill = this.quill
  }

  handleInput = (e) => {
    this.setState({
      foodName: e.target.value
    })
  }

  handleSubmit = () => {
    //package all data
    //call api
  }

  handleChange = (value) => {
    this.setState({
      text: value
    })
  }

  verifyFiles = (files) => {
    if (files && files.length > 0) {
      let currentFile = files[0]
      let currentFileType = currentFile.type
      let currentFileSize = currentFile.size

      if (currentFileSize > imageMaxSize) {
        return false
      }

      if (!acceptedFileTypesArray.includes(currentFileType)) {
        return false
      }
    }
    return true
  }

  onFileDropped = (acceptedFiles, rejectedFiles) => {
    let files = this.state.uploadedFiles
    let filesPreview = this.state.imagePreviews
    if (this.verifyFiles(acceptedFiles)) {
      files.push(acceptedFiles[0]);

      let currentFile = acceptedFiles[0]
      let reader = new FileReader()
      reader.addEventListener("load", ()=>{
        filesPreview.push(reader.result)
        this.setState({
          imagePreviews: filesPreview
        })
      })
      reader.readAsDataURL(currentFile)

      this.setState({
        uploadedFiles: files || null,
      });
    }
  }

  handleRemove = (index) => {
    let listPreviews = update(this.state.imagePreviews, {})
    let listUpload = update(this.state.uploadedFiles, {})
    if (listPreviews.length > 0 && listUpload.length > 0) {
      listPreviews.splice(index, 1);
      listUpload.splice(index, 1);
      this.setState({
        imagePreviews: listPreviews,
        uploadedFiles: listUpload,
      });
    }
  }

  renderDropZone(fileName) {
    return(
      <Dropzone
        onDrop={this.onFileDropped}
        id="dropzone-upload-component"
        accept={acceptedFileTypes}
        multiple={false}
      >
        <div>{fileName}</div>
      </Dropzone>
    )
  }

  render() {
    let fileName = "Upload image";
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
    let imagePreviews = this.state.imagePreviews
    return(
      <div>
        <FormGroup controlId="upload-image">
          {this.renderDropZone(fileName)}
          <Grid>
            <Row>
              {imagePreviews.length > 0 ? imagePreviews.map((imgSrc, index) => {
                return(
                  <div key={index} className="img-inline">
                    <img src={imgSrc} className="img-preview"/>
                    <i onClick={() => this.handleRemove(index)}>✘</i>
                  </div>
                )
              }) : ''}
            </Row>
          </Grid>
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
            ref={(el) => {this.reactQuill = el}}
            style={{height: "300px"}}
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
