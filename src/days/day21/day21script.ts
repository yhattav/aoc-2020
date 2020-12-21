import {exampleArray, inputArray} from './day21Input'
import {getIntersection} from '../../utils/utils'
export async function script1(useExample: boolean) {
    const usedInput = useExample ? exampleArray : inputArray;
    let _res 
    _res = run(usedInput,false);
    return _res;
}
export async function script2(useExample: boolean) {
    const usedInput = useExample ? exampleArray : inputArray;
    let _res 
    _res = run(usedInput,true);
    return _res;
}


function getMappedAllergens(inputArray) {
    let totalIngrediantsList = [];
    let allergensMap = new Map();
    const allergensRegex = /\(contains\ ([\D]+)\)/
    const regex = /,/gm
    inputArray.forEach(line=>{
        let allergens = line.match(allergensRegex)
        allergens = allergens[1].replace(regex,'').split(' ')
        
        let food = line.slice(0,line.indexOf(' ('));

        let ingrediants = food.split(' ');
        totalIngrediantsList = totalIngrediantsList.concat(ingrediants)
        allergens.forEach(allergen=>{
            if(!allergensMap.has(allergen)){
                allergensMap.set(allergen,[])
            }
            allergensMap.get(allergen).push(ingrediants)
        })
    })
    return {allergensMap,totalIngrediantsList}
}

function run(inputArray,shouldProduceList) {
    let {allergensMap,totalIngrediantsList} = getMappedAllergens(inputArray)
    let allergenPosMap = getAllergenPosMap(allergensMap);
    let allergensList = []
    let should = true;
    do {
        const {newAllergensPos, worked} = matchAndRemoveSingles(allergenPosMap,allergensMap,allergensList);
        should = !!worked;
        allergenPosMap = newAllergensPos;
    } while (should && allergenPosMap.size > 0);

    allergensList.forEach(val=>{
        totalIngrediantsList = totalIngrediantsList.filter(e => e !== val)
    })
    if(shouldProduceList) {
        console.warn(allergensMap);
        return produceCanonicalList(allergensMap,allergensList)
    } else {
        return totalIngrediantsList.length;
    }
}

function getAllergenPosMap(allergensMap) {
    let allergenPos = new Map();
    allergensMap.forEach((value,key)=>{
        let intersection
        if(value.length> 1) {
            intersection = findIntersection(value)
        } else {
            intersection = value[0];
        }
        allergenPos.set(key,intersection)
    });
    return allergenPos;
}

function findIntersection(array) {
    if (array.length === 2) {
        let res = getIntersection(array[0],array[1]);
        return res;
    } else {
        let first = array.shift()
        return getIntersection(first,findIntersection(array))
    }
}


function matchAndRemoveSingles(allergenPosMap,allergensMap,cache) {
    let found = []
    allergenPosMap.forEach((value,key)=>{

        if(value.length === 1) {
            cache.push(value[0]);
            found.push(value[0]);
            allergensMap.set(key,value[0]);
        } 
    })
    let newPosMap = new Map();
    allergenPosMap.forEach((value,key)=>{
        let filteredArray = value.slice(0);
        found.forEach(val=>{
            filteredArray = filteredArray.filter(e => e !== val)
        })
        if(filteredArray.length > 0){
            newPosMap.set(key,filteredArray);
        };
    })
    return {
        newAllergensPos: newPosMap,
        worked: found.length !== 0,
    }
}

function produceCanonicalList(allergensMap,allergensList) {
    allergensList.sort((a, b) => (getKey(allergensMap,a) < getKey(allergensMap,b) ? -1 : 1))
    return allergensList.join(',');
}

function getKey(map,value) {
    return [...map].find(([key, val]) => val == value)[0]
  }