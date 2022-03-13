"use strict"

const axios = require('axios');
const tf = require('@tensorflow/tfjs-node');
const nsfw = require('nsfwjs');
// const { performance } = require('perf_hooks');


// Get Predictions by link.
const classifyNSFWByLink = async (link) => {
    const pic = await axios.get(link, {
        responseType: 'arraybuffer',
    })
    const model = await nsfw.load('file://./models/quant_mid/', { type: 'graph' }); // To load a local model, nsfw.load('file://./path/to/model/')
    // const model = nsfw.load(); // To load a local model, nsfw.load('file://./path/to/model/')
    // Image must be in tf.tensor3d format
    // you can convert image to tf.tensor3d with tf.node.decodeImage(Uint8Array,channels)
    const image = await tf.node.decodeImage(pic.data, 3);
    const predictions = await model.classify(image);
    image.dispose(); // Tensor memory must be managed explicitly (it is not sufficient to let a tf.Tensor go out of scope for its memory to be released).
    // console.log(predictions);
    return predictions;
}

// Get Predictions by link.
const classifyNSFWByFile = async (file) => {
    const model = await nsfw.load('file://./models/quant_mid/', { type: 'graph' }); // To load a local model, nsfw.load('file://./path/to/model/')
    // const model = nsfw.load(); // To load a local model, nsfw.load('file://./path/to/model/')
    // Image must be in tf.tensor3d format
    // you can convert image to tf.tensor3d with tf.node.decodeImage(Uint8Array,channels)

    const image = await tf.node.decodeImage(new Uint8Array(file), 3);

    const predictions = await model.classify(image);
    image.dispose(); // Tensor memory must be managed explicitly (it is not sufficient to let a tf.Tensor go out of scope for its memory to be released).
    // console.log(predictions);
    return predictions;
}

// Calculate NSFW coefficient by link.
const analyzeLink = async (link, categories = ['Sexy', 'Porn']) => {
    return classifyNSFWByLink(link).then((predictions) => {
        const probabilities = [];
        predictions.map(e => {
            if (categories.includes(e.className))
                probabilities.push(e.probability);
        })
        return Math.max(...probabilities);;
    })
}

// Calculate NSFW coefficient by file.
const analyzeFile = async (file, categories = ['Sexy', 'Porn']) => {
    return classifyNSFWByFile(file).then((predictions) => {
        const probabilities = [];
        predictions.map(e => {
            if (categories.includes(e.className))
                probabilities.push(e.probability);
        })
        return Math.max(...probabilities);;
    })
}

module.exports = { analyzeLink, analyzeFile };

// classifyNSFWByLink('https://image.prntscr.com/image/fuXOn3_QSBue61miYDFSLg.png').then((res) => {
//     console.log(res);
// })

// const t0 = performance.now();
// analyzeLink('https://image.prntscr.com/image/fuXOn3_QSBue61miYDFSLg.png').then((res) => {
//     console.log(res);
// })
// const t1 = performance.now();
// console.log(t1 - t0, 'milliseconds');

