"use strict"

const fs = require('fs');
const { analyzeFile } = require('./classifyNSFW');

const classifyImage = async (filePath) => {
    if (fs.existsSync(filePath)) {
        const file = fs.readFileSync(filePath);
        return analyzeFile(file).then((res) => {
            console.log(res);
            return res;
        })
    } else {
        return null;
    }
}

classifyImage('pictures/222222.png').then((res) => {
    console.log(res);
})