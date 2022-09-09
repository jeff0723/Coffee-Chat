// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.12;
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";

contract Coffee is
    Initializable,
    UUPSUpgradeable,
    ERC20Upgradeable,
    OwnableUpgradeable
{
    address public coffeeChatAddress;

    uint256 public constant MAX_SUPPLY = 1e9 ether;

    function initialize(address _coffeeChatAddress) public initializer {
        __ERC20_init("Coffee", "CT");
        __Ownable_init();
        __UUPSUpgradeable_init();
        coffeeChatAddress = _coffeeChatAddress;
        _mint(owner(), (MAX_SUPPLY * 5) / 100);
    }

    function mint(
        address user1,
        address user2,
        uint256 amount
    ) external onlyCoffeeChat {
        require(
            ((totalSupply() + amount * 2) < MAX_SUPPLY),
            "exceed max supply"
        );
        _mint(user1, amount);
        _mint(user2, amount);
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
