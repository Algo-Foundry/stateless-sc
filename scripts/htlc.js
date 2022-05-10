const { prepareParameters } = require("./withdraw/common");

async function run(runtimeEnv, deployer) {
    // get required info
    const { acc1, scTemplateParams } = prepareParameters(deployer);

    // for simplicity sake, acc1 can retrieve funds after 10 round
    const algodClient = deployer.algodClient;
    const chainStatus = await algodClient.status().do();
    const timeoutBlockcount = chainStatus['last-round'] + 10;
    scTemplateParams.timeout = timeoutBlockcount;

    // fund the escrow contract with 10 Algos so it becomes a contract account
    await deployer.fundLsig(
        "htlc.py",
        { funder: acc1, fundingMicroAlgo: 1e7 },
        { fee: 1000 },
        scTemplateParams
    );

    // Add checkpoints
    deployer.addCheckpointKV('User Checkpoint', 'Fund escrow account');
    deployer.addCheckpointKV('timeout', timeoutBlockcount);
}

module.exports = { default: run };
