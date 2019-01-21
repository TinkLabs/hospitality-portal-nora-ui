import React from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import { Rating } from 'material-ui-rating';

import styles from './styles';


class CommentForm extends React.Component{
  
  constructor(props){
    super(props);
    this.onRatingChange = this.onRatingChange.bind(this);
    this.onCommentChange = this.onCommentChange.bind(this);
    this.onClose = this.onClose.bind(this);
    this.resetState = this.resetState.bind(this);
    this.onCommentSubmit = this.onCommentSubmit.bind(this);
    this.state = {
      rating: 0,
      comment: '',
    };
  }
  
  resetState(){
    this.setState({
      value: 0,
      comment: '',
    });
  }
  
  onClose(){
    this.props.onClose();
  }
  
  onRatingChange(rating){
    this.setState({
      rating
    });
  }
  
  onCommentChange(e){
    let comment = e.target.value;
    this.setState({
      comment
    });
  }
  
  onCommentSubmit(e){
    this.props.onSubmit(
      this.props.restaurant, 
      this.state.rating, 
      this.state.comment
    );
  }
  
  render(){
    let { classes, restaurant, open } = this.props;
    return (
      <Drawer anchor="right" open={open} onClose={this.props.onClose}>
        <div className={classes.form}>
          <div className={classes.wrapper}>
            <img className={classes.coverImg} src={restaurant.get('cover_image')} />
            <Typography variant="headline" className={classes.title}>{restaurant.getIn(['name','ja_JP'])}</Typography>
            <Typography variant="caption" className={classes.caption}>{restaurant.get('address')}</Typography>
            <Typography variant="caption" className={classes.caption}>{restaurant.get('tel')}</Typography>
            <form className={classes.container} noValidate autoComplete="off">
              <div className={classes.ratingBlock}>
                <Typography variant="caption" className={classes.ratingLabel}>Rating</Typography>
                <Rating
                  className={classes.rating}
                  value={this.state.rating}
                  max={3}
                  onChange={this.onRatingChange}
                  variant="outlined"
                />
              </div>
              <TextField
                id="standard-uncontrolled"
                label="Comment"
                margin="normal"
                fullWidth={true}
                multiline={true}
                rows="8"
                value={this.state.comment}
                className={classes.inputBlock}
                onChange={this.onCommentChange}
              />
              <Button 
                variant="contained" 
                color="primary" 
                fullWidth={true} 
                className={classes.submitButton}
                onClick={this.onCommentSubmit}
              >
                Submit
              </Button>
            </form>
          </div>
        </div>
      </Drawer>
    );
  }
  
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapActionToProps = {
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(CommentForm));