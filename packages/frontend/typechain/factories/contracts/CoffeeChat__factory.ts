/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  CoffeeChat,
  CoffeeChatInterface,
} from "../../contracts/CoffeeChat";

const _abi = [
  {
    inputs: [],
    name: "ApprovalCallerNotOwnerNorApproved",
    type: "error",
  },
  {
    inputs: [],
    name: "ApprovalQueryForNonexistentToken",
    type: "error",
  },
  {
    inputs: [],
    name: "ApproveToCaller",
    type: "error",
  },
  {
    inputs: [],
    name: "BalanceQueryForZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "MintERC2309QuantityExceedsLimit",
    type: "error",
  },
  {
    inputs: [],
    name: "MintToZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "MintZeroQuantity",
    type: "error",
  },
  {
    inputs: [],
    name: "OwnerQueryForNonexistentToken",
    type: "error",
  },
  {
    inputs: [],
    name: "OwnershipNotInitializedForExtraData",
    type: "error",
  },
  {
    inputs: [],
    name: "TransferCallerNotOwnerNorApproved",
    type: "error",
  },
  {
    inputs: [],
    name: "TransferFromIncorrectOwner",
    type: "error",
  },
  {
    inputs: [],
    name: "TransferToNonERC721ReceiverImplementer",
    type: "error",
  },
  {
    inputs: [],
    name: "TransferToZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "URIQueryForNonexistentToken",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "previousAdmin",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "AdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "beacon",
        type: "address",
      },
    ],
    name: "BeaconUpgraded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "fromTokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "toTokenId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "ConsecutiveTransfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "Upgraded",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "chatInfoById",
    outputs: [
      {
        internalType: "string",
        name: "placeId",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "lantitude",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "longtitude",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "startTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "endTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "stakeAmount",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isActive",
        type: "bool",
      },
      {
        internalType: "address",
        name: "initializer",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "placeId",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "startTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "endTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "lantitude",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "longtitude",
        type: "uint256",
      },
    ],
    name: "intializeChat",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "proxiableUUID",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "chatId",
            type: "uint256",
          },
        ],
        internalType: "struct CoffeeChat.RedeemVoucher",
        name: "voucher",
        type: "tuple",
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
    ],
    name: "redeemReward",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "chatId",
        type: "uint256",
      },
    ],
    name: "refund",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "number",
        type: "uint256",
      },
    ],
    name: "setCommission",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
    ],
    name: "upgradeTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "upgradeToAndCall",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

const _bytecode =
  "0x60a06040523060805234801561001457600080fd5b50608051612df361004c60003960008181610d0b01528181610d4b01528181610e0b01528181610e4b0152610ede0152612df36000f3fe6080604052600436106101815760003560e01c806352d1902d116100d157806395d89b411161008a578063bec0bf1511610064578063bec0bf1514610432578063c87b56dd14610466578063e985e9c514610486578063f2fde38b146104a657600080fd5b806395d89b41146103dd578063a22cb465146103f2578063b88d4fde1461041257600080fd5b806352d1902d146103405780636352211e1461035557806370a0823114610375578063715018a6146103955780638129fc1c146103aa5780638da5cb5b146103bf57600080fd5b806323b872dd1161013e578063355e6b4311610118578063355e6b43146102cd5780633659cfe6146102ed57806342842e0e1461030d5780634f1ef2861461032d57600080fd5b806323b872dd1461027a578063278ecde11461029a5780632fa82b3e146102ba57600080fd5b806301ffc9a71461018657806306fdde03146101bb578063081812fc146101dd578063095ea7b31461021557806318160ddd146102375780631a066fde1461025a575b600080fd5b34801561019257600080fd5b506101a66101a136600461268c565b6104c6565b60405190151581526020015b60405180910390f35b3480156101c757600080fd5b506101d0610518565b6040516101b29190612701565b3480156101e957600080fd5b506101fd6101f8366004612714565b6105b3565b6040516001600160a01b0390911681526020016101b2565b34801561022157600080fd5b50610235610230366004612749565b610600565b005b34801561024357600080fd5b5061024c6106ae565b6040519081526020016101b2565b34801561026657600080fd5b506102356102753660046127b5565b6106cd565b34801561028657600080fd5b50610235610295366004612810565b610816565b3480156102a657600080fd5b506102356102b5366004612714565b610a05565b6102356102c836600461284c565b610b2b565b3480156102d957600080fd5b506102356102e8366004612714565b610caf565b3480156102f957600080fd5b506102356103083660046128ae565b610d00565b34801561031957600080fd5b50610235610328366004612810565b610de0565b61023561033b36600461296c565b610e00565b34801561034c57600080fd5b5061024c610ed1565b34801561036157600080fd5b506101fd610370366004612714565b610f84565b34801561038157600080fd5b5061024c6103903660046128ae565b610f8f565b3480156103a157600080fd5b50610235610ff8565b3480156103b657600080fd5b5061023561100c565b3480156103cb57600080fd5b5060cb546001600160a01b03166101fd565b3480156103e957600080fd5b506101d06112ba565b3480156103fe57600080fd5b5061023561040d3660046129ba565b6112d2565b34801561041e57600080fd5b5061023561042d3660046129f6565b611379565b34801561043e57600080fd5b5061045261044d366004612714565b6113c3565b6040516101b2989796959493929190612a5e565b34801561047257600080fd5b506101d0610481366004612714565b61149b565b34801561049257600080fd5b506101a66104a1366004612ab4565b61152d565b3480156104b257600080fd5b506102356104c13660046128ae565b61156a565b60006301ffc9a760e01b6001600160e01b0319831614806104f757506380ac58cd60e01b6001600160e01b03198316145b806105125750635b5e139f60e01b6001600160e01b03198316145b92915050565b60606105226115e0565b600201805461053090612ae7565b80601f016020809104026020016040519081016040528092919081815260200182805461055c90612ae7565b80156105a95780601f1061057e576101008083540402835291602001916105a9565b820191906000526020600020905b81548152906001019060200180831161058c57829003601f168201915b5050505050905090565b60006105be82611604565b6105db576040516333d1c03960e21b815260040160405180910390fd5b6105e36115e0565b60009283526006016020525060409020546001600160a01b031690565b600061060b82610f84565b9050336001600160a01b0382161461064457610627813361152d565b610644576040516367d9dca160e11b815260040160405180910390fd5b8261064d6115e0565b6000848152600691909101602052604080822080546001600160a01b0319166001600160a01b0394851617905551849286811692908516917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259190a4505050565b6000806106b96115e0565b600101546106c56115e0565b540303919050565b8235600090815260ff60205260409020600381015442116107355760405162461bcd60e51b815260206004820152601860248201527f43686174206861736e277420737461727465642079657421000000000000000060448201526064015b60405180910390fd5b428160040154116107885760405162461bcd60e51b815260206004820152601760248201527f436861742068617320616c726561647920656e64656421000000000000000000604482015260640161072c565b600681015460ff166107ca5760405162461bcd60e51b815260206004820152600b60248201526a21b430ba13b99037bb32b960a91b604482015260640161072c565b6107d5848484611640565b6005810154604051339180156108fc02916000818181858888f19350505050158015610805573d6000803e3d6000fd5b50600601805460ff19169055505050565b60006108218261185a565b9050836001600160a01b0316816001600160a01b0316146108545760405162a1148160e81b815260040160405180910390fd5b600080610860846118e1565b9150915061088581876108703390565b6001600160a01b039081169116811491141790565b6108b057610893863361152d565b6108b057604051632ce44b5f60e11b815260040160405180910390fd5b6001600160a01b0385166108d757604051633a954ecd60e21b815260040160405180910390fd5b80156108e257600082555b6108ea6115e0565b6001600160a01b03871660009081526005919091016020526040902080546000190190556109166115e0565b6001600160a01b03861660008181526005929092016020526040909120805460010190554260a01b17600160e11b1761094d6115e0565b60008681526004919091016020526040902055600160e11b83166109bc57600184016109776115e0565b600082815260049190910160205260409020546109ba576109966115e0565b5481146109ba57836109a66115e0565b600083815260049190910160205260409020555b505b83856001600160a01b0316876001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4505050505050565b600081815260ff6020526040902060048101544211610a565760405162461bcd60e51b815260206004820152600d60248201526c21b430ba103737ba1037bb32b960991b604482015260640161072c565b600681015460ff16610a985760405162461bcd60e51b815260206004820152600b60248201526a21b430ba13b99037bb32b960a91b604482015260640161072c565b60068101546001600160a01b03610100909104163314610aec5760405162461bcd60e51b815260206004820152600f60248201526e2737ba1034b734ba34b0b634bd32b960891b604482015260640161072c565b6005810154604051339180156108fc02916000818181858888f19350505050158015610b1c573d6000803e3d6000fd5b50600601805460ff1916905550565b60003411610b6d5760405162461bcd60e51b815260206004820152600f60248201526e1b9bc81cdd185ad948185b5bdd5b9d608a1b604482015260640161072c565b604080516101206020601f8901819004028201810190925261010081018781526000928291908a908a9081908501838280828437600092018290525093855250505060208083018790526040808401879052606084018a9052608084018990523460a0850152600160c08501523360e09094019390935260fe54825260ff81529190208251805193945084939192610c0a928492909101906125dd565b506020820151600182015560408201516002820155606082015160038201556080820151600482015560a0820151600582015560c08201516006909101805460e0909301516001600160a01b031661010002610100600160a81b0319921515929092166001600160a81b031990931692909217179055610c91610c8a3390565b6001611909565b60fe8054906000610ca183612b22565b919050555050505050505050565b610cb7611923565b6127108110610cfb5760405162461bcd60e51b815260206004820152601060248201526f13dd995c880c4c0c081c195c98d95b9d60821b604482015260640161072c565b60fd55565b306001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000161415610d495760405162461bcd60e51b815260040161072c90612b4b565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316610d92600080516020612d57833981519152546001600160a01b031690565b6001600160a01b031614610db85760405162461bcd60e51b815260040161072c90612b97565b610dc18161197d565b60408051600080825260208201909252610ddd91839190611985565b50565b610dfb83838360405180602001604052806000815250611379565b505050565b306001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000161415610e495760405162461bcd60e51b815260040161072c90612b4b565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316610e92600080516020612d57833981519152546001600160a01b031690565b6001600160a01b031614610eb85760405162461bcd60e51b815260040161072c90612b97565b610ec18261197d565b610ecd82826001611985565b5050565b6000306001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614610f715760405162461bcd60e51b815260206004820152603860248201527f555550535570677261646561626c653a206d757374206e6f742062652063616c60448201527f6c6564207468726f7567682064656c656761746563616c6c0000000000000000606482015260840161072c565b50600080516020612d5783398151915290565b60006105128261185a565b60006001600160a01b038216610fb8576040516323d3ad8160e21b815260040160405180910390fd5b67ffffffffffffffff610fc96115e0565b6005016000846001600160a01b03166001600160a01b0316815260200190815260200160002054169050919050565b611000611923565b61100a6000611af0565b565b600080516020612d9e83398151915254610100900460ff1661104157600080516020612d9e8339815191525460ff1615611045565b303b155b6110b75760405162461bcd60e51b815260206004820152603760248201527f455243373231415f5f496e697469616c697a61626c653a20636f6e747261637460448201527f20697320616c726561647920696e697469616c697a6564000000000000000000606482015260840161072c565b600080516020612d9e83398151915254610100900460ff161580156110f357600080516020612d9e833981519152805461ffff19166101011790555b600054610100900460ff16158080156111135750600054600160ff909116105b8061112d5750303b15801561112d575060005460ff166001145b6111905760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b606482015260840161072c565b6000805460ff1916600117905580156111b3576000805461ff0019166101001790555b6111fd6040518060400160405280600a81526020016910dbd999995950da185d60b21b81525060405180604001604052806006815260200165434f4646454560d01b815250611b42565b6112426040518060400160405280600a81526020016910dbd999995950da185d60b21b815250604051806040016040528060018152602001603160f81b815250611b80565b61124a611bb1565b611252611be0565b8015611298576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b508015610ddd5750600080516020612d9e833981519152805461ff0019169055565b60606112c46115e0565b600301805461053090612ae7565b6001600160a01b0382163314156112fc5760405163b06307db60e01b815260040160405180910390fd5b806113056115e0565b336000818152600792909201602090815260408084206001600160a01b03881680865290835293819020805460ff19169515159590951790945592518415158152919290917f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a35050565b611384848484610816565b6001600160a01b0383163b156113bd576113a084848484611c07565b6113bd576040516368d2bf6b60e11b815260040160405180910390fd5b50505050565b60ff602052600090815260409020805481906113de90612ae7565b80601f016020809104026020016040519081016040528092919081815260200182805461140a90612ae7565b80156114575780601f1061142c57610100808354040283529160200191611457565b820191906000526020600020905b81548152906001019060200180831161143a57829003601f168201915b5050505060018301546002840154600385015460048601546005870154600690970154959693959294509092909160ff81169061010090046001600160a01b031688565b60606114a682611604565b6114c357604051630a14c4b560e41b815260040160405180910390fd5b60006114da60408051602081019091526000815290565b90508051600014156114fb5760405180602001604052806000815250611526565b8061150584611cef565b604051602001611516929190612be3565b6040516020818303038152906040525b9392505050565b60006115376115e0565b6001600160a01b039384166000908152600791909101602090815260408083209490951682529290925250205460ff1690565b611572611923565b6001600160a01b0381166115d75760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b606482015260840161072c565b610ddd81611af0565b7f2569078dfb4b0305704d3008e7403993ae9601b85f7ae5e742de3de8f8011c4090565b600061160e6115e0565b54821080156105125750600160e01b6116256115e0565b60008481526004919091016020526040902054161592915050565b8235600090815260ff60205260408082208151610100810190925280548290829061166a90612ae7565b80601f016020809104026020016040519081016040528092919081815260200182805461169690612ae7565b80156116e35780601f106116b8576101008083540402835291602001916116e3565b820191906000526020600020905b8154815290600101906020018083116116c657829003601f168201915b5050509183525050600182015460208083019190915260028301546040808401919091526003840154606084015260048401546080840152600584015460a084015260069093015460ff8116151560c08401526001600160a01b036101009091041660e09092019190915290519192506000916117ad91611792917f84ce848b49d0b87cf95938b03aee3bb301b6881f7aff80a561f51246b1ff27b99189359101918252602082015260400190565b60405160208183030381529060405280519060200120611d31565b90506117ef8185858080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250611d7f92505050565b6001600160a01b03168260e001516001600160a01b0316146118535760405162461bcd60e51b815260206004820152601760248201527f696e76616c6964206f7220756e617574686f72697a6564000000000000000000604482015260640161072c565b5050505050565b6000816118656115e0565b548110156118c85760006118776115e0565b600083815260049190910160205260409020549050600160e01b81166118c6575b80611526576118a56115e0565b60001990920160008181526004939093016020526040909220549050611898565b505b604051636f96cda160e11b815260040160405180910390fd5b60008060006118ee6115e0565b60009485526006016020525050604090912080549092909150565b610ecd828260405180602001604052806000815250611da3565b60cb546001600160a01b0316331461100a5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161072c565b610ddd611923565b7f4910fdfa16fed3260ed0e7147f7cc6da11a60208b5b9406d12a635614ffd91435460ff16156119b857610dfb83611e19565b826001600160a01b03166352d1902d6040518163ffffffff1660e01b8152600401602060405180830381865afa925050508015611a12575060408051601f3d908101601f19168201909252611a0f91810190612c12565b60015b611a755760405162461bcd60e51b815260206004820152602e60248201527f45524331393637557067726164653a206e657720696d706c656d656e7461746960448201526d6f6e206973206e6f74205555505360901b606482015260840161072c565b600080516020612d578339815191528114611ae45760405162461bcd60e51b815260206004820152602960248201527f45524331393637557067726164653a20756e737570706f727465642070726f786044820152681a58589b195555525160ba1b606482015260840161072c565b50610dfb838383611eb5565b60cb80546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b600080516020612d9e83398151915254610100900460ff16611b765760405162461bcd60e51b815260040161072c90612c2b565b610ecd8282611eda565b600054610100900460ff16611ba75760405162461bcd60e51b815260040161072c90612c7f565b610ecd8282611f5d565b600054610100900460ff16611bd85760405162461bcd60e51b815260040161072c90612c7f565b61100a611f9e565b600054610100900460ff1661100a5760405162461bcd60e51b815260040161072c90612c7f565b604051630a85bd0160e11b81526000906001600160a01b0385169063150b7a0290611c3c903390899088908890600401612cca565b6020604051808303816000875af1925050508015611c77575060408051601f3d908101601f19168201909252611c7491810190612d07565b60015b611cd2573d808015611ca5576040519150601f19603f3d011682016040523d82523d6000602084013e611caa565b606091505b508051611cca576040516368d2bf6b60e11b815260040160405180910390fd5b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050949350505050565b604080516080019081905280825b600183039250600a81066030018353600a900480611d1a57611d1f565b611cfd565b50819003601f19909101908152919050565b6000610512611d3e611fce565b8360405161190160f01b6020820152602281018390526042810182905260009060620160405160208183030381529060405280519060200120905092915050565b6000806000611d8e858561204e565b91509150611d9b81612094565b509392505050565b611dad838361224f565b6001600160a01b0383163b15610dfb576000611dc76115e0565b5490508281035b611de16000868380600101945086611c07565b611dfe576040516368d2bf6b60e11b815260040160405180910390fd5b818110611dce5781611e0e6115e0565b541461185357600080fd5b6001600160a01b0381163b611e865760405162461bcd60e51b815260206004820152602d60248201527f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60448201526c1bdd08184818dbdb9d1c9858dd609a1b606482015260840161072c565b600080516020612d5783398151915280546001600160a01b0319166001600160a01b0392909216919091179055565b611ebe83612383565b600082511180611ecb5750805b15610dfb576113bd83836123c3565b600080516020612d9e83398151915254610100900460ff16611f0e5760405162461bcd60e51b815260040161072c90612c2b565b81611f176115e0565b6002019080519060200190611f2d9291906125dd565b5080611f376115e0565b6003019080519060200190611f4d9291906125dd565b506000611f586115e0565b555050565b600054610100900460ff16611f845760405162461bcd60e51b815260040161072c90612c7f565b815160209283012081519190920120606591909155606655565b600054610100900460ff16611fc55760405162461bcd60e51b815260040161072c90612c7f565b61100a33611af0565b60006120497f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f611ffd60655490565b6066546040805160208101859052908101839052606081018290524660808201523060a082015260009060c0016040516020818303038152906040528051906020012090509392505050565b905090565b6000808251604114156120855760208301516040840151606085015160001a612079878285856124b7565b9450945050505061208d565b506000905060025b9250929050565b60008160048111156120a8576120a8612d24565b14156120b15750565b60018160048111156120c5576120c5612d24565b14156121135760405162461bcd60e51b815260206004820152601860248201527f45434453413a20696e76616c6964207369676e61747572650000000000000000604482015260640161072c565b600281600481111561212757612127612d24565b14156121755760405162461bcd60e51b815260206004820152601f60248201527f45434453413a20696e76616c6964207369676e6174757265206c656e67746800604482015260640161072c565b600381600481111561218957612189612d24565b14156121e25760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c604482015261756560f01b606482015260840161072c565b60048160048111156121f6576121f6612d24565b1415610ddd5760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202776272076616c604482015261756560f01b606482015260840161072c565b60006122596115e0565b5490508161227a5760405163b562e8dd60e01b815260040160405180910390fd5b68010000000000000001820261228e6115e0565b6001600160a01b038516600081815260059290920160205260409091208054929092019091554260a01b6001841460e11b17176122c96115e0565b600083815260049190910160205260408120919091556001600160a01b0384169083830190839083907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8180a4600183015b81811461235357808360007fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef600080a460010161231b565b508161237157604051622e076360e81b815260040160405180910390fd5b8061237a6115e0565b5550610dfb9050565b61238c81611e19565b6040516001600160a01b038216907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b60606001600160a01b0383163b61242b5760405162461bcd60e51b815260206004820152602660248201527f416464726573733a2064656c65676174652063616c6c20746f206e6f6e2d636f6044820152651b9d1c9858dd60d21b606482015260840161072c565b600080846001600160a01b0316846040516124469190612d3a565b600060405180830381855af49150503d8060008114612481576040519150601f19603f3d011682016040523d82523d6000602084013e612486565b606091505b50915091506124ae8282604051806060016040528060278152602001612d77602791396125a4565b95945050505050565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a08311156124ee575060009050600361259b565b8460ff16601b1415801561250657508460ff16601c14155b15612517575060009050600461259b565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa15801561256b573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b0381166125945760006001925092505061259b565b9150600090505b94509492505050565b606083156125b3575081611526565b8251156125c35782518084602001fd5b8160405162461bcd60e51b815260040161072c9190612701565b8280546125e990612ae7565b90600052602060002090601f01602090048101928261260b5760008555612651565b82601f1061262457805160ff1916838001178555612651565b82800160010185558215612651579182015b82811115612651578251825591602001919060010190612636565b5061265d929150612661565b5090565b5b8082111561265d5760008155600101612662565b6001600160e01b031981168114610ddd57600080fd5b60006020828403121561269e57600080fd5b813561152681612676565b60005b838110156126c45781810151838201526020016126ac565b838111156113bd5750506000910152565b600081518084526126ed8160208601602086016126a9565b601f01601f19169290920160200192915050565b60208152600061152660208301846126d5565b60006020828403121561272657600080fd5b5035919050565b80356001600160a01b038116811461274457600080fd5b919050565b6000806040838503121561275c57600080fd5b6127658361272d565b946020939093013593505050565b60008083601f84011261278557600080fd5b50813567ffffffffffffffff81111561279d57600080fd5b60208301915083602082850101111561208d57600080fd5b600080600083850360408112156127cb57600080fd5b60208112156127d957600080fd5b50839250602084013567ffffffffffffffff8111156127f757600080fd5b61280386828701612773565b9497909650939450505050565b60008060006060848603121561282557600080fd5b61282e8461272d565b925061283c6020850161272d565b9150604084013590509250925092565b60008060008060008060a0878903121561286557600080fd5b863567ffffffffffffffff81111561287c57600080fd5b61288889828a01612773565b909a90995060208901359860408101359850606081013597506080013595509350505050565b6000602082840312156128c057600080fd5b6115268261272d565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126128f057600080fd5b813567ffffffffffffffff8082111561290b5761290b6128c9565b604051601f8301601f19908116603f01168101908282118183101715612933576129336128c9565b8160405283815286602085880101111561294c57600080fd5b836020870160208301376000602085830101528094505050505092915050565b6000806040838503121561297f57600080fd5b6129888361272d565b9150602083013567ffffffffffffffff8111156129a457600080fd5b6129b0858286016128df565b9150509250929050565b600080604083850312156129cd57600080fd5b6129d68361272d565b9150602083013580151581146129eb57600080fd5b809150509250929050565b60008060008060808587031215612a0c57600080fd5b612a158561272d565b9350612a236020860161272d565b925060408501359150606085013567ffffffffffffffff811115612a4657600080fd5b612a52878288016128df565b91505092959194509250565b6000610100808352612a728184018c6126d5565b602084019a909a52505060408101969096526060860194909452608085019290925260a0840152151560c08301526001600160a01b031660e090910152919050565b60008060408385031215612ac757600080fd5b612ad08361272d565b9150612ade6020840161272d565b90509250929050565b600181811c90821680612afb57607f821691505b60208210811415612b1c57634e487b7160e01b600052602260045260246000fd5b50919050565b6000600019821415612b4457634e487b7160e01b600052601160045260246000fd5b5060010190565b6020808252602c908201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060408201526b19195b1959d85d1958d85b1b60a21b606082015260800190565b6020808252602c908201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060408201526b6163746976652070726f787960a01b606082015260800190565b60008351612bf58184602088016126a9565b835190830190612c098183602088016126a9565b01949350505050565b600060208284031215612c2457600080fd5b5051919050565b60208082526034908201527f455243373231415f5f496e697469616c697a61626c653a20636f6e7472616374604082015273206973206e6f7420696e697469616c697a696e6760601b606082015260800190565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b6001600160a01b0385811682528416602082015260408101839052608060608201819052600090612cfd908301846126d5565b9695505050505050565b600060208284031215612d1957600080fd5b815161152681612676565b634e487b7160e01b600052602160045260246000fd5b60008251612d4c8184602087016126a9565b919091019291505056fe360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564ee151c8401928dc223602bb187aff91b9a56c7cae5476ef1b3287b085a16c85fa2646970667358221220e96b9e58aab5064b4a65fd76a8274b19760e25c52c3acb800ec333e7485eb95364736f6c634300080c0033";

type CoffeeChatConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: CoffeeChatConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class CoffeeChat__factory extends ContractFactory {
  constructor(...args: CoffeeChatConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<CoffeeChat> {
    return super.deploy(overrides || {}) as Promise<CoffeeChat>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): CoffeeChat {
    return super.attach(address) as CoffeeChat;
  }
  override connect(signer: Signer): CoffeeChat__factory {
    return super.connect(signer) as CoffeeChat__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CoffeeChatInterface {
    return new utils.Interface(_abi) as CoffeeChatInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): CoffeeChat {
    return new Contract(address, _abi, signerOrProvider) as CoffeeChat;
  }
}
