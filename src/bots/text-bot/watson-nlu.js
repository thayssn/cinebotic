const NaturalLanguageUnderstanding = require('watson-developer-cloud/natural-language-understanding/v1');
const credentials = require('../../../credentials.json');

const nlu = new NaturalLanguageUnderstanding({
  iam_apikey: credentials.watsonnlu.apikey,
  version: '2018-04-05',
  url: credentials.watsonnlu.url,
});

async function fetchWatsonAndReturnKeywords(sentence) {
  return new Promise((resolve, reject) => {
    nlu.analyze({
      text: sentence.text,
      features: {
        keywords: {},
      },
    }, (error, response) => {
      if (error) {
        reject(error);
      }

      const keywords = response.keywords.map(keyword => keyword.text);
      resolve(keywords);
    });
  });
}

module.exports = {
  fetchWatsonAndReturnKeywords,
};
