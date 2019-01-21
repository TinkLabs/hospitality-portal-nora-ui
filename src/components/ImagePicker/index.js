import React from 'react';
import empty from 'is-empty';

import { withStyles } from '@material-ui/core/styles';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import DeleteIcon from '@material-ui/icons/RemoveCircle';
import AddIcon from '@material-ui/icons/AddCircle';
import ButtonBase from '@material-ui/core/ButtonBase';

import styles from './styles';

class ImagePicker extends React.Component{
  
  constructor(props){
    super(props);
    this.onImageSelect = this.onImageSelect.bind(this);
    this.onImageDelete = this.onImageDelete.bind(this);
    this.onImageAdd = this.onImageAdd.bind(this);
  }
  
  onImageSelect(item){
    if(!empty(this.props.onImageSelect)){
      this.props.onImageSelect(item);
    }
  }
  
  onImageDelete(item, index){
    if(this.props.onImageDelete){
      this.props.onImageDelete(item, index);
    }
  }
  
  onImageAdd(){
    if(this.props.onImageAdd){
      this.props.onImageAdd();
    }
  }
  
  render(){
    let { classes } = this.props;
    return (
      <div className={classes.root}>
        <GridList className={classes.gridList} cols={5.5} cellHeight={100} spacing={16}>
          {this.props.items.map((item, index) => (
            <GridListTile key={item.src} classes={{
              root: classes.itemContainer,
              tile: classes.itemContainer,
            }}>
              <ButtonBase 
                className={classes.imageContainer}
                onClick={() => {this.onImageSelect(item)}}
              >
                <img src={item.src} alt={item.title} className={classes.image}/>
                <div className={classes.overlay} />
              </ButtonBase>
              <IconButton className={classes.deleteContainer} onClick={() => {this.onImageDelete(item, index)}}>
                  <DeleteIcon/>
              </IconButton>
            </GridListTile>
          ))}
          <GridListTile>
            <ButtonBase className={classes.addIconContainer} onClick={() => {this.onImageAdd()}}>
              <AddIcon fontSize={'large'} className={classes.addIcon} />
            </ButtonBase>
          </GridListTile>
        </GridList>
      </div>
    );
  }
  
}

export default withStyles(styles)(ImagePicker);