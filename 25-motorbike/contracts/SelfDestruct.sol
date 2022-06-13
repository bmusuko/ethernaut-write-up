// SPDX-License-Identifier: MIT

pragma solidity <0.7.0;

contract SelfDestruct {
    address payable to = 0x8b682e8485A877F614ADd886339BFF8185837e13;

    // clean up after ourselves
    function destroy() public {
        selfdestruct(to);
    }
}
