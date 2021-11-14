#! /usr/bin/env node

import fetch from 'node-fetch';
import { writeFile } from 'fs/promises';
import Yargs from 'yargs';

const args = Yargs(process.argv.slice(2))
    .usage('Usage: $0 --url [string] --int [num]')
    .describe('url', 'URL to record')
    .describe('int', 'Interval to wait before hitting the api again')
    .default('int', 5000)
    .demandOption(['url']).argv;

function handleResponse(response) {
    const fileName = `${Date.now()}.json`;
    const fileContents = JSON.stringify(response, null, 4);

    console.info(`Saving to drive: ${fileName}`);

    writeFile(fileName, fileContents, err => {
        if (err) {
            console.error(err);
            return;
        }
    });
}

function fetchData() {
    const url = args.url;

    if (!url) {
        throw new Error('Please provide a URL to record via --url');
    }

    console.info(`Requesting: ${url}`);

    fetch(url)
        .then(response => response.json())
        .then(handleResponse);
}

fetchData();
setInterval(fetchData, args.int);
