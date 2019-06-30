const { convertImage, createSentenceImage } = require('./images-handler');
const state = require('../state-bot');

async function robot() {
  const videoContent = state.load();
  console.log('\x1b[32m[video-bot]\x1b[0m => Started');
  console.log('\x1b[32m[video-bot]\x1b[0m => Converting images');
  await convertAllImages(videoContent);
  console.log('\x1b[32m[video-bot]\x1b[0m => Creating sentences images');
  await createAllSentencesImages(videoContent);
  console.log('\x1b[32m[video-bot]\x1b[0m => Finished');
  state.save(videoContent);
}

async function convertAllImages(videoContent) {
  for (const sentence of videoContent.sentences) {
    const sentenceIndex = videoContent.sentences.indexOf(sentence);
    try {
      await convertImage(sentenceIndex);
    } catch (error) {
      console.log(`\x1b[32m[video-bot]\x1b[0m => ${error}`);
    }
  }
}

async function createAllSentencesImages(videoContent) {
  for (const sentence of videoContent.sentences) {
    const sentenceIndex = videoContent.sentences.indexOf(sentence);
    try {
      await createSentenceImage(sentenceIndex, sentence.text);
    } catch (error) {
      console.log(`\x1b[32m[video-bot]\x1b[0m => ${error}`);
    }
  }
}
module.exports = robot;
