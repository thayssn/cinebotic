const input = require('./bots/input-bot');
const text = require('./bots/text-bot');
const state = require('./bots/state-bot');
const images = require('./bots/images-bot');
const video = require('./bots/video-bot');

async function start() {
  input();
  await text();
  await images();
  await video();
}

start();
