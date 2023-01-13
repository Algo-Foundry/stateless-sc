const { types } = require("@algo-builder/web");
const algob = require("@algo-builder/algob");
const { prepareParameters } = require("./common");

async function run(runtimeEnv, deployer) {
    // get required info
    const { acc1, acc2, scTemplateParams, secret } = prepareParameters(deployer);

    // replace timeout value with the one saved in checkpoint
    scTemplateParams.timeout = deployer.getCheckpointKV("timeout");

    // write your code here
}

module.exports = { default: run };
