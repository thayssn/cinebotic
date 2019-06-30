const gm = require('gm').subClass({ imageMagick: true });
const { image: saveImage } = require('image-downloader');

async function downloadImageAndSave(url, filename) {
  return saveImage({
    url,
    dest: `./src/images/${filename}`,
  });
}

async function convertImage(sentenceIndex) {
  return new Promise((resolve, reject) => {
    const inputFile = `./src/images/${sentenceIndex}-original.png`;
    console.log(`\x1b[36m[images-bot]\x1b[0m => Converting [${inputFile}]`);
    const convertedFile = `./src/images/${sentenceIndex}-converted.png`;
    const width = 1920;
    const height = 1080;

    gm()
      .in(inputFile)
      .out('(')
      .out('-clone')
      .out('0')
      .out('-background', 'white')
      .out('-blur', '0x9')
      .out('-resize', `${width}x${height}^`)
      .out(')')
      .out('(')
      .out('-clone')
      .out('0')
      .out('-background', 'white')
      .out('-resize', `${width}x${height}`)
      .out(')')
      .out('-delete', '0')
      .out('-gravity', 'center')
      .out('-compose', 'over')
      .out('-composite')
      .out('-extent', `${width}x${height}`)
      .write(convertedFile, (error) => {
        if (error) {
          reject(new Error(`Error converting ${inputFile}`));
        }
        resolve();
      });
  });
}
module.exports = {
  convertImage,
  downloadImageAndSave,
};
