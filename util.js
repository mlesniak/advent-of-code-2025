import fs from "fs";

export {load};

function load(day, {trim}={}) {
    if (trim === undefined) {
        trim = true;
    }
    const filename = `${day}`.padStart(2, '0');
    let input = fs.readFileSync(`input/${filename}.txt`, 'utf8');
    if (trim) {
        input = input.trim()
    }
    const lines = input.split('\n').filter(line => line[0] !== '#');

    return lines;
}
