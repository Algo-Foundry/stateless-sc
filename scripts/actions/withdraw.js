const { convert } = require("@algo-builder/algob");
const { types } = require("@algo-builder/web");
const { prepareParameters } = require("./common");

async function run(runtimeEnv, deployer) {
    // get required info
    const { acc2, scTemplateParams, secret } = prepareParameters(deployer);

    const acc2Before = await deployer.algodClient.accountInformation(acc2.addr).do();

    // replace timeout value with the one saved in checkpoint
    scTemplateParams.timeout = deployer.getCheckpointKV("timeout");

    // load deployed contract account
    const lsig = await deployer.loadLogicByFile("htlc.py", scTemplateParams);

    // prepare transaction with wrong secret
    const wrongSecret = "wrong secret random set of words here";
    const txnParams = {
        type: types.TransactionType.TransferAlgo,
        sign: types.SignType.LogicSignature,
        lsig: lsig,
        fromAccountAddr: lsig.address(),
        toAccountAddr: acc2.addr,
        amountMicroAlgos: 1e6, // send 1 Algo
        args: [convert.stringToBytes(wrongSecret)],
        payFlags: { totalFee: 1000 },
    }

    // wrong
    // await deployer.executeTx(txnParams);

    // correct
    txnParams.args = [convert.stringToBytes(secret)];
    await deployer.executeTx(txnParams);

    const acc2After = await deployer.algodClient.accountInformation(acc2.addr).do();
    console.log("acc2 balance before:", acc2Before.amount);
    console.log("acc2 balance after:", acc2After.amount);
    console.log("Diff:", acc2After.amount - acc2Before.amount);
}

module.exports = { default: run };