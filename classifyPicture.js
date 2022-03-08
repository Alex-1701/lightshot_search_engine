"use strict"

const fs = require('fs');
const tfnode = require('@tensorflow/tfjs-node');
const cocoSsd = require('@tensorflow-models/coco-ssd');

// https://github.com/tensorflow/tfjs-models/tree/master/coco-ssd

const classify = (fileName) => {
    fs.readFile(`pictures/${fileName}.jpg`, (err, data) => {
        const tfimage = tfnode.node.decodeJpeg(data);
        cocoSsd.load().then((model) => {
            model.detect(tfimage).then((predictions) => {
                console.log(predictions);
            })
        })
    });
}

classify('bb22ab');