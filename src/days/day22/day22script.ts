import {exampleArray, inputArray} from './day22Input'
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

function run(inputArray) {
    let player1Deck = inputArray[0].slice(0);
    let player2Deck = inputArray[1].slice(0);
    let should = true;
    do {
            playTurn(player1Deck, player2Deck)
    } while (should && player1Deck.length !== 0 && player2Deck.length !== 0);

    let winningDeck = player1Deck.length === 0 ? player2Deck : player1Deck;
    return calcScore(winningDeck);
}

function playTurn(player1Deck,player2Deck) {
    let draw1 = player1Deck.shift()
    let draw2 = player2Deck.shift()

    if (draw1 > draw2) {
        player1Deck.push(draw1);
        player1Deck.push(draw2);
        
    } else {
        player2Deck.push(draw2);
        player2Deck.push(draw1);

    }

}

function calcScore(winningDeck) {
let deck = winningDeck.slice(0);
    deck = deck.reverse();
    let score = 0;
    for (let i = 1; i <= deck.length; i++) {
        score = score+i*deck[i-1];
    }
    return score;
}


function run2(inputArray) {
    let player1Deck = inputArray[0].slice(0);
    let player2Deck = inputArray[1].slice(0);
    let {winner, deck} = recursiveGame(player1Deck, player2Deck)


    return calcScore(deck);
}


function recursiveGame(deck1,deck2) {
    let player1Deck = deck1.slice(0);
    let player2Deck = deck2.slice(0);
    let memory = [];
    do {
        let {are,deck1Id,deck2Id} = decksAreInMemory(player1Deck,player2Deck,memory);
        if (are) {
            return {winner: 'player1', deck:player1Deck,}; //player 1 wins by loop;
        } else {
            //place in memory
            memory.push([deck1Id,deck2Id]);
        }
        playTurn2(player1Deck, player2Deck);

    } while (player1Deck.length !== 0 && player2Deck.length !== 0)

    if (player1Deck.length === 0) { 
        return {winner: 'player2', deck:player2Deck,}
    } else {
        return {winner: 'player1', deck:player1Deck,}
    }
}


function uniqueMemoryId(deck) {
    const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199,211,223,227,229,233,239,241,251,257,263,269,271,277,281]
    let id = 0;
    for (let i = 0; i < deck.length; i++) {
        id = id+primes[i]*deck[i];
    }
    return id;
}


function decksAreInMemory(deck1,deck2,memory) {

    let deck1Id = uniqueMemoryId(deck1)
    let deck2Id = uniqueMemoryId(deck2)
    let are 
    are = memory.some(memorySlot =>{
        return ((memorySlot[0] === deck1Id) && (memorySlot[1] === deck2Id))
    })

    return {are,deck1Id,deck2Id}
} 


function playTurn2(player1Deck,player2Deck) {
    let draw1 = player1Deck.shift()
    let draw2 = player2Deck.shift()
    let left1 = player1Deck.length;
    let left2 = player2Deck.length;
    let winner;
    if(draw1 <= left1 && draw2 <= left2) {
        winner = recursiveGame(player1Deck.slice(0,draw1),player2Deck.slice(0,draw2)).winner;
    } else {
        if(draw1 > draw2) {
            winner = 'player1'
        } else {
            winner = 'player2'
        }
    }
    if (winner === 'player1') {
        player1Deck.push(draw1);
        player1Deck.push(draw2);
        
    } else if (winner === 'player2'){
        player2Deck.push(draw2);
        player2Deck.push(draw1);
    }
}