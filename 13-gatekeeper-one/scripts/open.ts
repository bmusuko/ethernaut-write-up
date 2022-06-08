// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  // deploy open gate one
  const OpenGateOne = await ethers.getContractFactory("OpenGateOne");
  const openGateOne = await OpenGateOne.deploy("0x9cF190A66Cc572542e0DbB697feAC153513c74EC");

  await openGateOne.deployed();

  console.log("Open Gate One deployed to:", openGateOne.address);

  // contruct bytekey
  const provider = new ethers.providers.AlchemyProvider(
    "rinkeby",
    process.env.ALCHEMY_API_KEY as string
  );

  const signer = new ethers.Wallet(process.env.RINKEBY_PRIVATE_KEY as string, provider);

  const lastFourDigit = signer.address.slice(-4)
  const gateKey = "0x" + "1000" + lastFourDigit + "0000" + lastFourDigit
  console.log(gateKey)

  const openTx = await openGateOne.open(gateKey, {
    gasLimit: 3000000
  })
  openTx.wait(2)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
