export type direction= 'up' | 'down' | 'left' | 'right';

function getPositionAt(pos: [number,number], dir: direction):[number,number] {
const [i,j] = pos;
    switch(dir) {
    case 'up':
    return [i-1,j];
    case 'right':
    return [i,j+1];
    case 'down':
    return [i+1,j];
    case 'left':
    return [i,j-1];
}
}

function protectedGetValueAt(map:[][],pos:[number,number], outsideValue:any = null):any {
    if(isValidPosition(map,pos)) {
        return getValueAt(map,pos);
    } else {
        return outsideValue;
    }
}

function getValueAt(map:[][],pos:[number,number]):any {
    const [i,j] = pos;
    return map[i][j];
}

function isValidPosition(map:[][],pos:[number,number]):boolean {
  const [i,j] = pos;
  const iLength = map.length;
  const jLength = map[0].length;
  return i >=0 && j>=0 && j< jLength && i < iLength;
}

function findPosibilities(map:[][],pos:[number,number],validator:Function, valueOutsideMaze:any = null):[number,number][] {
    let posibilities = [];
    ['up', 'right', 'down', 'left'].forEach((dir:direction)=>{
        const posInDir = getPositionAt(pos,dir);
        if(validator(protectedGetValueAt(map,posInDir,valueOutsideMaze))) posibilities.push(posInDir);
    });
    return posibilities;
}
export {
    getValueAt,
    getPositionAt,
    protectedGetValueAt,
    findPosibilities, // not battle hardened yet
};



// //----------------------------------------------------------------




// function getNeighbor(pos,maze,direction) {
//   try{
//   const [i,j] = getPositionAt(pos,direction);
//   return [i,j]
//   } catch (e) {
//     consle.error('couldnt get neighbor', e)
//   }
// }
