const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();
const contractsDir = path.join(rootDir, 'contracts');
const backupDir = path.join(rootDir, 'contracts_backup');
const tokenFile = 'token.sol';
const presaleFile = 'token_presale.sol';
const tokenPath = path.join(contractsDir, tokenFile);
const presalePath = path.join(contractsDir, presaleFile);
const backupTokenPath = path.join(backupDir, tokenFile);
const backupPresalePath = path.join(backupDir, presaleFile);

const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const moveFile = (from, to) => {
  if (fs.existsSync(from)) {
    fs.renameSync(from, to);
  }
};

const runCmd = (command) => {
  const result = spawnSync(command, {
    shell: true,
    stdio: 'inherit',
    cwd: rootDir,
  });

  if (result.status !== 0) {
    process.exit(result.status);
  }
};

const run = () => {
  console.log('📄 Deploying and updating contracts...');
  ensureDir(backupDir);

  console.log('➡️  Deploying ELOToken (Solidity 0.8.9)...');
  moveFile(presalePath, backupPresalePath);
  runCmd('truffle migrate --config truffle-config-0_8.cjs --reset --compile-all --network sepolia --f 2 --to 2');

  console.log('➡️  Deploying ELOPresale (Solidity 0.6.12)...');
  moveFile(tokenPath, backupTokenPath);
  moveFile(backupPresalePath, presalePath);
  runCmd('truffle migrate --config truffle-config-0_6.cjs --reset --compile-all --network sepolia --f 3 --to 3');

  moveFile(backupTokenPath, tokenPath);
  console.log('✅ Deployments completed. Updating frontend ABIs...');
  runCmd('node Truffle/scripts/contractInfo.cjs');
};

run();
