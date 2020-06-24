const fs = require('fs');
const process = require('process')
const axios = require('axios');
const argv = process.argv;
const { MarkovMachine } = require('./markov')

class MakeText {

    constructor(argv) {
        this.init(argv);
    }

    init(argv) {
        if (argv[2] === "--out") {
            this.mainChecker(argv[4], argv[3])
        } else {
            this.mainChecker(argv[2], null)
        }
    }

    mainChecker(path, out) {
        if (path.slice(0, 4).toLowerCase() === "http"
            && path.slice(path.length - 4) === ".txt") {
            this.fromURL(path, out)
        } else {
            this.fromFile(path, out)
        }
    }

    fromFile(path, out) {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) {
                console.log('ERROR:', err.message);
                process.exit(1);
            }
            if (out !== null) {
                let mm = this.startMarkovMachine(data);
                this.writeToFile(mm.makeText(100), out)
            } else {
                this.startMarkovMachine(data);
            }
        });
    }

    startMarkovMachine(data) {
        const mm = new MarkovMachine(data);
        console.log(mm.makeText(100));
    }

    writeToFile(data, out) {
        fs.writeFile(out, data, 'utf8', (err) => {
            if (err) {
                console.log(`Error: ${err}`)
                process.exit()
            }
        })
    }

    async fromURL(path, out) {
        try {
            const response = await axios.get(path);
            if (out !== null) {
                let mm = this.startMarkovMachine(response.data);
                this.writeToFile(mm.makeText(100), out)
            } else {
                this.startMarkovMachine(response.data)
            }
        } catch (error) {
            console.log(`Error fetching: ${path}`)
            console.log(`${error}`);
            process.exit(1);
        }
    }
}

const makeText = new MakeText(argv)