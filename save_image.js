"use strict"

const axios = require("axios");
const fs = require("fs");
const baseFolder = "pictures";
const { performance } = require('perf_hooks');

const downloadFile = async (fileUrl, outputLocationPath) => {
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

module.exports = { downloadFile };

// const t0 = performance.now();
// downloadFile('https://image.prntscr.com/image/JmFyoDD3RSK9kg31_ngyAg.png', `${baseFolder}/rf4638.png`).then(res => {
//     console.log(res);
// })
// const t1 = performance.now();
// console.log(t1 - t0, 'milliseconds');