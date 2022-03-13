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

module.exports = {openDB, closeDB}