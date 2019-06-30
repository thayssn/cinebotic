const gm = require('gm').subClass({ imageMagick: true });
const { convertImage, createSentenceImage } = require('./images-handler');
const state = require('../state-bot');

async function robot() {
  const videoContent = state.load();
  console.log('\x1b[31m[video-bot] => Started');
  console.log('\x1b[31m[video-bot]\x1b[0m => Converting images');
  await convertAllImages(videoContent);
  console.log('\x1b[31m[video-bot]\x1b[0m => Creating sentences images');
  await createAllSentencesImages(videoContent);
  console.log('\x1b[31m[video-bot]\x1b[0m => Creating YouTube thumbnail');
  await createYouTubeThumbnail(videoContent);
  console.log('\x1b[31m[video-bot] => Finished');
  state.save(videoContent);
}

async function convertAllImages(videoContent) {
  for (const sentence of videoContent.sentences) {
    const sentenceIndex = videoContent.sentences.indexOf(sentence);
    try {
      await convertImage(sentenceIndex);
    } catch (error) {
      console.log(`\x1b[31m[video-bot]\x1b[0m => ${error}`);
    }
  }
}

async function createAllSentencesImages(videoContent) {
  for (const sentence of videoContent.sentences) {
    const sentenceIndex = videoContent.sentences.indexOf(sentence);
    try {
      await createSentenceImage(sentenceIndex, sentence.text);
    } catch (error) {
      console.log(`\x1b[31m[video-bot]\x1b[0m => ${error}`);
    }
  }
}

async function createYouTubeThumbnail() {
  return new Promise((resolve, reject) => {
    gm()
      .in('./src/images/0-converted.png')
      .write('./src/images/youtube-thumbnail.jpg', (error) => {
        if (error) {
          reject(error);
        }

        console.log('\x1b[31m[video-bot]\x1b[0m => Thumbnail created');
        resolve();
      });
  });
}

module.exports = robot;
