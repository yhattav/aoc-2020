function countUnique(iterable) {
    return new Set(iterable).size;
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

export {
    //array
    countUnique,
    getTwoElementsToMatchSum,
    getSubsetsEqualsSum,
    getIntersection,
    //matrix
    createMatrix,
    //map
    getMapKeyByValue,
};