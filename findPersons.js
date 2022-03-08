"use strict"

const fs = require('fs');
const tfnode = require('@tensorflow/tfjs-node');
const bodyPix = require('@tensorflow-models/body-pix');

// https://github.com/tensorflow/tfjs-models/tree/master/body-pix

const classify = (fileName) => {
    fs.readFile(`pictures/${fileName}.jpg`, (err, data) => {
        const tfimage = tfnode.node.decodeJpeg(data);
        bodyPix.load().then((net) => {
            net.segmentPerson(tfimage).then((segmentation) => {
                console.log(segmentation);
            })
        })
    });
}

classify('man');