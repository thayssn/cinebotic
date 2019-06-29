const algorithmia = require('algorithmia');
const { sentences: toSentences } = require('sbd');
const credentials = require('../../../credentials.json');
const { removeBlankLinesAndMarkdown, removeDatesInParentheses } = require('./sanitizer');
const { fetchWatsonAndReturnKeywords } = require('./watson-nlu');

const authorizedAlgorithmia = algorithmia(credentials.algorithmia.apikey);


async function textBot(videoContent) {
  console.log(`\x1b[33m[text-bot]\x1b[0m => Fetching content for: ${videoContent.prefix} ${videoContent.searchTerm}`);
  await fetchSourceContent(videoContent);
  sanitizeSourceContent(videoContent);
  breakSourceIntoSentences(videoContent);
  const firstSentenceKeywords = await fetchWatsonAndReturnKeywords(videoContent.sentences[0]);
  console.log(firstSentenceKeywords);
}

async function fetchSourceContent(videoContent) {
  const wikipediaAlgo = authorizedAlgorithmia.algo('web/WikipediaParser/0.1.2?timeout=300');
  try {
    const wikipediaResponse = await wikipediaAlgo.pipe(videoContent.searchTerm);
    const wikipediaContent = await wikipediaResponse.get();
    videoContent.originalSourceContent = wikipediaContent.content;
  } catch (error) {
    throw error;
  }
}

function sanitizeSourceContent(videoContent) {
  const originalText = videoContent.originalSourceContent;
  const withoutBlankLinesAndMarkdown = removeBlankLinesAndMarkdown(originalText);
  const withoutDatesInParentheses = removeDatesInParentheses(withoutBlankLinesAndMarkdown);
  videoContent.sanitizedSourceContent = withoutDatesInParentheses;
}

function breakSourceIntoSentences(videoContent) {
  const sentences = toSentences(videoContent.sanitizedSourceContent);

  videoContent.sentences = sentences.map(sentence => ({
    text: sentence,
    keywords: [],
    images: [],
  }));
}


module.exports = textBot;