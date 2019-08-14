const string = `ABCD EFGH IJKL MNOP
AEIM BFJN CGKO DHLP
AFKP BELO CHIN DGJM
AGLN BHKM CEJP DFIO
AHJO BGIP CFLM DEKN
`
const charCodeToNumber = (charCode) => charCode > 96 ? charCode - 71 : charCode - 65;
const charsFromstring = string => {
  let chars = [];
  string.replace(/(\w)/g, (match, p1) => {
    console.log(p1);
    chars.includes(p1) || chars.push(p1);
    return p1;
  })
  return chars;
}
const doshit = () => {
  const chars = charsFromstring(string);
  console.log(chars);
  const string1 = string.replace(/(\w\w\w\w)/g, (match, p1) => `[${p1}],`);
  const string2 = string1.replace(/(.*),\s*\n/g, (match, p1) => `[${p1}],\n`);
  const string3 = string2.replace(/(\w)/g, (match, p1) => `${chars.indexOf(p1)},`).replace(/,\]/g, ']');
  console.log(string3);
}

doshit();