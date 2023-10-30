const fs = require('fs');
const path = require('path');

const sourceFolder = 'dist';
const goUp = '../';
const fileName = 'types.d.ts';

const sourcePath = path.join(__dirname, goUp, sourceFolder, fileName);
const destinationPath = path.join(__dirname, goUp, fileName);

fs.rename(sourcePath, destinationPath, (err) => {
   if (err) {
      console.error('Error moving the file:', err);
   } else {
      console.log('File moved successfully!');
   }
});
