
    import {exampleArray, inputArray} from './day3input'
    import {findLocations} from '../../../utils/utils'

export async function script1(useExample: boolean) {
    const usedInput = useExample ? exampleArray : inputArray;
    let _res 
    _res = run(usedInput);
    return _res;
}
export async function script2(useExample: boolean) {
    const usedInput = useExample ? exampleArray : inputArray;
    let _res 
    _res = run(usedInput);
    return _res;
}

export const run = (input) => {
    //console.log('input', input)
    let regex = /(\d+)/g
    // find the start and end of every number
    let numbers = findLocations(regex, input)
    // for each number, get all the characters around, also from above and below the number into a string
    //make sure to protect from out of bounds
    numbers = numbers.map(num => {
        let start = num.start 
        let end = num.end
        let line = num.line
        let upString =  line === 0 ? "" : input[line-1].slice(start, end)
        let downString = line === input.length -1 ? "" : input[line+1].slice(start, end)
        // if existing get the character left of the number
        let left = start === 0 ? "" : input[line].slice(start-1, start)
        // if existing get the character right of the number
        let right = end === input[line].length ? "" : input[line].slice(end, end+1)
        // if existing, get he character above left of the number
        let upLeft = start === 0 || line === 0 ? "" : input[line-1].slice(start-1, start)
        // if existing, get he character above right of the number
        let upRight = end === input[line].length || line === 0 ? "" : input[line-1].slice(end, end+1)
        // if existing, get he character below left of the number
        let downLeft = start === 0 || line === input.length -1 ? "" : input[line+1].slice(start-1, start)
        // if existing, get he character below right of the number
        let downRight = end === input[line].length || line === input.length -1 ? "" : input[line+1].slice(end, end+1)

        // put all the characters into a string
        let str = upLeft + upString + upRight + left + right + downLeft + downString + downRight
        return {...num, str}

    })
    //console.log('numbers', numbers)
    // sum the numbers whos str has symbols in it using regex ([^.\d])
    let sum = 0
    numbers.forEach(num => {
        if (num.str.match(/[^.\d]/g)) {
            sum += parseInt(num.number)
        }
    })





    return sum

}

export const run2 = (input) => {
    //console.log('input', input)
    let regex = /(\d+)/g
    // find the start and end of every number
    let numbers = findLocations(regex, input)
    // for each number, get all the characters around, also from above and below the number into a string
    //make sure to protect from out of bounds
    let symbols = findLocations(/[^.\d]/g, input)

    // locations are blocks of 1xn, these are represented by a line, start and end
    //write a function that checks if two locations are next to each other by checking if they have any of the same coordinates around them
    const areNextToEachOther = (loc1, loc2) => {
        
        //if the are not on the same line or in adjecant lines, return false
        if (loc1.line !== loc2.line && loc1.line !== loc2.line -1 && loc1.line !== loc2.line +1) {
            return false
        }
        let indexes1 = []
        let indexes2 = []
        // get all the indexes of the numbers in location one, starting from the start of the number up to the end of the number
        for (let i = loc1.start - 1; i < loc1.end; i++) {
            indexes1.push(i)
        }
        // get all the indexes of the numbers in location two, starting from the start of the number up to the end of the number
        for (let i = loc2.start - 1; i < loc2.end; i++) {
            indexes2.push(i)
        }
        // if any of the indexes of location one are in location two, return true
        if (indexes1.some(index => indexes2.includes(index))) {
            return true
        }
        return false

    }
//63378859
    // using areNextToEachother, map symbols to a list of they neighboring numbers
    symbols = symbols.map(symbol => {
        let neighbors = numbers.filter(num => areNextToEachOther(symbol, num))
        return {...symbol, neighbors}
    })
    //filter out any symbol that doesnt have exactly two neighbors
    symbols = symbols.filter(symbol => symbol.neighbors.length === 2)
    // map the symbols to the multiplication of the number key of their neighbors
    symbols = symbols.map(symbol => {
        let product = symbol.neighbors.reduce((acc, curr) => acc * parseInt(curr.number), 1)
        return {...symbol, product}
    })
    // sum the products
    let sum = 0
    symbols.forEach(symbol => {
        sum += symbol.product
    })
    return sum



}
