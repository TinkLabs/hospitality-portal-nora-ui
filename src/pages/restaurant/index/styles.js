const styles = theme => {
  return {
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      position: 'relative',
      overflow: 'auto',
      borderRadius: theme.spacing.unit,
      minHeight: 500,
      textAlign: 'center',
    },
    listSection: {
      backgroundColor: 'inherit',
    },
    ul: {
      backgroundColor: 'inherit',
      padding: 0,
    },
    listItem: {
      alignItems: "stretch"
    },
    imageBlock: {
      height: 150,
      width: 150
    },
    listItemTitle: {
      display: "block",
      marginBottom: theme.spacing.unit,
    },
    card: {
      margin: theme.spacing.unit * 2,
      width: 275,
      height: 400,
      display: "inline-block",
    },
    media: {
      height: 140,
    },
    cardContent: {
      textAlign: 'left',
      minHeight: 180,
      maxHeight: 180,
      overflow: "hidden",
    },
    searchSection: {
      marginLeft: theme.spacing.unit * 2,
      marginRight: theme.spacing.unit * 2,
    },
    input: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200
    },
    pagination: {
      width: "fit-content",
      margin: "0 auto"
    },
    absolute: {
      position: 'fixed',
      bottom: 30,
      right: 30,
    },
  };
};

export default styles;