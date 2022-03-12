"use strict"

const fs = require('fs');
const { analyzeFile } = require('./classifyNSFW');

const filePath = 'pictures/222222.png';

console.log(fs.existsSync(filePath));

fs.readFile(filePath, (data) => {
    console.log(data);
    // analyzeFile(data).then((res) => {
    //     console.log(res);
    // })
})
