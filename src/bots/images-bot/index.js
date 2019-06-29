const { google } = require('googleapis');

const googlesearch = google.customsearch('v1');
const state = require('../state-bot');

const credentials = require('../../../credentials.json');


async function robot() {
  const videoContent = state.load();
  console.log('\x1b[36m[images-bot]\x1b[0m => Started');
  await fetchImagesOfAllSentences(videoContent);
  console.log('\x1b[36m[images-bot]\x1b[0m => Finished');
  state.save(videoContent);
}

async function fetchImagesOfAllSentences(videoContent) {
  for (const sentence of videoContent.sentences) {
    const query = `${videoContent.searchTerm} ${sentence.keywords[0]}`;
    sentence.googleSearchQuery = query;
    sentence.images = await fetchAndReturnImagesLinks(query);
  }
}

async function fetchAndReturnImagesLinks(query) {
  const { data: searchResults } = await googlesearch.cse.list({
    auth: credentials.googlesearch.apikey,
    cx: credentials.googlesearch.cseId,
    searchType: 'image',
    imgSize: 'xlarge',
    q: query,
    num: 2,
  });
  const imagesUrls = searchResults.items.map(item => item.link);
  return imagesUrls;
}

module.exports = robot;
