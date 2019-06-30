const { google } = require('googleapis');

const googlesearch = google.customsearch('v1');
const credentials = require('../../../credentials.json');

async function fetchAndReturnImagesLinks(query) {
  const { data: searchResults } = await googlesearch.cse.list({
    auth: credentials.googlesearch.apikey,
    cx: credentials.googlesearch.cseId,
    searchType: 'image',
    q: query,
    num: 2,
  });
  const imagesUrls = searchResults.items.map(item => item.link);
  return imagesUrls;
}

module.exports = {
  fetchAndReturnImagesLinks,
};
