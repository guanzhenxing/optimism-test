require('dotenv').config()
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");
require('@openzeppelin/hardhat-upgrades');
require('@eth-optimism/plugins/hardhat/compiler');
require('@eth-optimism/plugins/hardhat/ethers');

module.exports = {
    solidity: {
        version: '0.6.12',
        settings: {
            optimizer: {
                enabled: true,
                runs: 200,
            },
        },
    },
    ovm: {
        solcVersion: '0.6.12'
    },
    paths: {
        sources: "./contracts",
        tests: "./test",
        cache: "./cache",
        artifacts: "./artifacts"
    },
    networks: {
        local: {
            url: "http://192.168.2.61:8545",
            accounts: [process.env.PRIVATE_KEY],
            id: 420,
            gas: 9500000
        },
        goerli: {
            url: "https://goerli.optimism.io",
            accounts: [process.env.PRIVATE_KEY],
            id: 420
        },
        kovan: {
            url: "https://kovan.optimism.io",
            accounts: [process.env.PRIVATE_KEY],
            id: 69
        },
        mainnet: {
            url: "https://mainnet.optimism.io",
            accounts: [process.env.PRIVATE_KEY],
            id: 10
        }
    }
};
