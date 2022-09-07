// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.12;

import "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

/**
 @title Coffee Rate
 @author Justa Liang
 */
contract CoffeeNFT is
    Initializable,
    UUPSUpgradeable,
    ERC1155Upgradeable,
    OwnableUpgradeable
{
    address public coffeeChatAddress;

    struct PersonalElo {
        uint128 rateCount;
        uint128 elo;
    }

    mapping(address => PersonalElo) public eloOf;

    function initialize(address _coffeeChatAddress) public initializer {
        __ERC1155_init("");
        __Ownable_init();
        __UUPSUpgradeable_init();
        coffeeChatAddress = _coffeeChatAddress;
    }

    function mint(address user1, address user2) external onlyCoffeeChat {
        _mint(user1, uint160(user2), 1, "");
        _mint(user2, uint160(user1), 1, "");
    }

    function rate(address target, uint8 points) external {
        require(points <= 5, "can't rate over 5");
        _burn(_msgSender(), uint160(target), 1);
        PersonalElo storage _elo = eloOf[target];
        _elo.rateCount += 1;
        _elo.elo += points;
    }

    function _authorizeUpgrade(address newImplementation)
        internal
        override
        onlyOwner
    {}

    modifier onlyCoffeeChat() {
        require(
            _msgSender() == coffeeChatAddress,
            "only called by CoffeeChat contract"
        );
        _;
    }
}
