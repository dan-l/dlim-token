pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Dlim1Token is ERC20 {
    constructor() ERC20("Dlim1Token", "DLIM1") {
        _mint(msg.sender, 1000);
    }

    function decimals() public view virtual override returns (uint8) {
        return 5;
    }
}