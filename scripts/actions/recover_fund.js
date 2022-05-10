const { convert, executeTransaction } = require("@algo-builder/algob");
const { types } = require("@algo-builder/web");
const { prepareParameters } = require("./common");

async function run(runtimeEnv, deployer) {
    // get required info
    const { acc1, scTemplateParams } = prepareParameters(deployer);

    // replace timeout value with the one saved in checkpoint
    scTemplateParams.timeout = deployer.getCheckpointKV("timeout");

    // load deployed contract account
    const lsig = await deployer.loadLogic("htlc.py", scTemplateParams);

    // prepare transaction
    const txnParams = {
        type: types.TransactionType.TransferAlgo,
        sign: types.SignType.LogicSignature,
        lsig: lsig,
        fromAccountAddr: lsig.address(),
        toAccountAddr: acc1.addr,
        amountMicroAlgos: 1e6, // send 1 Algo
        payFlags: { totalFee: 1000 },
    }

    // acc1 gets back its funds
    txnParams.toAccountAddr = acc1.addr;
    await executeTransaction(deployer, txnParams);
}

module.exports = { default: run };
