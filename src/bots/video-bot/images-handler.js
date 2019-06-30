const gm = require('gm').subClass({ imageMagick: true });

async function convertImage(sentenceIndex) {
  return new Promise((resolve, reject) => {
    const inputFile = `./src/images/${sentenceIndex}-original.png`;
    console.log(`\x1b[31m[video-bot]\x1b[0m => Converting [${inputFile}]...`);
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
          reject(error);
        }
        console.log('\x1b[31m[video-bot]\x1b[0m => Image converted');
        resolve();
      });
  });
}
async function createSentenceImage(sentenceIndex, sentenceText) {
  return new Promise((resolve, reject) => {
    const outputFile = `./src/images/${sentenceIndex}-sentence.png`;
    console.log(`\x1b[31m[video-bot]\x1b[0m => Creating [${outputFile}]`);
    const templateSettings = {
      0: {
        size: '1920x400',
        gravity: 'center',
      },
      1: {
        size: '1920x1080',
        gravity: 'center',
      },
      2: {
        size: '800x1080',
        gravity: 'west',
      },
      3: {
        size: '1920x400',
        gravity: 'center',
      },
      4: {
        size: '1920x1080',
        gravity: 'center',
      },
      5: {
        size: '800x1080',
        gravity: 'west',
      },
      6: {
        size: '1920x400',
        gravity: 'center',
      },
      7: {
        size: '1920x400',
        gravity: 'center',
      },
      8: {
        size: '1920x1080',
        gravity: 'center',
      },
      9: {
        size: '800x1080',
        gravity: 'west',
      },
      10: {
        size: '1920x400',
        gravity: 'center',
      },
    };

    gm()
      .out('-size', templateSettings[sentenceIndex].size)
      .out('-gravity', templateSettings[sentenceIndex].gravity)
      .out('-background', 'transparent')
      .out('-fill', 'white')
      .out('-kerning', '-1')
      .out(`caption:${sentenceText}`)
      .write(outputFile, (error) => {
        if (error) {
          reject(error);
        }
        console.log('\x1b[31m[video-bot]\x1b[0m => Sentence created');
        resolve();
      });
  });
}

module.exports = {
  convertImage,
  createSentenceImage,
};
