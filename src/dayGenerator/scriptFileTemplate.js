module.exports = ({
  year,
  day,
}) => {
const code =
    `
    import {exampleArray, inputArray} from './day`+day+`input'
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

}

      `;

  return [
    code,
    '',
  ].join('\n');
  // #endregion
};
