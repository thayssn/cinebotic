const { textBot, inputBot } = require('./bots');

async function start() {
  const videoContent = {};
  inputBot(videoContent);
  await textBot(videoContent);

  console.log(JSON.stringify(videoContent, false, 4));
}

start();
