const del = require('del');
const { image: saveImage } = require('image-downloader');
const { fetchAndReturnImagesLinks } = require('./google-search');
const state = require('../state-bot');

async function robot() {
  const videoContent = state.load();
  console.log('\x1b[32m[images-bot]\x1b[0m => Started');
  console.log('\x1b[32m[images-bot]\x1b[0m => Cleaning images folder ');
  await cleanImagesFolder();
  console.log('\x1b[32m[images-bot]\x1b[0m => Fetching images from Google');
  await fetchImagesOfAllSentences(videoContent);
  await downloadImagesOfAllSentences(videoContent);
  console.log('\x1b[32m[images-bot]\x1b[0m => Finished');
  state.save(videoContent);
}

async function cleanImagesFolder() {
  await del(['./src/images/*']);
}

async function fetchImagesOfAllSentences(videoContent) {
  for (const sentence of videoContent.sentences) {
    const query = `${videoContent.searchTerm} ${sentence.keywords[0]}`;
    sentence.googleSearchQuery = query;
    sentence.images = await fetchAndReturnImagesLinks(query);
  }
}

async function downloadImagesOfAllSentences(videoContent) {
  videoContent.downloadedImages = [];
  for (const sentence of videoContent.sentences) {
    const sentenceIndex = videoContent.sentences.indexOf(sentence);
    for (const imageUrl of sentence.images) {
      try {
        if (videoContent.downloadedImages.includes(imageUrl)
        || (!imageUrl.includes('.jpg') && !imageUrl.includes('.png'))) {
          throw new Error('Duplicated image');
        }

        console.log(`\x1b[32m[images-bot]\x1b[0m => Downloading [${imageUrl}]`);
        await downloadImageAndSave(imageUrl, `${sentenceIndex}-original.png`);
        console.log('\x1b[32m[images-bot]\x1b[0m => Success \n');
        videoContent.downloadedImages.push(imageUrl);
        break;
      } catch (error) {
        console.log(`\x1b[32m[images-bot]\x1b[0m => ${error}. Trying again...`);
      }
    }
  }
  console.log('\x1b[32m[images-bot]\x1b[0m => Total files =>', videoContent.downloadedImages.length);
}

async function downloadImageAndSave(url, filename) {
  return saveImage({
    url,
    dest: `./src/images/${filename}`,
  });
}
module.exports = robot;
