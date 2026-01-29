const fs = require('fs');
const path = require('path');

const tokenSrc = path.join('build', 'contracts', 'ELOToken.json');
const presaleSrc = path.join('build', 'contracts', 'ELOPresale.json');
const tokenDest = path.join('src', 'contracts', 'contractInfo.json');
const presaleDest = path.join('src', 'contracts', 'presale.json');

const copyAbi = (src, dest, label) => {
  if (!fs.existsSync(src)) {
    console.error(`❌ Missing artifact: ${src}`);
    return;
  }
  fs.copyFileSync(src, dest);
  console.log(`✅ ${label} ABI copied to ${dest}`);
};

copyAbi(tokenSrc, tokenDest, 'ELOToken');
copyAbi(presaleSrc, presaleDest, 'ELOPresale');
