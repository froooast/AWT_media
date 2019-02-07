var Migrations = artifacts.require("Migrations");

module.exports = async function(deployer) {
  console.log("trying to deploy migrations")
  await deployer.deploy(Migrations);
  console.log("success!")
};
