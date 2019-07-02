const fs = require('fs');

const videoContentFilePath = './src/video-content/state.json';
const scriptFilePath = './src/video-content/after-effects-script.js';

function save(videoContent) {
  console.log('\x1b[35m[state-bot] => Saving state\x1b[0m');
  const videoContentString = JSON.stringify(videoContent);
  fs.writeFileSync(videoContentFilePath, videoContentString, 'utf-8');
}

function saveScript(videoContent) {
  console.log('\x1b[35m[state-bot] => Saving script\x1b[0m');
  const videoContentString = JSON.stringify(videoContent);
  const scriptString = `var content=${videoContentString}`;
  fs.writeFileSync(scriptFilePath, scriptString, 'utf-8');
}

function load() {
  console.log('\x1b[35m[state-bot] => Loading state\x1b[0m');
  const fileBuffer = fs.readFileSync(videoContentFilePath, 'utf-8');
  const videoContentJson = JSON.parse(fileBuffer);
  return videoContentJson;
}

module.exports = {
  save,
  saveScript,
  load,
};
