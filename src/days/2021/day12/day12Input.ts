// const example = '';
// const example = '';
// const example = 'fs-end,he-DX,fs-he,start-DX,pj-DX,end-zg,zg-sl,zg-pj,pj-he,RW-he,fs-DX,pj-RW,zg-RW,start-pj,he-WI,zg-he,pj-fs,start-RW';
// const example = 'dc-end,HN-start,start-kj,dc-start,dc-HN,LN-dc,HN-end,kj-sa,kj-HN,kj-dc';
const example = 'start-A,start-b,A-c,A-b,b-d,A-end,b-end';
const input = 'EG-bj,LN-end,bj-LN,yv-start,iw-ch,ch-LN,EG-bn,OF-iw,LN-yv,iw-TQ,iw-start,TQ-ch,EG-end,bj-OF,OF-end,TQ-start,TQ-bj,iw-LN,EG-ch,yv-iw,KW-bj,OF-ch,bj-ch,yv-TQ';
const regex = /start/gm;
const regex2 = /end/gm;
// const regex2 = /bags|bag/gm;
// const regex3 = /^ | $/gm;


const exampleArray = example.replace(regex,'START').replace(regex2,'END').split(',').map(el=>el.split('-'));
console.log(exampleArray);
const inputArray = input.replace(regex,'START').replace(regex2,'END').split(',').map(el=>el.split('-'));


export {exampleArray, inputArray};