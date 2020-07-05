/** Command-line tool to generate Markov text. */
const {MarkovMachine} = require('./markov');
const fs = require('fs');
const axios = require('axios');
const process = require('process');

function makeFileText(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading ${path}:\n${err}`);
            process.exit(1);
        }
        let mm = new MarkovMachine(data)
        console.log(mm.makeText())
        }
    )
}

function makeURLText(path) {
    axios.get(path)
    .then((data) => {
        let mm = new MarkovMachine(data.data)
        console.log(mm.makeText())
    })
    .catch((err) => {
        console.error(`Error fetching ${path}:\n${err}`);
        process.exit(1);
    })
}

if (process.argv[2] == 'file') {
    makeFileText(process.argv[3]);
}
else if (process.argv[2] == 'url') {
    makeURLText(process.argv[3]);
}
else {
    console.error("Please identify whether you want to make text from a url or a file.")
    process.exit(1);
}