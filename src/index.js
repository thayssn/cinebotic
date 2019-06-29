const { askAndReturnSearchTerm } = require('./input');

function start() {
  const videoContent = {};

  videoContent.searchTerm = askAndReturnSearchTerm();

  console.log(videoContent);
}

start();
