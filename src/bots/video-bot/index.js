const gm = require('gm').subClass({ imageMagick: true });
const path = require('path');
const { spawn } = require('child_process');

const rootPath = path.resolve(__dirname, '..', '..');
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
  console.log('\x1b[31m[video-bot]\x1b[0m => Saving script for After Effects');
  createAfterEffectsScripts(videoContent);
  console.log('\x1b[31m[video-bot]\x1b[0m => Rendering Video with After Effects');
  await renderVideoWithAfterEffects();

  console.log('\x1b[31m[video-bot] => Finished');
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

async function createAfterEffectsScripts(videoContent) {
  state.saveScript(videoContent);
}

async function renderVideoWithAfterEffects() {
  return new Promise((resolve) => {
    const aerenderFilePath = '/Applications/Adobe After Effects CC 2019/aerender';
    const templateFilePath = `${rootPath}/video/template.aep`;
    const destinationFilePath = `${rootPath}/video/output.mov`;

    console.log('\x1b[31m[video-bot]\x1b[0m => Stating After Effects...');

    const aerender = spawn(aerenderFilePath, [
      '-comp', 'Main',
      '-project', templateFilePath,
      '-output', destinationFilePath,
    ]);

    aerender.stdout.on('data', (data) => {
      process.stdout.write('\x1b[31m[video-bot]\x1b[0m => making the magic...', data);
    });

    aerender.on('close', () => {
      console.log('\x1b[31m[video-bot]\x1b[0m => After Effects closed...');
      resolve();
    });
  });
}
module.exports = robot;
