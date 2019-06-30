const { question: ask, keyInSelect, questionInt: askNumber } = require('readline-sync');
const state = require('../state-bot');

function robot() {
  const videoContent = {};
  console.log('\x1b[34m[input-bot] => Started');
  videoContent.searchTerm = askAndReturnSearchTerm();
  videoContent.prefix = askAndReturnPrefix();
  videoContent.maxSentences = askAndReturnMaxSentences();
  console.log('\x1b[34m[input-bot] => Finished');
  state.save(videoContent);
}
function askAndReturnSearchTerm() {
  return ask('Type a Wikipedia search term: ');
}

function askAndReturnPrefix() {
  const prefixes = ['Who is', 'What is', 'The history of'];
  const selectedPrefixIndex = keyInSelect(prefixes, 'Choose a prefix: ');
  const prefix = prefixes[selectedPrefixIndex];

  return prefix;
}

function askAndReturnMaxSentences() {
  return askNumber('How many sentences would you like? ');
}

module.exports = robot;
