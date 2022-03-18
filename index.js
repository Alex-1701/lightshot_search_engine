"use strict"

// const axios = require("axios");
// const fs = require("fs");
// const HTMLParser = require("node-html-parser");
const { addressGenerator } = require('./addressGenerator');
const { getImageLink } = require('./page_parser')
const { analyzeLink } = require('./classifyNSFW');
const { appendToRegistry, isInRegistry } = require('./dataBase');
// const adressAlphabet = 'abcdefghijklmnopqrstuvwxyz1234567890';
const adressAlphabet = 'z12';
const addressLenght = 6;
const { performance } = require('perf_hooks');

const baseFolder = "pictures";
const baseUrl = "https://prnt.sc/";

const minDelay = 2000; //ms
const maxDelay = 3000; //ms

const generator = addressGenerator(adressAlphabet, addressLenght);

let adress = generator.next();

const sleep = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time));
}

const main = async () => {
    while (!adress.done) {
        // const test0 = performance.now();
        const t0 = performance.now();

        const newAdress = adress.value;
        console.log(newAdress, await isInRegistry(newAdress));
        // const imageURL = await getImageLink(newAdress);
        // const analyzeRes = await analyzeLink(imageURL);
        // const analyzePercent = parseFloat((analyzeRes).toFixed(2)) * 100
        // console.log(newAdress, analyzeRes, analyzePercent);
        // appendToRegistry(newAdress, analyzePercent);



        adress = generator.next();
        const t1 = performance.now();
        const passedTime = t1 - t0;
        await sleep(Math.random() * (maxDelay - minDelay) + minDelay - passedTime);
        // const test1 = performance.now();
        // console.log(test1- test0);
    }
}

main();


// const prefix = getAllUrlPrefix();

// function getAllUrlPrefix() {
//     text = fs.readFileSync("prefix.txt", "utf8");
//     // console.log(text);
//     const arr = text.split("\n");
//     // console.log(array);
//     return arr;
// }

// console.log(prefix.length);

// const array = ["1", "2", "df4fd", "s", "psikaby", "23", "000000", 'rf4638'];
// console.log(array);

// prefix.forEach((e, index) => {
//     setTimeout(() => {
//         getImage(e);
//     }, index * Math.random() * 10000);
// });

// getImage("1aa1bb");


