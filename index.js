"use strict"

const axios = require("axios");
const fs = require("fs");
const HTMLParser = require("node-html-parser");
const { addressGenerator } = require('./addressGenerator');
const { analyze } = require('./classifyNSFW');
// const adressAlphabet = 'abcdefghijklmnopqrstuvwxyz1234567890';
const adressAlphabet = 'abc';
const addressLenght = 3;

const baseFolder = "pictures";
const baseUrl = "https://prnt.sc/";

const generator = addressGenerator(adressAlphabet, addressLenght);

let adress = generator.next();

while (!adress.done) {
    console.log(adress);
    adress = generator.next();
}



// const prefix = getAllUrlPrefix();

// function getAllUrlPrefix() {
//     text = fs.readFileSync("prefix.txt", "utf8");
//     // console.log(text);
//     const arr = text.split("\n");
//     // console.log(array);
//     return arr;
// }

// console.log(prefix.length);

const array = ["1", "2", "df4fd", "s", "psikaby", "23", "000000", 'rf4638'];
// console.log(array);

// prefix.forEach((e, index) => {
//     setTimeout(() => {
//         getImage(e);
//     }, index * Math.random() * 10000);
// });

// getImage("1aa1bb");


