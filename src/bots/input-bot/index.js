const { question: ask, keyInSelect, questionInt: askNumber } = require('readline-sync');

function robot(videoContent) {
  videoContent.searchTerm = askAndReturnSearchTerm();
  videoContent.prefix = askAndReturnPrefix();
  videoContent.maxSentences = askAndReturnMaxSentences();
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
