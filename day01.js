import fs from 'fs';

const day = 1;
const filename = `${day}`.padStart(2, '0');
const input = fs.readFileSync(`input/${filename}.txt`, 'utf8').trim();
const lines = input.split('\n');

function part1(lines) {
    let count = 0;
    let dial = 50;
    for (let l of lines) {
        // console.log(`Line: ${l}`);
        let c = l[0];
        let n = parseInt(l.substring(1));
        if (c === 'R') {
            dial = (dial + n) % 100;
        }
        if (c === 'L') {
            let k = dial - n;
            if (k < 0) {
                dial = (100 + k) % 100;
            } else {
                dial = dial - n;
            }
        }
        if (dial === 0) {
            count++;
        }
    }
    return count;
}

function part2(lines) {
    let count = 0;
    let dial = 50;
    for (let l of lines) {
        // console.log(`Line: ${l}`);
        let c = l[0];
        let n = parseInt(l.substring(1));
        if (c === 'R') {
            // @mlesniak
            while (n > 0) {
                dial = (dial + 1) % 100;
                if (dial === 0) {
                    count++;
                }
                n--;
            }
        }
        if (c === 'L') {
            while (n > 0) {
                dial = dial - 1;
                if (dial === 0) {
                    count++;
                }
                if (dial < 0) {
                    dial = 99;
                }
                n--;
            }
        }
        // console.log(`  dial=${dial}, count=${count}`);
    }
    return count;
}

console.log(part1(lines));
console.log(part2(lines));
