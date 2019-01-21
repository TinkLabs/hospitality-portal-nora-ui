const styles = theme => {
  console.log(theme.palette.background);
    return ({
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'visible',
        backgroundColor: theme.palette.background.paper,
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
      },
      gridList: {
        flexWrap: 'nowrap',
        width: '100%',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
        overflow: 'visible',
      },
      title: {
        color: theme.palette.primary.light,
      },
      titleBar: {
        background:
          'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
      },
      imageContainer: {
        height: '-webkit-fill-available',
        width: '-webkit-fill-available',
      },
      image: {
        height: 'inherit',
        width: 'inherit',
        objectFit: 'cover',
      },
      overlay: {
        width: '100%',
        height: '100%',
        opacity: 0.5,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: '#000',
        '&:hover':{
          opacity: 0,
        },
      },
      addIcon:{
        color: theme.palette.primary.light,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      },
      addIconContainer:{
        height: '-webkit-fill-available',
        width: '-webkit-fill-available',
        borderStyle: 'dotted',
        border: 2,
        color: theme.palette.primary.light,
        '&:hover': {
          background: theme.palette.background.default,
        }
      },
      deleteContainer:{
        position: 'absolute',
        top: '0%',
        left: '0%',
        transform: 'translate(-50%, -50%)',
        zIndex: 10,
        color: theme.palette.primary.dark,
      },
      itemContainer:{
        overflow: 'visible'
      }
    });
}

export default styles;