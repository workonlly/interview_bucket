const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const HDWalletProvider = require('@truffle/hdwallet-provider');

if (!process.env.PRIVATE_KEY) {
  throw new Error('Missing PRIVATE_KEY in .env');
}


module.exports = {
  contracts_directory: './contracts',
  migrations_directory: './Truffle/migrations',
  
  // Uncommenting the defaults below
  // provides for an easier quick-start with Ganache.
  // You can also follow this format for other networks;
  // see <http://truffleframework.com/docs/advanced/configuration>
  // for more details on how to specify configuration options!
  //
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
      gasPrice: 20000000000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    }
  },
  compilers: {
    solc: {
      version: "0.8.9",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }
  },
  overrides: {
    "**/token_presale.sol": {
      version: "0.6.12",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }
  }
  //
  // Truffle DB is currently disabled by default; to enable it, change enabled:
  // false to enabled: true. The default storage location can also be
  // overridden by specifying the adapter settings, as shown in the commented code below.
  //
  // NOTE: It is not possible to migrate your contracts to truffle DB and you should
  // make a backup of your artifacts to a safe location before enabling this feature.
  //
  // After you backed up your artifacts you can utilize db by running migrate as follows:
  // $ truffle migrate --reset --compile-all
  //
  // db: {
  //   enabled: true,
  //   host: "127.0.0.1",
  //   adapter: {
  //     name: "sqlite",
  //     settings: {
  //       directory: ".db",
  //     },
  //   },
  // },
};
