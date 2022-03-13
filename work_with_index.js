"use strict"

const fs = require('fs');
const baseDir = "pictures";
const { performance } = require('perf_hooks');
const  {openDB, closeDB} = require('./dataBase');

const isVisited = async (shortUrl) => {
    const db = openDB();
    const sql = `SELECT * FROM 'index' WHERE (url == '${shortUrl}')`;
    return db.get(sql, (err, row) => {
        if (row !== undefined) {
            return true;
        }
        return false;
    });
}

isVisited('222222').then((res) => {
    console.log(res);
})