"use strict"

const axios = require("axios");
const HTMLParser = require("node-html-parser");

const baseUrl = "https://prnt.sc/";

const getImageLink = async (shortUrl) => {
    return axios.get(`${baseUrl}${shortUrl}`)
        .then((res) => {
            // console.log('success');
            const root = HTMLParser.parse(res.data);
            // console.log(root.innerHTML);
            if (root) {
                if (root.querySelector("#screenshot-image") !== null) {
                    const imgHtml = root.querySelector("#screenshot-image").outerHTML;
                    // console.log(imgHtml);
                    const urlRegex = /"https?:\/\/[^\s]+/;

                    const imgSrcAttr = imgHtml.match(urlRegex);
                    // console.log(imgSrcAttr);

                    if (imgSrcAttr !== null) {
                        const imgSrcUrl = imgSrcAttr[0].slice(1, -1);
                        // console.log(imgSrcUrl);
                        return imgSrcUrl;
                    } else {
                        return null;
                    }
                }
            }
        })
        .catch((error) => {
            // console.log('error');
            // console.log(error);
            // console.log(error.response?.status);
            return null;
        })
}

module.exports = { getImageLink };

// getImageLink('rf4638').then((res) => {
//     console.log(res);
// })