const textBot = require('./bots/text-bot');
const inputBot = require('./bots/input-bot');

async function start() {
  inputBot();
  await textBot();
}

start();
