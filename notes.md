1. yarn init
2. yarn add --dev hardhat
3. add .prettierrc & .prettierignore //prittierrc 自定义格式
4. yarn hardhat // create a hardhat project
5. yarn add prettier-plugin-solidity prettier --dev // add prettier plugins
6. yarn add --dev @openzeppelin/contracts // add openzeppelin contract
7. yarn add --dev hardhat @nomiclabs/hardhat-ethers@npm:hardhat-deploy-ethers ethers

--- 
contracts: ./contracts/ :
>add StandartImpl.sol as Implementation  // logic contract

>add ProxyAdmin.sol as ProxyAdmin  // manager of proxy

>[no need] add StandartProxy.sol as Proxy   // proxy contract, just delegate calls to impl 
    !! maybe TransparentUpgradeableProxy ???

dotenv:
>yarn add --dev dotenv
>add .env

### deploy:
```
yarn add --dev hardhat-deploy // add hardhat-deploy 
mkdir deploy
add 00-deploy-proxyAdmin.js
add 01-deploy-contract.js

hardhat.config.js:

add Accounts configs:
    namedAccounts: {
        deployer: {
            default: 0,
        }
    },

add network configs:
    networks: {
        hardhat: {},
        localhost: {
            url: "http://localhost:8545",
        },
        bnbTestNet: {
            url: BNB_TESTNET_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 97,
        },
    },

do deplpy to hardhat:

ProxyAdmin deployed to: 0x84D9e2bC5eC530B5294522Ea48c7e3695d236B37
Proxy deployed to: 0x2B51a548eFF1A67097AEF83936AE8952d0D211C6
Implementation deployed to: 0x44f0c3e9B32B076A7F045a8B57b44e54f8D0CCf6


verfiy:
ProxyAdmin: 
    yarn hardhat verify --network bnbTestNet 0x84D9e2bC5eC530B5294522Ea48c7e3695d236B37
Proxy:
    yarn hardhat verify --network bnbTestNet --constructor-args arguments.js 0x2B51a548eFF1A67097AEF83936AE8952d0D211C6
StandardImpl:
    yarn hardhat verify --network bnbTestNet 0x44f0c3e9B32B076A7F045a8B57b44e54f8D0CCf6

upgrade:
    copy StandardImplV2.sol and modify it
    modify 01-deploy-contract.js to deploy v2
    yarn hardhat deploy --network bnbTestNet --tags StandardImplV2

    v2 prxoxy: 0x19Bc6C317e8c2EAbDa7fb38a53326e1e0aCEEfa0
    v2 impl:  0x63A1B29c957820aEF0d5b5aF1B986A95f18FBFF7

    verify:
        yarn hardhat verify --network bnbTestNet 0x63A1B29c957820aEF0d5b5aF1B986A95f18FBFF7


```
others:

yarn add prettier-plugin-solidity prettier

yarn hardhat compile deploy.js
