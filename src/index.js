const { textBot } = require('./bots');
const { askAndReturnSearchTerm, askAndReturnPrefix, askAndReturnMaxSentences } = require('./input');

async function start() {
  const videoContent = {};

  videoContent.searchTerm = askAndReturnSearchTerm();
  videoContent.prefix = askAndReturnPrefix();
  videoContent.maxSentences = askAndReturnMaxSentences();
  await textBot(videoContent);

  console.log(JSON.stringify(videoContent, false, 4));
}

start();
