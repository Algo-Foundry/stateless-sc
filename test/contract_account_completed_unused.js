const { executeTransaction } = require("@algo-builder/algob");
const { types } = require("@algo-builder/web");
const algosdk = require("algosdk");

async function printAccountInfo(deployer, address) {
    const account = await deployer.algodClient.accountInformation(address).do();
    console.log({
        address: account.address,
        amount: account.amount,
        assets: account.assets,
    });

    return account;
}

async function run(runtimeEnv, deployer) {
    const master = deployer.accountsByName.get("master");
    const receiver = algosdk.generateAccount();

    // fund the stateless smart contract with 10 Algos so it becomes a contract account
    await deployer.fundLsig(
        "stateless_contract.py",
        { funder: master, fundingMicroAlgo: 1e7 },
        { fee: 1000 },
        { RECEVIER: receiver.addr }
    );
    const contractAccount = await deployer.loadLogic("stateless_contract.py", { RECEVIER: receiver.addr });

    // send Algos using contract account
    await executeTransaction(deployer, {
        type: types.TransactionType.TransferAlgo,
        sign: types.SignType.LogicSignature,
        lsig: contractAccount,
        fromAccountAddr: contractAccount.address(),
        toAccountAddr: receiver.addr,
        amountMicroAlgos: 1e6, // send 1 Algo
        payFlags: { totalFee: 1000 },
    });

    // print account info
    console.log("contract account");
    await printAccountInfo(deployer, contractAccount.address());
    console.log("receiver account");
    await printAccountInfo(deployer, receiver.addr);
}

module.exports = { default: run };
