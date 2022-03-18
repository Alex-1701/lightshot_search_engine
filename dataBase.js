"use strict"

const sqlite3 = require("sqlite3").verbose();
const { performance } = require('perf_hooks');

const closeDB = (db) => {
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log("Close the database connection.");
    });
};

const openDB = () => {
    return new sqlite3.Database("registry.db", sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message)
        }
        console.log("open the database.")
    })
};

const db = openDB();

const appendToRegistry = async (url, value) => {
    const sql = `INSERT or IGNORE INTO 'index' VALUES ('${url}', ${value})`;
    // console.log(sql);
    try {
        db.run(sql);
    } catch {
        console.log('error', sql);
    }
}

const isInRegistry = async (url) => {
    const sql = `SELECT * FROM 'index' WHERE (url == '${url}')`;
    console.log(sql);
    try {
        const res = await db.get(sql);
        console.log (res);
        return res;
    } catch {
        console.log('error', sql);
    }
}


module.exports = { openDB, closeDB, appendToRegistry, isInRegistry }