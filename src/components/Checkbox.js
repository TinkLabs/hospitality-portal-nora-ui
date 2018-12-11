import React from 'react';
import empty from 'is-empty';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import {default as MaterialCheckbox} from '@material-ui/core/Checkbox';

class Checkbox extends React.Component{
  
  render(){
    let selected_id_set = this.props.selected_id_set;
    let value = this.props.value;
    let label = this.props.label;
    let selected_item = selected_id_set.find((selected) => {
      return selected._id == value;
    });
    return (
      <FormControlLabel
        control={
          <MaterialCheckbox value={value} checked={!empty(selected_item)}/>
        }
        label={label}
      />
    );
  }
  
}

export default Checkbox;