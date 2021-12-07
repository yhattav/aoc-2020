function countUnique(iterable) {
    return new Set(iterable).size;
}

let sumArrayOfNumbers = (array: number[]) => {
    let reducer = (accumulator, currentValue) => accumulator + currentValue;

    return array.reduce(reducer);
}


let getTwoElementsToMatchSum = (array, sum) => { //returns array pairs whos sum equals given sum
    let hashMap = {},
    results = []
    for (let i = 0; i < array.length; i++){
        if (hashMap[array[i]]){
            results.push([hashMap[array[i]], array[i]])
        }else{
            hashMap[sum - array[i]] = array[i];
        }
    }
    return results;
}

    function getIntersection(array1,array2) {
        return array1.filter(element => array2.includes(element));
    }
    function getSubsetsEqualsSum(array, sum) { //returns array of subsets whos sum equals the defined sum
        function iter(temp, delta, index) {
            if (!delta) result.push(temp);
            if (index >= array.length) return;
            iter(temp.concat(array[index]), delta - array[index], index + 1);
            if (!temp.length) iter(temp, delta, index + 1);
        }
    
        var result = [];
        iter([], sum, 0);
        return result;
    }

function createMatrix(yLength:number, xLength:number, fillWith: number | string = ' ') {
    let row = new Array(xLength);
    row.fill(fillWith);
    let newArray = new Array(yLength).fill([]);
    newArray = newArray.map(element=>
        row.slice(0)
    );
    return newArray;
}

function getMapKeyByValue(map,value) {
    return [...map].find(([key, val]) => val == value)[0]
  }
  function binStringToDecimal(binaryString: string) {
      return parseInt(binaryString, 2)
  }

  function transposeMatrix(array, arrayLength){
    var newArray = [];
    for(var i = 0; i < array.length; i++){
        newArray.push([]);
    };

    for(var i = 0; i < array.length; i++){
        for(var j = 0; j < arrayLength; j++){
            newArray[j].push(array[i][j]);
        };
    };

    return newArray;
}
const getAngle = (p1,p2) =>{
    return Math.atan2(p2[0] - p1[0], p2[1] - p1[1]) * 180 / Math.PI;
}
const calcMean = (numbers) => numbers.reduce((acc, val) => acc + val, 0) / numbers.length;

const calcMedian = arr => {
    const mid = Math.floor(arr.length / 2),
      nums = [...arr].sort((a, b) => a - b);
    return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
  };

// function calcMode(numbers) {

//     var modes = [], count = [], i, number, maxIndex = 0;

//     for (i = 0; i < numbers.length; i += 1) {
//         number = numbers[i];
//         count[number] = (count[number] || 0) + 1;
//         if (count[number] > maxIndex) {
//             maxIndex = count[number];
//         }
//     }

//     for (i in count)
//         if (count.hasOwnProperty(i)) {
//             if (count[i] === maxIndex) {
//                 modes.push(Number(i));
//             }
//         }

//     return modes;
// }

// function range(numbers) {
//     numbers.sort();
//     return [numbers[0], numbers[numbers.length - 1]];
// }

//copy($0.getInnerHTML().split("\n").slice(0,-1))
export {
    //array
    getAngle,
    transposeMatrix,
    countUnique,
    getTwoElementsToMatchSum,
    getSubsetsEqualsSum,
    getIntersection,
    binStringToDecimal,
    //matrix
    createMatrix,
    //map
    sumArrayOfNumbers,
    getMapKeyByValue,

    calcMean,
    calcMedian,
    // calcMode,
    // range,
};



