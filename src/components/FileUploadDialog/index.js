import React from 'react';
import empty from 'is-empty';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';


import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ButtonBase from '@material-ui/core/ButtonBase';

import styles from './styles';
import api_upload from '../../apis/upload';

class FileUploadDialog extends React.Component{
  
  constructor(props){
    super(props);
    this.onFileChange = this.onFileChange.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      file: '',
      fileLocalURL: '',
    };
  }
  
  onClose(){
    if(this.props.onClose){
      this.props.onClose();
    }
  }
  
  onSubmit(){
    api_upload(this.state.file).then((response)=>{
      console.log(response);
      if(this.props.onSubmit){
        this.props.onSubmit(response.data);
      }
    });
  }
  
  onFileChange(e, file){
    this.setState({
      fileLocalURL: URL.createObjectURL(e.target.files[0]),
      file: e.target.files[0],
    });
  }
  
  render(){
    let classes = this.props.classes;
    let previewer = !empty(this.state.fileLocalURL) ? <img src={this.state.fileLocalURL} className={classes.imageContainer} /> : null;
    return (
      <Dialog
        open={this.props.open}
        onClose={this.onClose}
        aria-labelledby="form-dialog-title"  
        classes={{
          root: classes.dialogContent
        }}
      >
        <DialogTitle id="form-dialog-title">File Upload</DialogTitle>
        <DialogContent
        >
          <DialogContentText>
            Please select your image by pressing <b>SELECT IMAGE</b> button. Remember to press <b>UPLOAD</b> to upload it to our server
          </DialogContentText>
          {previewer}
          <Button color="primary" >
            <input type={"file"} id="fileUpload" className={classes.fileInput} onChange={this.onFileChange} ref="input"/>
            <label for={"fileUpload"} className={classes.fileInputLabel}>Select Image</label>
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.onSubmit} color="primary">
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  
}

const mapStateToProps = (state) => {
}

const mapActionToProps = {
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(FileUploadDialog));