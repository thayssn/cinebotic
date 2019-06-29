const { textBot } = require('./bots');
const { askAndReturnSearchTerm, askAndReturnPrefix } = require('./input');

async function start() {
  const videoContent = {};

  videoContent.searchTerm = askAndReturnSearchTerm();
  videoContent.prefix = askAndReturnPrefix();

  await textBot(videoContent);

  console.log(videoContent);
}

start();
