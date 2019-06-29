const fs = require('fs');

const videoContentFilePath = './src/bots/state-bot/state.json';

function save(videoContent) {
  console.log('\x1b[35m[state-bot] => Saving state\x1b[0m');
  const stringVideoContent = JSON.stringify(videoContent);
  fs.writeFileSync(videoContentFilePath, stringVideoContent, 'utf-8');
}

function load() {
  console.log('\x1b[35m[state-bot] => Loading state\x1b[0m');
  const fileBuffer = fs.readFileSync(videoContentFilePath, 'utf-8');
  const videoContentJson = JSON.parse(fileBuffer);
  return videoContentJson;
}

module.exports = {
  save,
  load,
};
