const MediaFactory = artifacts.require("MediaFactory");

module.exports = function(deployer) {
  deployer.deploy(MediaFactory);
};

module.exports = async deployer => {
  deployer
    .deploy(MediaFactory)
    .then(() => MediaFactory.deployed())
    .then(instance => {
      
      instance.createMedia("period", "asdasd", "asdasdss","asdasdasd", "asdasd", "asdasd")
    });
};
