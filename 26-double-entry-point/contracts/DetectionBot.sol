// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./DoubleEntryPoint.sol";

contract DetectionBot is IDetectionBot {
    address private vaultAddress;

    constructor(address _vaultAddress) public {
        vaultAddress = _vaultAddress;
    }

    function handleTransaction(address user, bytes calldata msgData)
        external
        override
    {
        address to;
        uint256 value;
        address origSender;
        // decode msgData params inspired by https://github.com/maAPPsDEV/double-entry-point-attack/blob/main/contracts/DetectionBot.sol
        assembly {
            to := calldataload(0x68)
            value := calldataload(0x88)
            origSender := calldataload(0xa8)
        }
        if (origSender == vaultAddress) {
            Forta(msg.sender).raiseAlert(user);
        }
    }
}
