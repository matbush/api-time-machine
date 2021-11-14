import fetch from 'node-fetch';
import { writeFile } from 'fs/promises';

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

function fetchData( url ) {
    console.info(`Requesting: ${url}`);

    fetch(url)
        .then(response => response.json())
        .then(handleResponse);
}

export default (url, options) => {
    fetchData(url);
    setInterval(() => fetchData(url), options.interval);
};
