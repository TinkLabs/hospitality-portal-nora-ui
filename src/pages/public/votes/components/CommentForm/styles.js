const styles = theme => {
  return {
    form: {
      width: 500,
    },
    wrapper: {
      width: '80%',
      margin: "0 auto",
      marginTop: 20,
    },
    inputBlock:{
      fontSize: "1em",
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
    },
    container: {
      flexWrap: 'wrap',
    },
    coverImg: {
      width: '100%',
      height: 200,
      objectFit: "cover",
      borderRadius: 5,
    },
    submitButton: {
      marginTop: theme.spacing.unit * 2,
    },
    title:{
      marginTop: theme.spacing.unit * 2,
      paddingLeft: theme.spacing.unit,
    },
    caption: {
      paddingLeft: theme.spacing.unit,
    },
    rating: {
      display: "block",
    },
    ratingBlock:{
      display: "block",
      marginTop: theme.spacing.unit * 3,
      marginLeft: theme.spacing.unit,
    },
    ratingLabel: {
      fontSize: "14px",
    }
  };
}

export default styles;