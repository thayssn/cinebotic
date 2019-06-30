const input = require('./bots/input-bot');
const text = require('./bots/text-bot');
const state = require('./bots/state-bot');
const images = require('./bots/images-bot');

async function start() {
  // input();
  // await text();
  await images();

  // console.dir(state.load(), { depht: null });
}

start();
