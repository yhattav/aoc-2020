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

function createMatrix(yLength, xLength, fillWith = ' ') {
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

  function transposeArray(array, arrayLength){
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

//copy($0.getInnerHTML().split("\n").slice(0,-1))
export {
    //array
    transposeArray,
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
};