"use strict"

const fs = require('fs');
const jimp = require('jimp');
const sizeOf = require('image-size');
const mobilenet = require('@tensorflow-models/mobilenet');
const tfnode = require('@tensorflow/tfjs-node');

const fileName = 'cat';


const classify = async () => {
    console.log('1');

    const lol = jimp.read(`pictures/${fileName}.png`, (err, jpgFile) => {
        if (err) throw err;
        console.log(jpgFile);
        console.log(jpgFile.bitmap.data);

        const tfimage = tfnode.TensorBuffer(jpgFile);
        mobilenet.load({
            version: 2,
            alpha: 1.0,
            modelUrl:
                'file://model/model.json',
        }).then(model => {
            model.classify(tfimage).then(predictions => {
                console.log('Predictions: ');
                console.log(predictions);
                // console.log(JSON.stringify(predictions));
                // console.log(JSON.stringify(predictions).length);
            });
        });


        return jpgFile
            //.resize(256, 256) // resize
            .quality(95) // set JPEG quality
            //.greyscale() // set greyscale
            .write(`pictures/${fileName}.jpg`); // save

    });



    // let readPromise = new Promise((resolve, reject) => {
    // });

    // await readPromise;


    // readPromise.then(() => {console.log('saved')});

    // console.log('2');
    // // const imageBuffer = fs.readFile(`pictures/${fileName}.jpg`);
    // fs.readFile(`pictures/${fileName}.jpg`, (err, data) => {
    //     const tfimage = tfnode.node.decodeImage(data);
    //     mobilenet.load({
    //         version: 2,
    //         alpha: 1.0,
    //         modelUrl:
    //             'file://model/model.json',
    //     }).then(model => {
    //         model.classify(tfimage).then(predictions => {
    //             console.log('Predictions: ');
    //             console.log(predictions);
    //             // console.log(JSON.stringify(predictions));
    //             // console.log(JSON.stringify(predictions).length);
    //         });
    //     });
    // });

    // console.log('3');
}


// function generateImagePixel() {
//     const promise = (() => {
//         return jimp.read(`pictures/${fileName}.png`)
//             .then(image => {
//                 return image
//                 .quality(95) // set JPEG quality
//                 .write(`pictures/${fileName}.jpg`); // save
//             })
//             .catch(console.error);
//     });

//     return promise;
// }


classify();