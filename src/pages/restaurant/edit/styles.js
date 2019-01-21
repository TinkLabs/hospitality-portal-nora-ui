const styles = (theme) => {
  return {
    inputBlock: {
      marginLeft: theme.spacing.unit / 2,
      marginRight: theme.spacing.unit / 2,
      marginTop: theme.spacing.unit,
    },
    wrapper: {
      paddingLeft: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
    },
    multiBlock: {
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit,
      display: "block"
    },
    submitButton: {
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit * 2,
    },
    coverImage: {
      width: "100%",
      borderRadius: theme.spacing.unit,
      height: "250px",
      objectFit: "cover",
    }
  }
}

export default styles;