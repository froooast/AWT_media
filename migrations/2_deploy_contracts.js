const Media = artifacts.require("Media");

module.exports = function(deployer) {
  deployer.deploy(Media);
};

module.exports = async deployer => {
  await deployer.deploy(Media);

  //set Media for dev
  const media = await Media.deployed();
  await media.addPeriod(
    "PT0H0M12.500S",
    "https://s3-eu-west-1.amazonaws.com/blockchain-puppies/test1/"
  );
};
