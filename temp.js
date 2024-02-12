const fs=require('fs');

const folderPath='./audio';


let file=fs.readdirSync(folderPath);

console.log(file);