// REQUEST ABORTION via TIMEOUT
if (error.code === 'ECONNABORTED') {
  console.error('Request timed out:', error.message);
}
