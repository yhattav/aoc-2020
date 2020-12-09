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

export {countUnique, getTwoElementsToMatchSum, getSubsetsEqualsSum};