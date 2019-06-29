const algorithmia = require('algorithmia');
const { sentences: toSentences } = require('sbd');
const credentials = require('../../../credentials.json');
const { removeBlankLinesAndMarkdown, removeDatesInParentheses } = require('./sanitizer');
const { fetchWatsonAndReturnKeywords } = require('./watson-nlu');
const state = require('../state-bot');

const authorizedAlgorithmia = algorithmia(credentials.algorithmia.apikey);

async function robot() {
  const videoContent = state.load();
  console.log('\x1b[33m[text-bot]\x1b[0m => Started');
  console.log(`\x1b[33m[text-bot]\x1b[0m => Fetching content for: ${videoContent.prefix} ${videoContent.searchTerm}...`);
  await fetchSourceContent(videoContent);
  console.log('\x1b[33m[text-bot]\x1b[0m => Sanitizing original content...');
  sanitizeSourceContent(videoContent);
  console.log('\x1b[33m[text-bot]\x1b[0m => Separating content into sentences...');
  breakSourceIntoSentences(videoContent);
  console.log(`\x1b[33m[text-bot]\x1b[0m => Getting the first ${videoContent.maxSentences} sentences...`);
  limitMaxSentences(videoContent);
  console.log('\x1b[33m[text-bot]\x1b[0m => Fetching keywords from Watson');
  await fetchKeywordsForAllSentences(videoContent);
  console.log('\x1b[33m[text-bot]\x1b[0m => Finished');
  state.save(videoContent);
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

function limitMaxSentences(videoContent) {
  videoContent.sentences = videoContent.sentences.slice(0, videoContent.maxSentences);
}

async function fetchKeywordsForAllSentences(videoContent) {
  for (const sentence of videoContent.sentences) {
    sentence.keywords = await fetchWatsonAndReturnKeywords(sentence.text);
  }
}


module.exports = robot;
