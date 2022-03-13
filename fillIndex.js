"use strict"

const fs = require('fs');
const { analyzeFile } = require('./classifyNSFW');
const sqlite3 = require("sqlite3").verbose();
const baseDir = "pictures";
const { performance } = require('perf_hooks');

// 22346.1890001297 milliseconds for 100 images ~ 220 ms per image

const classifyImage = async (filePath) => {
    if (fs.existsSync(filePath)) {
        let file = fs.readFileSync(filePath);
        return analyzeFile(file).then((res) => {
            // console.log(res);
            file = null;
            return res;
        })
        
    } else {
        return null;
    }
}

const closeDatabase = (db) => {
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log("Close the database connection.");
    });
};

const openDatabase = () => {
    return new sqlite3.Database("registry.db", sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message)
        }
        console.log("open the database.")
    })
};

const allFiles = fs.readdirSync(baseDir);
console.log(allFiles);
const first10Files = allFiles.slice(0, 10);
console.log(first10Files);

const db = openDatabase();
const classifyAllImages = async (files) => {
    return files.map(async (fileName) => {
        const res = await classifyImage(`${baseDir}/${fileName}`);
        const sql = `INSERT or IGNORE INTO 'index' VALUES ('${fileName.slice(0, -4)}', ${parseFloat((res).toFixed(2)) * 100})`;
        console.log(sql);
        try {
            db.run(sql);
        } catch {
            console.log('error', sql);
        }
    });
}

classifyAllImages(first10Files).then(() => {
    // closeDatabase(db);
});

// const t0 = performance.now();
// classifyAllImages(first10Files).then(res => {
//     console.log(res);
//     console.log(res.length);
//     // const t1 = performance.now();
//     console.log(t1 - t0, 'milliseconds');


//     const db = openDatabase();
//     res.forEach((e) => {
//         const sql = `INSERT INTO 'index' VALUES ('${e.name.slice(0, -4)}', ${parseFloat((e.probability).toFixed(2)) * 100})`;
//         console.log(sql);
//         db.run(sql);
//     })

//     closeDatabase(db);
// });

// classifyImage('pictures/222222.png').then((res) => {
//     console.log(res);
// })