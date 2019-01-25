const styles = (theme) => {
  return {
    wrapper: {
      marginLeft: theme.spacing.unit * 2,
      marginRight: theme.spacing.unit * 2,
      marginBottom: theme.spacing.unit,
      width: '-webkit-fill-available',
    },
    radioLabelContainer: {
      height: 'fit-content',
    },
    radioButton: {
      paddingTop: 0,
      paddingBottom: 0,
      fontSize: theme.spacing.unit * 2,
    },
    radioLabel: {
      fontSize: 1,
    }
  };
}

export default styles;