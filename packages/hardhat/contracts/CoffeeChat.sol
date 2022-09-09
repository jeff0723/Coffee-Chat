// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.12;

import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/cryptography/draft-EIP712Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "./CoffeeNFT.sol";
import "./Coffee.sol";

/**
 @title Coffee Chat
 @author Jeffrey Lin, Justa Liang
 */
contract CoffeeChat is
    Initializable,
    UUPSUpgradeable,
    ERC721URIStorageUpgradeable,
    EIP712Upgradeable,
    OwnableUpgradeable
{
    using AddressUpgradeable for address;

    struct ChatInfo {
        address initializer;
        uint32 startTime;
        uint32 endTime;
        uint128 stakeAmount;
        address redeemer;
    }

    struct RedeemVoucher {
        uint256 chatId;
    }

    struct PersonalElo {
        uint128 rateCount;
        uint128 elo;
    }

    event CoffeeChatIntialize(
        uint256 chatId,
        string placeId,
        int128 lantitude,
        int128 longtitude,
        uint32 startTime,
        uint32 endTime,
        uint256 stakeAmount,
        address initializer,
        string metadataURI
    );

    event CoffeeChatRedeem(uint256 chatId, address redeemer);

    event CoffeeChatRate(uint256 chatId, uint8 points);

    mapping(uint256 => ChatInfo) public chatInfoById;

    mapping(address => PersonalElo) public eloOf;

    uint256 private _commission;

    uint256 public nextChatId;

    CoffeeNFT public coffeeNFTContract;

    Coffee public coffeeContract;

    function initialize() public initializer {
        __ERC721_init("CoffeeChat", "COFFEE");
        __EIP712_init("CoffeeChat", "1");
        __Ownable_init();
        __UUPSUpgradeable_init();
        _commission = 0;
        nextChatId = 0;
    }

    function initializeChat(
        string calldata placeId,
        uint32 startTime,
        uint32 endTime,
        int128 lantitude,
        int128 longtitude,
        string calldata metadataURI
    ) external payable returns (uint256 chatId) {
        require(msg.value > 0, "no stake amount");

        // stake money and start a chat -> get
        ChatInfo memory _chatInfo = ChatInfo(
            _msgSender(),
            startTime,
            endTime,
            uint128(msg.value),
            address(0)
        );
        chatId = nextChatId;
        chatInfoById[chatId] = _chatInfo;
        _safeMint(_msgSender(), chatId);
        _setTokenURI(chatId, metadataURI);

        ++nextChatId;

        emit CoffeeChatIntialize(
            chatId,
            placeId,
            lantitude,
            longtitude,
            startTime,
            endTime,
            msg.value,
            _msgSender(),
            metadataURI
        );
    }

    function redeemReward(
        RedeemVoucher calldata voucher,
        bytes calldata signature,
        address payable receiver
    ) external {
        uint256 chatId = voucher.chatId;
        require(_exists(chatId), "nonexistent chat");

        ChatInfo storage _chatInfo = chatInfoById[chatId];
        require(
            _chatInfo.startTime < block.timestamp,
            "Chat has not started yet!"
        );
        require(_chatInfo.endTime > block.timestamp, "Chat has already ended!");
        _verify(voucher, signature);

        uint256 fee = (_chatInfo.stakeAmount * _commission) / 10000;
        if (fee > 0) {
            AddressUpgradeable.sendValue(payable(owner()), fee);
        }
        AddressUpgradeable.sendValue(receiver, _chatInfo.stakeAmount - fee);

        _burn(chatId);
        _chatInfo.redeemer = _msgSender();

        if (
            coffeeNFTContract.totalSupply() + 2 <=
            coffeeNFTContract.MAX_SUPPLY()
        ) {
            coffeeNFTContract.mint(_chatInfo.initializer, _msgSender());
        }
        uint256 coffeeTokenAmount = 100 ether +
            (_chatInfo.stakeAmount * _commission) /
            1000;
        if (
            (coffeeContract.totalSupply() + coffeeTokenAmount * 2) <=
            coffeeContract.MAX_SUPPLY()
        ) {
            coffeeContract.mint(
                _chatInfo.initializer,
                _msgSender(),
                coffeeTokenAmount
            );
        }
        emit CoffeeChatRedeem(chatId, _msgSender());
    }

    function refund(uint256 chatId) external {
        ChatInfo storage _chatInfo = chatInfoById[chatId];
        require(_exists(chatId), "nonexistent chat");
        require(_chatInfo.endTime < block.timestamp, "Chat not over");
        require(_chatInfo.initializer == _msgSender(), "Not initializer");
        AddressUpgradeable.sendValue(
            payable(_msgSender()),
            _chatInfo.stakeAmount
        );
        _burn(chatId);
        delete chatInfoById[chatId];
    }

    function rate(uint256 chatId, uint8 points) external {
        require(points <= 5, "can't rate over 5");
        ChatInfo memory _chatInfo = chatInfoById[chatId];
        require(_msgSender() == _chatInfo.redeemer, "invalid chat to rate");
        PersonalElo storage _elo = eloOf[_chatInfo.initializer];
        _elo.rateCount += 1;
        _elo.elo += points;

        delete chatInfoById[chatId];

        emit CoffeeChatRate(chatId, points);
    }

    /// @dev Verify voucher
    function _verify(RedeemVoucher calldata voucher, bytes calldata signature)
        private
        view
    {
        ChatInfo memory _chatInfo = chatInfoById[voucher.chatId];
        bytes32 digest = _hashTypedDataV4(
            keccak256(
                abi.encode(
                    keccak256("RedeemVoucher(uint256 chatId)"),
                    voucher.chatId
                )
            )
        );
        require(
            _chatInfo.initializer ==
                ECDSAUpgradeable.recover(digest, signature),
            "invalid or unauthorized"
        );
    }

    function setCommission(uint256 number) external onlyOwner {
        require(number <= 250, "Over 2.5%");
        _commission = number;
    }

    function setCoffeeNFT(address coffeeNFTAddress) external onlyOwner {
        coffeeNFTContract = CoffeeNFT(coffeeNFTAddress);
    }

    function setCoffee(address coffeeAddress) external onlyOwner {
        coffeeContract = Coffee(coffeeAddress);
    }

    function _authorizeUpgrade(address newImplementation)
        internal
        override
        onlyOwner
    {}
}
