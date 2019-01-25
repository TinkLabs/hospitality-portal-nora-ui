import React from 'react';
import debounce from 'debounce';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';

import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';

import UnCheckedRadio from '@material-ui/icons/RadioButtonUnchecked';
import CheckedRadio from '@material-ui/icons/RadioButtonChecked';

import styles from './styles'

class SearchBar extends React.Component{
  
  constructor(props){
    super(props);
    this.renderAttributes = this.renderAttributes.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onSearchDebounce = debounce(this.onSearchDebounce.bind(this), 500);
    this.state = {
      selected: '',
      value: '',
    };
  }
  
  componentDidMount(){
    this.setState({
      selected: this.props.attributes[0]
    })
  }
  
  onChange(e){
    this.setState({
      selected: e.target.value,
      value: '',
    });
    console.log(e.target.value);
  }
  
  onSearch(e){
    this.setState({
      value: e.target.value,
    }, ()=>{
      this.onSearchDebounce();
    });
  }
  
  onSearchDebounce(){
    if(this.props.onSearch){
      this.props.onSearch(this.state.selected, this.state.value);
    }
  }
  
  renderAttributes(){
    let classes = this.props.classes;
    return this.props.attributes.map((attribute) => {
      return (
        <FormControlLabel
          className={{
            root: classes.radioLabelContainer,
            label: classes.radioLabel,
          }}
          value={attribute}
          label={
            <Typography variant={'caption'}>{attribute}</Typography>
          }
          control={
            <Radio
              className={classes.radioButton}
              icon={<UnCheckedRadio fontSize={'small'}/>}
            />
          }
        />
      );
    });
  }
  
  render(){
    let classes = this.props.classes;
    return (
      <FormControl className={classes.wrapper}>
        <TextField
          id="standard-name"
          label={this.state.selected}
          margin="normal"
          fullWidth={true}
          onChange={this.onSearch}
          value={this.state.value}
        />
        <RadioGroup 
          value={this.state.selected}
          onChange={this.onChange}
          row
        >
          {this.renderAttributes()}
        </RadioGroup>
      </FormControl>
    );
  }
  
}

export default withStyles(styles)(SearchBar);