const Cryptogram = artifacts.require('Cryptogram')

module.exports = function(deployer) {
    deployer.deploy(Cryptogram)
} as Truffle.Migration

// NOTE: https://stackoverflow.com/questions/40900791/cannot-redeclare-block-scoped-variable-in-unrelated-files
export {}
