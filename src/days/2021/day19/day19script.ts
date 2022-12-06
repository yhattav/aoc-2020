// function readTextFile(file)
// {
//     debugger;
//     var rawFile = new XMLHttpRequest();
//     rawFile.open("GET", file, false);
//     rawFile.onreadystatechange = function ()
//     {
//         if(rawFile.readyState === 4)
//         {
//             if(rawFile.status === 200 || rawFile.status == 0)
//             {
//                 var allText = rawFile.responseText;
//                 alert(allText);
//             }
//         }
//     }
//     rawFile.send(null);
// }
// const input = readTextFile("./file.txt");

import {exampleArray, inputArray} from './day19Input'
export async function script1(useExample: boolean) {
    const usedInput = useExample ? exampleArray : inputArray;
    let _res 
    _res = run(usedInput);
    return _res;
}
export async function script2(useExample: boolean) {
    const usedInput = useExample ? exampleArray : inputArray;
    let _res 
    _res = run2(usedInput);
    return _res;
}

const run = (input) => {
    const all = new Set();
    solve(input).forEach(x => x.beacons.forEach(x => all.add(x.join(','))));
    return all.size;
}
const run2 = (input) => {
    const distances = [];
    const scanners = solve(input);
    for (const { position: a } of scanners) {
      for (const { position: b } of scanners) {
        distances.push(a.reduce((sum, x, i) => sum + Math.abs(x - b[i]), 0));
      }
    }
    return Math.max(...distances);
}




function rotate([x, y, z], orientation) {
    return [
      [x, y, z],
      [x, z, -y],
      [x, -y, -z],
      [x, -z, y],
      [y, x, -z],
      [y, z, x],
      [y, -x, z],
      [y, -z, -x],
      [z, x, y],
      [z, y, -x],
      [z, -x, -y],
      [z, -y, x],
      [-x, y, -z],
      [-x, z, y],
      [-x, -y, z],
      [-x, -z, -y],
      [-y, x, z],
      [-y, z, -x],
      [-y, -x, -z],
      [-y, -z, x],
      [-z, x, -y],
      [-z, y, x],
      [-z, -x, y],
      [-z, -y, -x],
    ][orientation];
  }
  
  function match(scanner1, scanner2) {
    for (let index = 0; index < 24; index++) {
      const distances = new Map();
      const rotated = scanner2.map(x => rotate(x, index));
      for (const a of scanner1) {
        for (const b of rotated) {
          const delta = [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
          const key = delta.join(',')
          distances.set(key, (distances.get(key) || 0) + 1);
          if (distances.get(key) >= 12) { //if at least 12 are the same distance in between, the delta is the location of scanner2
            const abs = rotated.map(x => [x[0] + delta[0], x[1] + delta[1], x[2] + delta[2]]);
            return { position: delta, beacons: abs };
          }
        }
      }
    }
    return null;
  }
  
  function solve(input) {
    const visited = [];
    const scannersArray = input
    const solution = [{ position: [0, 0, 0], beacons: scannersArray.shift() }];
    while (scannersArray.length > 0) {
        //1 by 1 untill were out of them
      for (const scanner1 of solution) {
          //matching for each scanner that we already know the position of (compared to scanner 0)
        for (const scanner2 of scannersArray) {
          if (visited.find(x => x.scanner1 === scanner1 && x.scanner2 === scanner2)) continue; //skip vidited
          const result = match(scanner1.beacons, scanner2);
          if (result) {
            scannersArray.splice(scannersArray.indexOf(scanner2), 1);
            solution.push(result);
          } else {
            visited.push({ scanner1, scanner2 });
          }
        }
      }
    }
    return solution;
  }
  

  
