const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const HDWalletProvider = require('@truffle/hdwallet-provider');

if (!process.env.PRIVATE_KEY) {
  throw new Error('Missing PRIVATE_KEY in .env');
}

module.exports = {
  contracts_directory: './contracts',
  migrations_directory: './Truffle/migrations',
  networks: {
    develop: {
      host: '127.0.0.1',
      port: 7545,
      chainId: 1337,
      network_id: 1337,
      deploymentPollingInterval: 10,
    },
    sepolia: {
      provider: () => new HDWalletProvider({
        privateKeys: [process.env.PRIVATE_KEY],
        providerOrUrl: `https://eth-sepolia.g.alchemy.com/v2/${process.env.VITE_ALCHEMY_API_KEY}`,
      }),
      network_id: 11155111,
      gas: 5500000,
      gasPrice: 5000000000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
  },
  compilers: {
    solc: {
      version: '0.8.9',
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
      },
    },
  },
};
