require('colors');
const {assert} = require("chai");
const fs = require("fs");
const deployed_file = __dirname + '/deployed'
const config_file = __dirname + '/config.json'

require('@openzeppelin/hardhat-upgrades');
const {upgrades} = require("hardhat");

async function reason(hash, provider) {
    console.log("tx hash: ".blue, hash.green);

    let tx = await provider.getTransaction(hash);
    if (!tx) throw Error("tx not found");

    let code = await provider.call(tx, tx.blockNumber);
    console.log(code);
    return _hex_to_ascii(code.substr(138));
}

function saveDeployedContractSync(contracts) {

    let data = {};

    let exists = fs.existsSync(deployed_file);
    if (exists) {
        try {
            data = fs.readFileSync(deployed_file, 'utf-8');
        } catch (err) {
            console.error(err)
        }
        data = JSON.parse(data)
    }

    try {
        Object.assign(data, contracts)
        fs.writeFileSync(deployed_file, JSON.stringify(data), 'utf-8')
    } catch (err) {
        console.error(err)
    }

}

function logTx(action, tx) {
    console.log('Send transaction for ' + action + ' success! Hash is '.blue, tx.hash.green)
}

function getConfig() {
    try {
        let data = fs.readFileSync(config_file, 'utf-8');
        return Object.assign({}, JSON.parse(data), _get_deployed_contract_address());
    } catch (e) {
        return {};
    }
}

function _get_deployed_contract_address() {
    try {
        let data = fs.readFileSync(deployed_file, 'utf-8');
        return JSON.parse(data);
    } catch (e) {
        return {};
    }
}

function _hex_to_ascii(str1) {
    let hex = str1.toString();
    let str = "";
    for (let n = 0; n < hex.length; n += 2) {
        str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return str;
}

const deploy = async (factory, payload) => {

    console.log("Deploying with: ".blue, payload);
    const contract = await factory.deploy(...payload);
    return await _finish_and_check_deploy(
        contract,
        factory.provider || factory.signer.provider
    );

};

const deployProxy = async (factory, args) => {
    console.log("\nDeploying with: ".blue, args);
    const contract = await upgrades.deployProxy(factory, args);
    return await _finish_and_check_deploy(
        contract,
        factory.provider || factory.signer.provider
    );
}

const _finish_and_check_deploy = async (contract, provider) => {

    const txHash = contract.deployTransaction.hash;
    console.log("Deployed in transaction: ".blue, txHash.green);

    await contract.deployTransaction.wait();
    console.log("Contract address: ".blue, contract.address.green);

    const txReceipt = await provider.getTransactionReceipt(txHash);
    // console.log("Receipt: ", txReceipt);

    // Check if code is stored
    const code = await provider.getCode(contract.address);
    // console.log("Code: ", code);

    assert(code.length > 2, "Contract NOT deployed (no code)".red);

    console.log("--------\n");

    return contract;
};

module.exports = {
    saveDeployedContractSync,
    getConfig,
    logTx,
    reason,
    deploy,
    deployProxy
};