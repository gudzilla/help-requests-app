export const styles = {
  favoriteButton: {
    minWidth: '32px',
    height: '32px',
    width: '32px',
    p: 0,
    border: '1px solid rgba(0, 0, 0, 0.12)',
    marginLeft: 'auto',
  },
  favoriteButtonIcon: {
    color: 'rgba(0, 0, 0, 0.56)',
  },
  title: {
    'p': 0,
    'display': '-webkit-box',
    'overflow': 'hidden',
    'WebkitBoxOrient': 'vertical',
    'lineClamp': 3,
    'WebkitLineClamp': 3,
    '& .MuiCardHeader-title': {
      lineHeight: 1.3,
    },
    // проблема в том что height меняется в 'height'
    // prettier-ignore
    height: '5.85rem',
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
