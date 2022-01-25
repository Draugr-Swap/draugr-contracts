// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers, upgrades } from "hardhat";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy

  const DraugrTokenFactory = await ethers.getContractFactory("DraugrToken");
  const DraugrToken = await DraugrTokenFactory.deploy();
  await DraugrToken.deployed();
  console.log("DraugrToken deployed to:", DraugrToken.address);

  const MasterChefFactory = await ethers.getContractFactory("MasterChef");
  const MasterChef = await MasterChefFactory.deploy(DraugrToken.address, "0xe6C2D1D7f6EE9E4eE9F8B865D9b5931C06C9c7d1", "0x44A33a4a822194d3C8402629932dd88B0FF49b09", "1000000000000000000", 0);
  await MasterChef.deployed();
  console.log("MasterChef deployed to:", MasterChef.address);

  const TimelockFactory = await ethers.getContractFactory("Timelock");
  const Timelock = await TimelockFactory.deploy("0xe6C2D1D7f6EE9E4eE9F8B865D9b5931C06C9c7d1", 86400);
  await Timelock.deployed();
  console.log("Timelock deployed to:", Timelock.address);

  const MultiCallFactory = await ethers.getContractFactory("Multicall");
  const MultiCall = await MultiCallFactory.deploy();
  await MultiCall.deployed();
  console.log("MultiCall deployed to:", MultiCall.address);


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
