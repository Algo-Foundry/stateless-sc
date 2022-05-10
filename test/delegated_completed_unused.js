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

async function run (runtimeEnv, deployer) {
    const master = deployer.accountsByName.get("master");
    const sender = algosdk.generateAccount();
    const receiver = algosdk.generateAccount();

    // fund sender account
    await executeTransaction(deployer, {
        type: types.TransactionType.TransferAlgo,
        sign: types.SignType.SecretKey,
        fromAccount: master,
        toAccountAddr: sender.addr,
        amountMicroAlgos: 1e7, //10 algos
        payFlags: { totalFee: 1000 },
    });

    // create logic sig for sender
    acc1Delegated = await deployer.mkDelegatedLsig("stateless_contract_completed.py", sender, { RECEVIER: receiver.addr });

    // use the logic signature of the delegated acc1 to sign transaction
    console.log("successful txn");
    await executeTransaction(deployer, {
        type: types.TransactionType.TransferAlgo,
        sign: types.SignType.LogicSignature,
        lsig: acc1Delegated.lsig, //grab the logic signature object
        fromAccountAddr: sender.addr,
        toAccountAddr: receiver.addr,
        amountMicroAlgos: 1e6, //1 algo
        payFlags: { totalFee: 1000 },
    });

    // failure scenario
    console.log("failure txn");
    await executeTransaction(deployer, {
        type: types.TransactionType.TransferAlgo,
        sign: types.SignType.LogicSignature,
        lsig: acc1Delegated.lsig, //grab the logic signature object
        fromAccountAddr: sender.addr,
        toAccountAddr: receiver.addr,
        amountMicroAlgos: 2e6, //2 algo
        payFlags: { totalFee: 1000 },
    });

    // print account info
    console.log("sender account");
    await printAccountInfo(deployer, sender.addr);
    console.log("receiver account");
    await printAccountInfo(deployer, receiver.addr);
}

module.exports = { default: run };