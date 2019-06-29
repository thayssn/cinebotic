const { askAndReturnSearchTerm, askAndReturnPrefix } = require('./input');

function start() {
  const videoContent = {};

  videoContent.searchTerm = askAndReturnSearchTerm();
  videoContent.prefix = askAndReturnPrefix();
  console.log(videoContent);
}

start();
