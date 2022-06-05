// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { parseEther } from "ethers/lib/utils";
import { ethers } from "hardhat";

async function main() {
  const provider = new ethers.providers.AlchemyProvider(
    "rinkeby",
    process.env.ALCHEMY_API_KEY as string
  );

  const signer = new ethers.Wallet(process.env.RINKEBY_PRIVATE_KEY as string, provider);


  // get fallback contract
  const fallback = await ethers.getContractAt("Fallback", "0x9683B837C993DdC55f1b3fEe23aeEC4b3f596707");

  // contribute
  const contributeTx = await fallback.connect(signer).contribute({
    value: parseEther("0.0001")
  })
  contributeTx.wait(4);
  console.log("CONTRIBUTE FINISHED")

  // trigger receive()
  const receiveTx = await signer.sendTransaction({
    to: fallback.address,
    value: parseEther("0.0001")
  });
  receiveTx.wait(4);
  console.log("receive() FINISHED")

  // withdraw
  const withdrawTx = await fallback.connect(signer).withdraw();
  withdrawTx.wait(4);
  console.log("withdraw FINISHED")

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
