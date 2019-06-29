const { question: ask } = require('readline-sync');

function askAndReturnSearchTerm() {
  return ask('Type a Wikipedia search term: ');
}

module.exports = {
  askAndReturnSearchTerm,
};
