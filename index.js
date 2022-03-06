const axios = require("axios");
const { error } = require("console");
const fs = require("fs");
const HTMLParser = require("node-html-parser");
const {addressGenerator} = require('./addressGenerator');
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

const array = ["1", "2", "df4fd", "s", "psikaby", "23", "000000"];
// console.log(array);

// prefix.forEach((e, index) => {
//     setTimeout(() => {
//         getImage(e);
//     }, index * Math.random() * 10000);
// });

// getImage("1aa1bb");

async function getImage(shortUrl) {
    console.log(shortUrl);
    axios.get(`${baseUrl}${shortUrl}`)
        .then((res) => {
            console.log('success');
            const root = HTMLParser.parse(res.data);
            // console.log(root.innerHTML);
            if (root) {
                if (root.querySelector("#screenshot-image") !== null) {
                    const imgHtml = root.querySelector("#screenshot-image").outerHTML;
                    // console.log(imgHtml);
                    const urlRegex = /"https?:\/\/[^\s]+/;

                    imgSrcAttr = imgHtml.match(urlRegex);
                    // console.log(imgSrcAttr);
                    if (imgSrcAttr !== null) {
                        const imgSrcUrl = imgSrcAttr[0].slice(1, -1);
                        // console.log(imgSrcUrl);
                        downloadFile(imgSrcUrl, `${baseFolder}/${shortUrl}.png`).then(() => { console.log("picture", shortUrl, "loaded") });
                    }
                }
            }
        })
        .catch((error) => {
            console.log('error');
            console.log(error);
            console.log(error.response?.status);
        })
}

async function downloadFile(fileUrl, outputLocationPath) {
    // https://stackoverflow.com/questions/55374755/node-js-axios-download-file-stream-and-writefile
    const writer = fs.createWriteStream(outputLocationPath);

    return axios({
        method: "get",
        url: fileUrl,
        responseType: "stream",
    }).then(response => {

        //ensure that the user can call `then()` only when the file has
        //been downloaded entirely.

        return new Promise((resolve, reject) => {
            response.data.pipe(writer);
            let error = null;
            writer.on("error", err => {
                error = err;
                writer.close();
                reject(err);
            });
            writer.on("close", () => {
                if (!error) {
                    resolve(true);
                }
                //no need to call the reject here, as it will have been called in the
                //"error" stream;
            });
        });
    });
}


