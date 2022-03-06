"use strict"

const fs = require('fs');
const mobilenet = require('@tensorflow-models/mobilenet');
const poseDetection = require('@tensorflow-models/pose-detection');
const tfnode = require('@tensorflow/tfjs-node');

// https://github.com/tensorflow/tfjs-models/tree/master/pose-detection/src/movenet

const classify = (fileName) => {
    fs.readFile(`pictures/${fileName}.jpg`, (err, data) => {
        const tfimage = tfnode.node.decodeJpeg(data);
        // console.log(tfimage)
        const localPoseDetection = tfnode.loadLayersModel('file://models/default/model.json');
        // poseDetection.createDetector(poseDetection.)
        localPoseDetection.createDetector(poseDetection.SupportedModels.MoveNet)
            .then((detector) => {
                console.log(detector);
                detector.estimatePoses(tfimage).then((poses) => {
                    console.log(poses[0].keypoints);
                    console.log(poses[0].score);
                });
            });
    });
}

classify('nude');