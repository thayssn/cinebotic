const { question: ask, keyInSelect } = require('readline-sync');

function askAndReturnSearchTerm() {
  return ask('Type a Wikipedia search term: ');
}

function askAndReturnPrefix() {
  const prefixes = ['Who is', 'What is', 'The history of'];
  const selectedPrefixIndex = keyInSelect(prefixes, 'Choose a prefix: ');
  const prefix = prefixes[selectedPrefixIndex];

  return prefix;
}

module.exports = {
  askAndReturnSearchTerm,
  askAndReturnPrefix,
};
