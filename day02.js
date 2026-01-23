import fs from 'fs';

const day = 2;
const filename = `${day}`.padStart(2, '0');
const input = fs.readFileSync(`input/${filename}.txt`, 'utf8').trim();
const lines = input.split('\n');

const invalidId = (id) => {
    let s = id + '';
    for (let i = 0; i <= s.length / 2; i++) {
        let p1 = s.substring(0, i + 1);
        let p2 = s.substring(i + 1);
        if (p1 === p2) {
            return true;
        }
    }
    return false;
}

const invalidIdPart2 = (id) => {
    let s = id + '';
    // console.log(`\n --- ${id}`)
    for (let i = 0; i <= s.length / 2; i++) {
        let pattern = s.substring(0, i + 1);
        let rest = s.substring(pattern.length);

        let duplicate = rest.length / pattern.length;
        if (duplicate === 0) {
            return false;
        }
        let copy = pattern.repeat(duplicate);
        // console.log(`${pattern}/${rest} duplicate=${duplicate} -> copy='${copy}'`);
        if (copy === rest) {
            return true;
        }
    }
    return false;
}


function part1(lines) {
    let tasks = lines[0].split(',');
    const re = /(\d+)-(\d+)/;

    let sum = 0;
    tasks.forEach(task => {
        // console.log(task);
        const [, fromS, toS] = task.match(re);
        const from = parseInt(fromS);
        const to = parseInt(toS);

        for (let i = from; i <= to; i++) {
            let isNotValid = invalidId(i);
            if (isNotValid) {
                sum += i;
            }
        }
    })

    return sum;
}

function part2(lines) {
    let tasks = lines[0].split(',');
    const re = /(\d+)-(\d+)/;

    let sum = 0;
    tasks.forEach(task => {
        // console.log(task);
        const [, fromS, toS] = task.match(re);
        const from = parseInt(fromS);
        const to = parseInt(toS);

        for (let i = from; i <= to; i++) {
            let isNotValid = invalidIdPart2(i);
            if (isNotValid) {
                // console.log(`  ${i}`)
                sum += i;
            }
        }
    })

    return sum;
}

console.log(part1(lines));
console.log(part2(lines));
// console.log(invalidIdPart2(101));

export {
    invalidId,
    invalidIdPart2
};