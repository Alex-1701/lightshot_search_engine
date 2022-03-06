"use strict"

const fs = require('fs');
const jimp = require('jimp');
const sizeOf = require('image-size');
const mobilenet = require('@tensorflow-models/mobilenet');
const tfnode = require('@tensorflow/tfjs-node');

const classify = (fileName) => {
    console.log('1');
    const kek = jimp.read(`pictures/${fileName}.png`)
        .then(jpgFile => {
            return jpgFile
                // .resize(256, 256) // resize
                .quality(95) // set JPEG quality
                // .greyscale() // set greyscale
                .write(`pictures/${fileName}.jpg`) // save
        })
        .catch(err => {
            console.error(err);
        });

    // console.log(fs.existsSync(`pictures/${fileName}.jpg`));

    const timerId = setInterval(() => {
        if (fs.existsSync(`pictures/${fileName}.jpg`)) {
            clearInterval(timerId);
            console.log('2');
            fs.readFile(`pictures/${fileName}.jpg`, (err, data) => {
                const tfimage = tfnode.node.decodeImage(data);
                mobilenet.load({
                    version: 2,
                    alpha: 1.0,
                    modelUrl:
                        'file://models/default/model.json',
                }).then(model => {
                    model.classify(tfimage).then(predictions => {
                        console.log('Predictions: ');
                        console.log(predictions);
                        console.log(JSON.stringify(predictions));
                        console.log(JSON.stringify(predictions).length);
                    });
                    fs.unlink(`pictures/${fileName}.jpg`, (err) => {
                        if (err) throw err;
                        console.log('File deleted!');
                    });
                });
            });
            // console.log('3');
            return true;
        }
    }, 100);
}

classify('nude');