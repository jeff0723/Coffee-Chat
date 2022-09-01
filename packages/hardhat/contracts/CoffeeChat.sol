// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.12;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/cryptography/draft-EIP712Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "erc721a-upgradeable/contracts/ERC721AUpgradeable.sol";

/**
 @title Coffee Chat
 @author Jeffrey Lin
 */

contract CoffeeChat is
    Initializable,
    UUPSUpgradeable,
    ERC721AUpgradeable,
    EIP712Upgradeable,
    OwnableUpgradeable
{
    using AddressUpgradeable for address;

    uint256 commission; // basisPoint
    uint256 currentIndex;

    struct ChatInfo {
        string placeId;
        uint256 lantitude;
        uint256 longtitude;
        uint256 startTime;
        uint256 endTime;
        uint256 stakeAmount;
        bool isActive;
        address initializer;
    }

    struct RedeemVoucher {
        uint256 chatId;
    }
    mapping(uint256 => ChatInfo) public chatInfoById;

    function initialize() public initializerERC721A initializer {
        __ERC721A_init("CoffeeChat", "COFFEE");
        __EIP712_init("CoffeeChat", "1");
        __Ownable_init();
        __UUPSUpgradeable_init();
    }

    function intializeChat(
        string calldata placeId,
        uint256 startTime,
        uint256 endTime,
        uint256 lantitude,
        uint256 longtitude
    ) external payable {
        require(msg.value > 0, "no stake amount");
        //stake money and start a chat -> get
        ChatInfo memory _chatInfo = ChatInfo(
            placeId,
            lantitude,
            longtitude,
            startTime,
            endTime,
            msg.value,
            true,
            _msgSender()
        );
        chatInfoById[currentIndex] = _chatInfo;
        super._safeMint(_msgSender(), 1);
        currentIndex++;
    }

    function redeemReward(
        RedeemVoucher calldata voucher,
        bytes calldata signature
    ) external {
        ChatInfo storage _chatInfo = chatInfoById[voucher.chatId];
        require(
            _chatInfo.startTime < block.timestamp,
            "Chat hasn't started yet!"
        );
        require(_chatInfo.endTime > block.timestamp, "Chat has already ended!");
        require(_chatInfo.isActive, "Chat's over");
        _verify(voucher, signature);
        payable(_msgSender()).transfer(_chatInfo.stakeAmount);
        _chatInfo.isActive = false;
    }

    function refund(uint256 chatId) external {
        ChatInfo storage _chatInfo = chatInfoById[chatId];
        require(_chatInfo.endTime < block.timestamp, "Chat not over");
        require(_chatInfo.isActive, "Chat's over");
        require(_chatInfo.initializer == _msgSender(), "Not initializer");
        payable(_msgSender()).transfer(_chatInfo.stakeAmount);
        _chatInfo.isActive = false;
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
                    keccak256("RedeemVoucher(uint chatId)"),
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
        require(number < 10000, "Over 100 percent");
        commission = number;
    }

    function _authorizeUpgrade(address newImplementation)
        internal
        override
        onlyOwner
    {}
}
