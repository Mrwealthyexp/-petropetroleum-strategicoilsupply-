// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PetroPulseAccess is ERC1155, Ownable {
    uint256 public constant BASIC = 1;
    uint256 public constant PREMIUM = 2;
    uint256 public constant ENTERPRISE = 3;

    mapping(uint256 => uint256) public mintPrice;
    mapping(uint256 => uint256) public maxSupply;
    mapping(uint256 => uint256) public currentSupply;

    constructor() ERC1155("https://api.petropulse.io/metadata/{id}.json") Ownable(msg.sender) {
        mintPrice[BASIC] = 0.05 ether;
        mintPrice[PREMIUM] = 0.2 ether;
        mintPrice[ENTERPRISE] = 1.0 ether;
        maxSupply[BASIC] = 10000;
        maxSupply[PREMIUM] = 1000;
        maxSupply[ENTERPRISE] = 100;
    }

    function mint(uint256 tier, uint256 amount) external payable {
        require(tier >= BASIC && tier <= ENTERPRISE, "Invalid tier");
        require(msg.value >= mintPrice[tier] * amount, "Insufficient payment");
        require(currentSupply[tier] + amount <= maxSupply[tier], "Sold out");
        _mint(msg.sender, tier, amount, "");
        currentSupply[tier] += amount;
    }

    function checkAccess(address user, uint256 minTier) external view returns (bool) {
        if (balanceOf(user, ENTERPRISE) > 0) return true;
        if (minTier <= PREMIUM && balanceOf(user, PREMIUM) > 0) return true;
        if (minTier <= BASIC && balanceOf(user, BASIC) > 0) return true;
        return false;
    }

    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}