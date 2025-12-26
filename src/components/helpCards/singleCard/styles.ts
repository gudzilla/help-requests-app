export const styles = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    // minHeight: { sm: '818px' },
    height: '100%',
    cursor: 'pointer',
  },
  cardBody: {
    padding: '10px 16px 20px 16px',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  cardBodyContent: {
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    marginBottom: '20px',
  },
  favoriteButton: {
    minWidth: '36px',
    height: '36px',
    padding: 0,
    border: 1,
    borderColor: 'divider',
    marginLeft: 'auto',
  },
  favIcon: {
    color: 'action.active',
  },
  title: {
    'fontSize': '1.5rem',
    'p': 0,
    'display': '-webkit-box',
    'overflow': 'hidden',
    'WebkitBoxOrient': 'vertical',
    'lineClamp': 3,
    'WebkitLineClamp': 3,
    '& .MuiCardHeader-title': {
      lineHeight: 1.3,
    },
    'height': `calc(1.3em * 3)`,
  },
  oneLineText: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  goalDescription: {
    display: '-webkit-box',
    overflow: 'hidden',
    WebkitBoxOrient: 'vertical',
    lineClamp: 2,
    WebkitLineClamp: 2,
  },
};
