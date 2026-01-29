import {load} from './util.js';

function part1(equations) {
    // console.log(equations);
    let sum = 0n;
    var opIndex = equations.length - 1;
    for (let col = 0; col < equations[0].length; col++) {
        let op = equations[opIndex][col];
        if (op === '+') {
            let result = 0n;
            for (let j = 0; j < opIndex; j++) {
                result += equations[j][col];
            }
            // console.log(`sum: ${result}`)
            sum += result;
        } else if (op === '*') {
            let result = 1n;
            for (let j = 0; j < opIndex; j++) {
                // console.log(`  value=${equations[j][col]}`)
                result *= equations[j][col];
            }
            // console.log(`mul: ${result}`)
            sum += result;
        } else {
            throw new Error(`invalid op: ${op}, opIndex=${opIndex}, i=${col}`);
        }
    }

    return sum.toString();
}

function toBigInt(arr) {
    return BigInt(arr
        .filter(e => e !== '+' && e !== '*')
        .join(''));
}

function part2(lines) {
    const height = lines.length;

    let sum = 0n;
    let nums = [];
    for (let col = lines[0].length - 1; col >= 0; col--) {
        let num = [];
        for (let row = 0; row < height; row++) {
            let c = lines[row][col];
            if (c === ' ') {
                continue;
            }
            num.push(c);
        }
        if (num.length !== 0) {
            nums.push(num);
        }
        if (num.length === 0 || col === 0) {
            // console.log("Computing!");
            let opTmp = nums[nums.length - 1];
            let op = opTmp[opTmp.length - 1];
            nums = nums.map(toBigInt)
            if (op === '+') {
                let res = nums.reduce((a,b) => a+b);
                sum += res;
            } else if (op === '*') {
                let res = nums.reduce((a,b) => a*b);
                sum += res;
            } else {
                throw new Error(`Unknown op ${op}`);
            }

            nums = [];
        } else {
        }
    }
    
    return sum.toString();
}

function parse1() {
    const lines = load(6)
        .map(line => {
            return line.replaceAll('  ', ' ').trim();
        })
        .map(line => line.split(' '))
        .map(line => line.filter(e => e.length > 0));
    const equations = lines.map((line, i) => {
        if (i === lines.length - 1) {
            return line;
        }
        return line.map(e => BigInt(e));
    })
    return equations
}

function parse2() {
    const lines = load(6, {trim: false});
    const maxWidth = lines
        .map(line => line.length)
        .reduce((prev, cur) => Math.max(prev, cur));
    const fixedLines = lines
        .map(line => line.padEnd(maxWidth, ' '));

    return fixedLines;
}

// console.log(part1(parse1()));
console.log(part2(parse2()));