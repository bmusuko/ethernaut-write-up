// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import Web3 from "web3";

async function main() {
  // get contract
  const VAULT_ADDRESS = "0xd6Cf3d1b4aC4bb727D04b1754E8994Df2d9551b5"
  const vault = await ethers.getContractAt("Vault", VAULT_ADDRESS)

  const web3 = new Web3(process.env.ALCHEMY_API_KEY_URL as string)

  // get password
  const password = await web3.eth.getStorageAt(VAULT_ADDRESS, 1)
  const unlockTx = await vault.unlock(password);
  unlockTx.wait(1);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
