import fs from 'fs';

const day = 3;
const filename = `${day}`.padStart(2, '0');
const input = fs.readFileSync(`input/${filename}.txt`, 'utf8').trim();
const lines = input.split('\n').filter(line => line[0] !== '#')

function part1(lines) {
    let sum = 0;
    lines.forEach(line => {
        let nums = [];
        for(let i = 0; i < line.length; i++) {
           const c = line[i];
           nums.push(c - '0');
        };
        console.log(nums);

        let n1 = -1;
        let n2 = -1;
        for(let i = 0; i < nums.length; i++) {
            const cur = nums[i];
            if (cur > n1 && i !== nums.length -1 ) {
                n1 = cur;
                n2 = -1;
                continue;
            }
            if (cur > n2) {
                n2 = cur;
                continue;
            }
        }
        sum += n1*10 + n2;
        // console.log(`${n1} ${n2}`);
    });

    return sum;
}

function part2(lines) {
    let sum = 0n;
    lines.forEach(line => {
        let nums = [];
        for(let i = 0; i < line.length; i++) {
            const c = line[i];
            nums.push(c - '0');
        };
        // console.log(nums);

        let ns = Array(12);
        for (let i = 0; i < ns.length; i++) {
            ns[i] = -1;
        }
        for(let i = 0; i < nums.length; i++) {
            // console.log(`i=${i} nums[i]=${nums[i]}`);
            for (let j = 0; j < ns.length; j++) {
                // console.log(`  j=${j} ns[j] < nums[i]=${ns[j] < nums[i]} (ns.length - j > 0)=${(ns.length - j > 0)}`)
                if (ns[j] < nums[i] && ((nums.length - i) >= (ns.length - j))) {
                    ns[j] = nums[i];
                    // Alle nachfolgenden resetten.
                    for (let k = j+1; k < ns.length; k++) {
                        ns[k] = -1;
                    }
                    // console.log(`  => ${ns}`);
                    break;
                }
            }
        }
        const str = ns.join("");
        const bigN = BigInt(str);
        sum += bigN;

        // console.log(ns);
    });

    return sum.toString().replace('n', '');
}

// console.log(part1(lines));
console.log(part2(lines));