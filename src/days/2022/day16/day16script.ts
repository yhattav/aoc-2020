
    import {exampleArray, inputArray} from './day16input'
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

let max = new Array(30).fill(0);
let winner = [];
let totalValues = 0;
let totalOpenableNodes = 0;
export const run2 = (input) => {
  max = new Array(26).fill(0);
  winner = []

    let nodes = parseInput(input);
    totalValues = nodes.reduce((acc, node) => acc + node.value, 0);
    totalOpenableNodes = nodes.filter(node=>node.value !== 0).length;
    /* get a set of all the possible 30 moves between the nodes */
    const possibleFlows = new Set();
    const possibleStartingNodes = nodes.filter(node => node.name === 'AA');
    for (let i = 0; i < possibleStartingNodes.length; i++) {
        let startNode = possibleStartingNodes[i];
        let openNodes = new Array(26);
        getPossibleFlows2(possibleFlows, nodes, startNode,26, startNode.name, [startNode.name], openNodes, 0);
}
/* return the highest sum in possibleFlows */
console.log(winner, max, possibleFlows.size);
return max[0];
}

export const run = (input) => {
  max = new Array(30).fill(0);
  winner = []

    let nodes = parseInput(input);
    totalValues = nodes.reduce((acc, node) => acc + node.value, 0);
    console.log(totalValues);
    debugger;
    /* get a set of all the possible 30 moves between the nodes */
    const possibleFlows = new Set();
    const possibleStartingNodes = nodes.filter(node => node.name === 'AA');
    for (let i = 0; i < possibleStartingNodes.length; i++) {
        let startNode = possibleStartingNodes[i];
        let openNodes = new Array(30);
        getPossibleFlows(possibleFlows, nodes, startNode,30, startNode.name, [startNode.name], openNodes, 0);
}
/* return the highest sum in possibleFlows */
console.log(winner, max);
return max[0];
}

export const parseInput = (input) => {
    let nodes = [];
    for (let i = 0; i < input.length; i++) {
        let line = input[i];
        let node = parseLine(line);
        nodes.push(node);
    }
    return nodes;
}

export const parseLine = (line) => {
    let node = {name: getName(line), value: getValue(line), tunnlesTo: getTunnlesTo(line)};
    return node;
}

export const getName = (line) => {
    /* example line Valve AA has flow rate=0; tunnels lead to valves DD, II, BB */
    /* get the name of the node after the string 'Valve ' and before  ' has' */
    let name = line.split(' ')[1];
    return name;
}

export const getValue = (line) => {
    /* example line Valve AA has flow rate=0; tunnels lead to valves DD, II, BB */
    /* get the value of the node after the string 'rate=' and before  ';' */
    let value = Number(line.split('rate=')[1].split(';')[0]);
    return value;
}

export const getTunnlesTo = (line) => {
    /* example line Valve AA has flow rate=0; tunnels lead to valves DD, II, BB */
    /* get the value of the node after the string 'to valves ' and before  '' */
    let tunnlesTo = (line.split('to valves ')[1] || line.split('to valve ')[1]).split(', ');
    return tunnlesTo;
}
export const getPossibleFlows2 = (possibleFlows, nodes, startNode, stepsLeft, flowUpToNow, visited, openNodes, currentTotalPressure) => {
  let numberOfNodes = openNodes.filter(node=>!!node).length
  if (stepsLeft === 0 || numberOfNodes === totalOpenableNodes) {
    // console.log(flowUpToNow)
    if(numberOfNodes > 0 && numberOfNodes && totalOpenableNodes > numberOfNodes) {
      possibleFlows.add(openNodes);
      // console.log(possibleFlows.size);
    }
    return;
  }
    // if(max[stepsLeft] - totalValues> currentTotalPressure) {
    //   return;
    // } else {
    //   max[stepsLeft] = currentTotalPressure;
    // }
    let tunnles = startNode.tunnlesTo.filter(nodeName=>!visited.includes(nodeName));
    if(startNode.openingValve) {
      openNodes[stepsLeft] = startNode.name;
      currentTotalPressure += startNode.value*stepsLeft;
      visited = [];
      tunnles = startNode.tunnlesTo;
    } else {
      if(!openNodes.includes(startNode.name) && startNode.value !== 0) {
        tunnles.unshift('&OPEN:'+startNode.name);
      }
    }
    for (let i = 0; i <tunnles.length; i++) {
      let nextNodeName = tunnles[i];
      let nextNode
      if(nextNodeName.includes('OPEN')) {
        nextNode = {...startNode, openingValve: startNode.name};//{name: '&OPEN:'+startNode.name, openingValve: startNode.name, value: startNode.value, tunnlesTo: [startNode.name]};
      } else {
        nextNode = nodes.find(node => node.name === nextNodeName);
      }
        getPossibleFlows2(possibleFlows, nodes, nextNode, stepsLeft - 1, flowUpToNow +','+ nextNodeName, visited.slice(0).concat([nextNodeName]), openNodes.slice(0), currentTotalPressure);
    }
}
}
export const getPossibleFlows = (possibleFlows, nodes, startNode, stepsLeft, flowUpToNow, visited, openNodes, currentTotalPressure) => {
  if (stepsLeft === 0) {
    // console.log(flowUpToNow)
    if(max[0] < currentTotalPressure) {
      max[0] = currentTotalPressure;
      winner = flowUpToNow;
    }
      //possibleFlows.add(openNodes);
      // console.log(possibleFlows.size);
      return;
  }
    if(max[stepsLeft] - totalValues> currentTotalPressure) {
      return;
    } else {
      max[stepsLeft] = currentTotalPressure;
    }
    let tunnles = startNode.tunnlesTo.filter(nodeName=>!visited.includes(nodeName));
    if(startNode.openingValve) {
      openNodes[stepsLeft] = startNode.name;
      currentTotalPressure += startNode.value*stepsLeft;
      visited = [];
      tunnles = startNode.tunnlesTo;
    } else {
      if(!openNodes.includes(startNode.name) && startNode.value !== 0) {
        tunnles.unshift('&OPEN:'+startNode.name);
      }
    }
    for (let i = 0; i <tunnles.length; i++) {
      let nextNodeName = tunnles[i];
      let nextNode
      if(nextNodeName.includes('OPEN')) {
        nextNode = {...startNode, openingValve: startNode.name};//{name: '&OPEN:'+startNode.name, openingValve: startNode.name, value: startNode.value, tunnlesTo: [startNode.name]};
      } else {
        nextNode = nodes.find(node => node.name === nextNodeName);
      }
        getPossibleFlows(possibleFlows, nodes, nextNode, stepsLeft - 1, flowUpToNow +','+ nextNodeName, visited.slice(0).concat([nextNodeName]), openNodes.slice(0), currentTotalPressure);
    }
}

