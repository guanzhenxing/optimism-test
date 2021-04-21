let {deploy} = require('./utils');
const {network, ethers, l2ethers} = require("hardhat");

const {url, id} = network.config;
const provider = new ethers.providers.JsonRpcProvider(url, id);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const BlockNumberTest = require("../artifacts/contracts/BlockNumberTest.sol/BlockNumberTest-ovm.json");
const BlockNumberTest1 = require("../artifacts/contracts/BlockNumberTest1.sol/BlockNumberTest-ovm.json");

async function run() {
    await runBlockNumberTest(); //Will work
    await runBlockNumberTest1(); // Will not work
}

async function runBlockNumberTest() {
    const factory = await l2ethers.getContractFactory(BlockNumberTest.abi, BlockNumberTest.bytecode, wallet);
    const contract = await deploy(factory, []);

    console.log("getBlockNumber: ", await contract.getBlockNumber());  // Will return L2 blockNumber

    console.log("initialize: ", (await contract.initialize()).hash);

    console.log("getUserState 1: ", await contract.getUserState());

    console.log("updateUserState: ", (await contract.updateUserState()).hash);

    console.log("getUserState 2: ", await contract.getUserState());

    console.log("compareAndUpdateUserState: ", (await contract.compareAndUpdateUserState()).hash);

    console.log("getUserState 3: ", await contract.getUserState());
}

async function runBlockNumberTest1() {
    const factory = await l2ethers.getContractFactory(BlockNumberTest1.abi, BlockNumberTest1.bytecode, wallet);
    const contract = await deploy(factory, []);

    console.log("getBlockNumber: ", await contract.getBlockNumber());  // Will return L2 blockNumber

    console.log("initialize: ", (await contract.initialize()).hash);

    console.log("getUserState 1: ", await contract.getUserState());

    console.log("updateUserState: ", (await contract.updateUserState()).hash);

    console.log("getUserState 2: ", await contract.getUserState());

    console.log("compareAndUpdateUserState: ", (await contract.compareAndUpdateUserState()).hash);

    console.log("getUserState 3: ", await contract.getUserState());
}

run()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });