const { types } = require("@algo-builder/web");
const { prepareParameters } = require("./common");

async function run(runtimeEnv, deployer) {
    // get required info
    const { acc1, scTemplateParams } = prepareParameters(deployer);

    const acc1Before = await deployer.algodClient.accountInformation(acc1.addr).do();

    // what is the current round
    const chainStatus = await deployer.algodClient.status().do();
    console.log("timeout:", deployer.getCheckpointKV('timeout'));
    console.log("current round:", chainStatus['last-round']);

    // replace timeout value with the one saved in checkpoint
    scTemplateParams.timeout = deployer.getCheckpointKV("timeout");

    // load deployed contract account
    const lsig = await deployer.loadLogicByFile("htlc.py", scTemplateParams);

    // prepare transaction
    const txnParams = {
        type: types.TransactionType.TransferAlgo,
        sign: types.SignType.LogicSignature,
        lsig: lsig,
        fromAccountAddr: lsig.address(),
        toAccountAddr: acc1.addr,
        amountMicroAlgos: 1e6, // recover 1 Algo for this example
        payFlags: { totalFee: 1000 },
    }

    // acc1 gets back its funds
    txnParams.toAccountAddr = acc1.addr;
    await deployer.executeTx(txnParams);

    const acc1After = await deployer.algodClient.accountInformation(acc1.addr).do();
    console.log("acc1 balance before:", acc1Before.amount);
    console.log("acc1 balance after:", acc1After.amount);
    console.log("Diff:", acc1After.amount - acc1Before.amount);
}

module.exports = { default: run };
