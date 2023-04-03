require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()
// require("@nomiclabs/hardhat-waffle")
// require("@nomiclabs/hardhat-etherscan")
require("solidity-coverage")
require("hardhat-deploy")
require("@nomiclabs/hardhat-ethers")

/** @type import('hardhat/config').HardhatUserConfig */

const PRIVATE_KEY = process.env.PRIVATE_KEY
const BNB_TESTNET_RPC_URL = process.env.BNB_TESTNET_RPC_URL
const BSCSCAN_API_KEY = process.env.BSCSCAN_API_KEY

module.exports = {
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },

  namedAccounts: {
    deployer: {
      default: 0,
      localhost: 0,
    },
  },

  defaultNetwork: "hardhat",

  networks: {
    hardhat: {},
    localhost: {
      url: "http://localhost:8545",
      charId: 31337,
    },
    bnbTestNet: {
      url: BNB_TESTNET_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 97,
    },
  },
  etherscan: {
    apiKey: {
      bscTestnet: BSCSCAN_API_KEY,
    },
  },
  gasReporter: {
    enabled: false,
    // outputFile: "gas-report.txt",
    noColors: true,
    // currency: "USD",
    // coinmarketcap: CM_API_KEY,
    // token: ''
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
}
