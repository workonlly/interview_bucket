const ELOToken = artifacts.require('ELOToken');

module.exports = function (deployer) {
  deployer.deploy(ELOToken);
};