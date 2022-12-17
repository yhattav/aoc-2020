
    import {exampleArray, inputArray} from './day11input'
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

export const run2 = (input) => {
    const monkeys = parseInput(input);
    /*for 20 turns */
    for(let i = 0; i <  1000; i++) {
        monkeys.forEach((monkey,index) => {
            console.log(monkeys)

            console.log('monkey',index)
            /* while monkey still has items */
            while(monkey.startingItems.length > 0) {
                /* inspect item */
                let item = monkey.startingItems.shift();
                monkey.timesInspected++;
                /* inspect item */
                console.log('item',item)
                /* inspect item */
                item = monkey.operation(item);
                /* log item after inspection */
                // item = Math.floor(item/3)
                console.log('item after inspection',item)

                console.log('monkey',index)

                /*increase times inspected */
                // item = Math.floor(item /3)
                console.log('item after division',item)

                /* if test is true, throw to monkey in index throwToTrue, otherwise throw to throwToFalse*/
                if(monkey.test(item)) {
                    monkeys[monkey.throwToTrue].startingItems.push(item);
                    /*log was true and threw item to monkey */
                    console.log('true')
                } else {
                    monkeys[monkey.throwToFalse].startingItems.push(item);
                    console.log('false')
                }
            }
        })
    }
    
    /*log the number of inspected items of the monkeys*/

    


    console.log(monkeys)
    /* multiply the items inspected of the two highest items inspected monkeys */
    return monkeys.slice().sort((a,b) => b.timesInspected - a.timesInspected).slice(0,2).reduce((acc,curr) => acc * curr.timesInspected,1);
}
export const run = (input) => {
    const monkeys = parseInput(input);
    /*for 20 turns */
    for(let i = 0; i <  20; i++) {
        monkeys.forEach((monkey,index) => {
            console.log(monkeys)

            console.log('monkey',index)
            /* while monkey still has items */
            while(monkey.startingItems.length > 0) {
                /* inspect item */
                let item = monkey.startingItems.shift();
                /* inspect item */
                console.log('item',item)
                /* inspect item */
                item = monkey.operation(item);
                /* log item after inspection */
                item = Math.floor(item/3)
                console.log('item after inspection',item)

                console.log('monkey',index)

                /*increase times inspected */
                monkey.timesInspected++;
                // item = Math.floor(item /3)
                console.log('item after division',item)

                /* if test is true, throw to monkey in index throwToTrue, otherwise throw to throwToFalse*/
                if(monkey.test(item)) {
                    monkeys[monkey.throwToTrue].startingItems.push(item);
                    /*log was true and threw item to monkey */
                    console.log('true')
                } else {
                    monkeys[monkey.throwToFalse].startingItems.push(item);
                    console.log('false')
                }
            }
        })
    }
    
    /*log the number of inspected items of the monkeys*/

    


    console.log(monkeys)
    /* multiply the items inspected of the two highest items inspected monkeys */
    return monkeys.slice().sort((a,b) => b.timesInspected - a.timesInspected).slice(0,2).reduce((acc,curr) => acc * curr.timesInspected,1);
}

const parseInput = (input) => {
    let monkeys = [];
    let monkey = {
        startingItems: [],
        operation: (old:any) => 0,
        test: (old:any) => true,
        throwToTrue: 0,
        throwToFalse: 0,
        timesInspected: 0,
    }
    input.forEach((line) => {
        if(line.includes('Starting items')) {
            monkey.startingItems = line.split('Starting items: ')[1].split(',').map((item) => parseInt(item));
        }
        if(line.includes('Operation')) {
            let op = line.split('Operation: ')[1];
            if(op.includes('old * ')) monkey.operation = ((num)=>(old) => old * num)(Number(op.split('old * ')[1]));
            if(op.includes('old + ')) monkey.operation = ((num)=>(old) => old + num)(Number(op.split('old + ')[1]));
            if(op.includes('old * old')) monkey.operation = (old) => old * old;
        }
        if(line.includes('Test')) {
            let num = line.split('divisible by ')[1];
            monkey.test = (old) => old % num === 0;
        }
        if(line.includes('If true: throw to monkey ')) {
            monkey.throwToTrue = Number(line.split('throw to monkey ')[1]);
        }
        if(line.includes('If false: throw to monkey ')) {
            monkey.throwToFalse = Number(line.split('throw to monkey ')[1]);
            monkeys.push(monkey);
            monkey = {
                startingItems: [],
                operation: (old:any) => 0,
                test: (old:any) => true,
                throwToFalse: 0,
                throwToTrue: 0,
                timesInspected: 0,
            }
        }
    })
    /* remove monkeys with no starting items */
    monkeys = monkeys.filter((monkey) => monkey.startingItems.length > 0);

    return monkeys;
}

