import fs from "fs";

export {load};

function load(day) {
    const filename = `${day}`.padStart(2, '0');
    const input = fs.readFileSync(`input/${filename}.txt`, 'utf8').trim();
    const lines = input.split('\n').filter(line => line[0] !== '#')

    return lines;
}
