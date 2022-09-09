// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.12;
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "erc721a-upgradeable/contracts/ERC721AUpgradeable.sol";

/**
 @title Coffee NFT
 @author Jeffrey Lin
 */
contract CoffeeNFT is
    Initializable,
    UUPSUpgradeable,
    ERC721AUpgradeable,
    OwnableUpgradeable
{
    address public coffeeChatAddress;

    string public baseTokenURI;

    uint16 public constant MAX_SUPPLY = 10000;

    function initialize(address _coffeeChatAddress) public initializer {
        __ERC721A_init("CoffeeNFT", "CNFT");
        __Ownable_init();
        __UUPSUpgradeable_init();
        coffeeChatAddress = _coffeeChatAddress;
    }

    function mint(address user1, address user2) external onlyCoffeeChat {
        require(totalSupply() + 2 <= MAX_SUPPLY);
        _mint(user1, 1);
        _mint(user2, 1);
    }

    function setBaseURI(string memory baseURI) external onlyOwner {
        baseTokenURI = baseURI;
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
