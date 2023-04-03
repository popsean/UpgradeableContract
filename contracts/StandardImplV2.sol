// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/proxy/utils/Initializable.sol";

contract StandardImplV2 is Initializable {
    // we don't use constructor
    // constructor() {}

    uint256 public constant VERSION = 2;
    bool public s_initialized;
    uint256 public s_value;

    // modifier initializer() {
    //     require(!s_initialized, "Only initialize once!");
    //     _;
    //     s_initialized = true;
    // }

    function initialize(uint256 _initValue) public initializer {
        s_value = _initValue;
    }

    function setValue(uint256 _newValue) public {
        s_value = _newValue + 10;
    }
}
