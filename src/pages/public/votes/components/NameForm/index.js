import React from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


class NameForm extends React.Component{
  
  constructor(props){
    super(props);
    this.onNameSubmit = this.onNameSubmit.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.state = {
      name: '',
    };
  }
  
  onNameSubmit(){
    console.log(this.state.name);
    this.props.onNameSubmit(this.state.name);
  }
  
  onNameChange(e){
    this.setState({
      name: e.target.value,
    });
  }
  
  render(){
    return (
      <Dialog
        open={this.props.open}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title"> May I have your name ? </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            onChange={this.onNameChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.onNameSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  
}

export default NameForm;