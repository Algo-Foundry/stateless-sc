const { prepareParameters } = require("./withdraw/common");

async function run(runtimeEnv, deployer) {
    // get required info
    const { acc1, scTemplateParams } = prepareParameters(deployer);

    // write your code here 
}

module.exports = { default: run };
