function removeBlankLinesAndMarkdown(text) {
  const allLines = text.split('\n');
  const linesWithContent = allLines.filter(line => line.trim().length !== 0 && !line.startsWith('='));
  return linesWithContent.join(' ');
}

function removeDatesInParentheses(text) {
  return text.replace(/\((?:\([^()]*\)|[^()])*\)/gm, '').replace(/ {2}/g, ' ');
}

module.exports = {
  removeBlankLinesAndMarkdown,
  removeDatesInParentheses,
};
