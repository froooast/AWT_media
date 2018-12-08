const MediaFactory = artifacts.require("MediaFactory");

module.exports = function(deployer) {
  deployer.deploy(MediaFactory);
};

module.exports = async deployer => {
  await deployer.deploy(MediaFactory);

  //set Media for dev
  const media = await MediaFactory.deployed();
  await media.createMedia("/puppy-preview", "Claras Welpenwunderland");
  await media.createMedia("/pu123w", "C123rland");
  await media.createMedia("/pu123423423423w", "C123r234234land");
  await media.createMedia("/234234234pu123w", "C123r234234234234234land");

};
