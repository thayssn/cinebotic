const algorithmia = require('algorithmia');
const { algorithmia: { apikey } } = require('../../credentials.json');

const authAlgorithmia = algorithmia(apikey);

async function robot(videoContent) {
  console.log(`\x1b[33m[text-bot]\x1b[0m => Fetching content for: ${videoContent.prefix} ${videoContent.searchTerm}`);
  await fetchSourceContent(videoContent);

  // sanitizeSourceContent(videoContent);
  // breakSourceIntoSentences(videoContent);
}

async function fetchSourceContent(videoContent) {
  const wikipediaAlgo = authAlgorithmia.algo('web/WikipediaParser/0.1.2?timeout=300');
  try {
    const wikipediaResponse = await wikipediaAlgo.pipe(videoContent.searchTerm);
    const wikipediaContent = await wikipediaResponse.get();
    videoContent.originalSourceContent = wikipediaContent;
  } catch (err) {
    console.log('erro', err);
  }
}

module.exports = robot;
