// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.12;

// import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/cryptography/draft-EIP712Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "erc721a-upgradeable/contracts/ERC721AUpgradeable.sol";
import "./CoffeeNFT.sol";

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

    struct ChatInfo {
        string placeId;
        uint64 lantitude;
        uint64 longtitude;
        uint32 startTime;
        uint32 endTime;
        uint256 stakeAmount;
        bool isActive;
        address initializer;
    }

    struct RedeemVoucher {
        uint256 chatId;
    }

    mapping(uint256 => ChatInfo) public chatInfoById;

    CoffeeNFT public coffeeNFTContract;

    event CoffeChatIntialize(
        uint256 tokenId,
        string placeId,
        uint64 lantitude,
        uint64 longtitude,
        uint32 startTime,
        uint32 endTime,
        uint256 stakeAmount,
        bool isActive,
        address initializer
    );

    function initialize() public initializerERC721A initializer {
        __ERC721A_init("CoffeeChat", "COFFEE");
        __EIP712_init("CoffeeChat", "1");
        __Ownable_init();
        __UUPSUpgradeable_init();
    }

    function initializeChat(
        string calldata placeId,
        uint32 startTime,
        uint32 endTime,
        uint64 lantitude,
        uint64 longtitude
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
        uint256 nextId = _nextTokenId();
        chatInfoById[nextId] = _chatInfo;
        _safeMint(_msgSender(), 1);
        emit CoffeChatIntialize(
            nextId,
            placeId,
            lantitude,
            longtitude,
            startTime,
            endTime,
            msg.value,
            true,
            _msgSender()
        );
    }

    function redeemReward(
        RedeemVoucher calldata voucher,
        bytes calldata signature,
        address payable receiver
    ) external {
        uint256 chatId = voucher.chatId;
        ChatInfo storage _chatInfo = chatInfoById[chatId];
        require(
            _chatInfo.startTime < block.timestamp,
            "Chat hasn't started yet!"
        );
        require(_chatInfo.endTime > block.timestamp, "Chat has already ended!");
        require(_chatInfo.isActive, "Chat's over");
        _verify(voucher, signature);
        uint256 fee = (_chatInfo.stakeAmount * commission) / 10000;
        if (fee > 0) {
            AddressUpgradeable.sendValue(payable(owner()), fee);
        }
        AddressUpgradeable.sendValue(receiver, _chatInfo.stakeAmount - fee);
        _chatInfo.isActive = false;
        _burn(chatId);
        coffeeNFTContract.mint(_chatInfo.initializer, receiver);
    }

    function refund(uint256 chatId) external {
        ChatInfo storage _chatInfo = chatInfoById[chatId];
        require(_chatInfo.endTime < block.timestamp, "Chat not over");
        require(_chatInfo.isActive, "Chat's over");
        require(_chatInfo.initializer == _msgSender(), "Not initializer");
        AddressUpgradeable.sendValue(
            payable(_msgSender()),
            _chatInfo.stakeAmount
        );
        _chatInfo.isActive = false;
        _burn(chatId);
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
        commission = number;
    }

    function setCoffeeNFT(address coffeeNFTAddress) external onlyOwner {
        coffeeNFTContract = CoffeeNFT(coffeeNFTAddress);
    }

    function _authorizeUpgrade(address newImplementation)
        internal
        override
        onlyOwner
    {}
}
