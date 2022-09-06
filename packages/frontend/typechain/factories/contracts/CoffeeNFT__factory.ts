/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { CoffeeNFT, CoffeeNFTInterface } from "../../contracts/CoffeeNFT";

const _abi = [
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
        name: "account",
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
        name: "operator",
        type: "address",
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
      {
        indexed: false,
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
    ],
    name: "TransferBatch",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
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
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "TransferSingle",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "value",
        type: "string",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "URI",
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
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
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
        internalType: "address[]",
        name: "accounts",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
    ],
    name: "balanceOfBatch",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "coffeeChatAddress",
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
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "eloOf",
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
        name: "_coffeeChatAddress",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
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
    inputs: [
      {
        internalType: "address",
        name: "user1",
        type: "address",
      },
      {
        internalType: "address",
        name: "user2",
        type: "address",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
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
        internalType: "address",
        name: "target",
        type: "address",
      },
      {
        internalType: "uint8",
        name: "points",
        type: "uint8",
      },
    ],
    name: "rate",
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
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeBatchTransferFrom",
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
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
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
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "uri",
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
];

const _bytecode =
  "0x60a06040523060805234801561001457600080fd5b506080516125d061004c600039600081816105b3015281816105f3015281816107bd015281816107fd015261089001526125d06000f3fe6080604052600436106101135760003560e01c8063715018a6116100a0578063e985e9c511610064578063e985e9c514610315578063ee1fe2ad1461035e578063f242432a1461037e578063f2fde38b1461039e578063f81cd4b0146103be57600080fd5b8063715018a61461026d5780638da5cb5b1461028257806399bcaf46146102b4578063a22cb465146102d5578063c4d66de8146102f557600080fd5b80633659cfe6116100e75780633659cfe6146101ca5780634e1273f4146101ea5780634f1ef2861461021757806352d1902d1461022a5780635e45e7ee1461023f57600080fd5b8062fdd58e1461011857806301ffc9a71461014b5780630e89341c1461017b5780632eb2c2d6146101a8575b600080fd5b34801561012457600080fd5b50610138610133366004611b9c565b6103de565b6040519081526020015b60405180910390f35b34801561015757600080fd5b5061016b610166366004611bdc565b610476565b6040519015158152602001610142565b34801561018757600080fd5b5061019b610196366004611bf9565b6104c8565b6040516101429190611c6a565b3480156101b457600080fd5b506101c86101c3366004611dc9565b61055c565b005b3480156101d657600080fd5b506101c86101e5366004611e73565b6105a8565b3480156101f657600080fd5b5061020a610205366004611e8e565b610688565b6040516101429190611f94565b6101c8610225366004611fa7565b6107b2565b34801561023657600080fd5b50610138610883565b34801561024b57600080fd5b5061013861025a366004611e73565b61012e6020526000908152604090205481565b34801561027957600080fd5b506101c8610937565b34801561028e57600080fd5b5060fb546001600160a01b03165b6040516001600160a01b039091168152602001610142565b3480156102c057600080fd5b5061012d5461029c906001600160a01b031681565b3480156102e157600080fd5b506101c86102f0366004611feb565b61094b565b34801561030157600080fd5b506101c8610310366004611e73565b610956565b34801561032157600080fd5b5061016b610330366004612027565b6001600160a01b03918216600090815260ca6020908152604080832093909416825291909152205460ff1690565b34801561036a57600080fd5b506101c8610379366004612027565b610aa3565b34801561038a57600080fd5b506101c861039936600461205a565b610b5c565b3480156103aa57600080fd5b506101c86103b9366004611e73565b610ba1565b3480156103ca57600080fd5b506101c86103d93660046120bf565b610c17565b60006001600160a01b03831661044e5760405162461bcd60e51b815260206004820152602a60248201527f455243313135353a2061646472657373207a65726f206973206e6f742061207660448201526930b634b21037bbb732b960b11b60648201526084015b60405180910390fd5b50600090815260c9602090815260408083206001600160a01b03949094168352929052205490565b60006001600160e01b03198216636cdb3d1360e11b14806104a757506001600160e01b031982166303a24d0760e21b145b806104c257506301ffc9a760e01b6001600160e01b03198316145b92915050565b606060cb80546104d7906120f1565b80601f0160208091040260200160405190810160405280929190818152602001828054610503906120f1565b80156105505780601f1061052557610100808354040283529160200191610550565b820191906000526020600020905b81548152906001019060200180831161053357829003601f168201915b50505050509050919050565b6001600160a01b03851633148061057857506105788533610330565b6105945760405162461bcd60e51b81526004016104459061212c565b6105a18585858585610ca9565b5050505050565b306001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614156105f15760405162461bcd60e51b81526004016104459061217b565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031661063a600080516020612554833981519152546001600160a01b031690565b6001600160a01b0316146106605760405162461bcd60e51b8152600401610445906121c7565b61066981610e89565b6040805160008082526020820190925261068591839190610e91565b50565b606081518351146106ed5760405162461bcd60e51b815260206004820152602960248201527f455243313135353a206163636f756e747320616e6420696473206c656e677468604482015268040dad2e6dac2e8c6d60bb1b6064820152608401610445565b6000835167ffffffffffffffff81111561070957610709611c7d565b604051908082528060200260200182016040528015610732578160200160208202803683370190505b50905060005b84518110156107aa5761077d85828151811061075657610756612213565b602002602001015185838151811061077057610770612213565b60200260200101516103de565b82828151811061078f5761078f612213565b60209081029190910101526107a38161223f565b9050610738565b509392505050565b306001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614156107fb5760405162461bcd60e51b81526004016104459061217b565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316610844600080516020612554833981519152546001600160a01b031690565b6001600160a01b03161461086a5760405162461bcd60e51b8152600401610445906121c7565b61087382610e89565b61087f82826001610e91565b5050565b6000306001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016146109235760405162461bcd60e51b815260206004820152603860248201527f555550535570677261646561626c653a206d757374206e6f742062652063616c60448201527f6c6564207468726f7567682064656c656761746563616c6c00000000000000006064820152608401610445565b506000805160206125548339815191525b90565b61093f611001565b610949600061105b565b565b61087f3383836110ad565b600054610100900460ff16158080156109765750600054600160ff909116105b806109905750303b158015610990575060005460ff166001145b6109f35760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152608401610445565b6000805460ff191660011790558015610a16576000805461ff0019166101001790555b610a2e6040518060200160405280600081525061118e565b610a366111be565b610a3e6111ed565b61012d80546001600160a01b0319166001600160a01b038416179055801561087f576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15050565b61012d546001600160a01b0316336001600160a01b031614610b125760405162461bcd60e51b815260206004820152602260248201527f6f6e6c792063616c6c656420627920436f666665654368617420636f6e74726160448201526118dd60f21b6064820152608401610445565b610b3782826001600160a01b0316600160405180602001604052806000815250611214565b61087f81836001600160a01b0316600160405180602001604052806000815250611214565b6001600160a01b038516331480610b785750610b788533610330565b610b945760405162461bcd60e51b81526004016104459061212c565b6105a1858585858561132a565b610ba9611001565b6001600160a01b038116610c0e5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610445565b6106858161105b565b60058160ff161115610c5f5760405162461bcd60e51b815260206004820152601160248201527063616e27742072617465206f766572203560781b6044820152606401610445565b610c7433836001600160a01b03166001611458565b6001600160a01b038216600090815261012e60205260408120805460ff84169290610ca090849061225a565b90915550505050565b8151835114610d0b5760405162461bcd60e51b815260206004820152602860248201527f455243313135353a2069647320616e6420616d6f756e7473206c656e677468206044820152670dad2e6dac2e8c6d60c31b6064820152608401610445565b6001600160a01b038416610d315760405162461bcd60e51b815260040161044590612272565b3360005b8451811015610e1b576000858281518110610d5257610d52612213565b602002602001015190506000858381518110610d7057610d70612213565b602090810291909101810151600084815260c9835260408082206001600160a01b038e168352909352919091205490915081811015610dc15760405162461bcd60e51b8152600401610445906122b7565b600083815260c9602090815260408083206001600160a01b038e8116855292528083208585039055908b16825281208054849290610e0090849061225a565b9250508190555050505080610e149061223f565b9050610d35565b50846001600160a01b0316866001600160a01b0316826001600160a01b03167f4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb8787604051610e6b929190612301565b60405180910390a4610e818187878787876115d7565b505050505050565b610685611001565b7f4910fdfa16fed3260ed0e7147f7cc6da11a60208b5b9406d12a635614ffd91435460ff1615610ec957610ec483611733565b505050565b826001600160a01b03166352d1902d6040518163ffffffff1660e01b8152600401602060405180830381865afa925050508015610f23575060408051601f3d908101601f19168201909252610f2091810190612326565b60015b610f865760405162461bcd60e51b815260206004820152602e60248201527f45524331393637557067726164653a206e657720696d706c656d656e7461746960448201526d6f6e206973206e6f74205555505360901b6064820152608401610445565b6000805160206125548339815191528114610ff55760405162461bcd60e51b815260206004820152602960248201527f45524331393637557067726164653a20756e737570706f727465642070726f786044820152681a58589b195555525160ba1b6064820152608401610445565b50610ec48383836117cf565b60fb546001600160a01b031633146109495760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610445565b60fb80546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b816001600160a01b0316836001600160a01b031614156111215760405162461bcd60e51b815260206004820152602960248201527f455243313135353a2073657474696e6720617070726f76616c20737461747573604482015268103337b91039b2b63360b91b6064820152608401610445565b6001600160a01b03838116600081815260ca6020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b600054610100900460ff166111b55760405162461bcd60e51b81526004016104459061233f565b610685816117fa565b600054610100900460ff166111e55760405162461bcd60e51b81526004016104459061233f565b61094961182a565b600054610100900460ff166109495760405162461bcd60e51b81526004016104459061233f565b6001600160a01b0384166112745760405162461bcd60e51b815260206004820152602160248201527f455243313135353a206d696e7420746f20746865207a65726f206164647265736044820152607360f81b6064820152608401610445565b3360006112808561185a565b9050600061128d8561185a565b9050600086815260c9602090815260408083206001600160a01b038b168452909152812080548792906112c190849061225a565b909155505060408051878152602081018790526001600160a01b03808a1692600092918716917fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62910160405180910390a4611321836000898989896118a5565b50505050505050565b6001600160a01b0384166113505760405162461bcd60e51b815260040161044590612272565b33600061135c8561185a565b905060006113698561185a565b9050600086815260c9602090815260408083206001600160a01b038c168452909152902054858110156113ae5760405162461bcd60e51b8152600401610445906122b7565b600087815260c9602090815260408083206001600160a01b038d8116855292528083208985039055908a168252812080548892906113ed90849061225a565b909155505060408051888152602081018890526001600160a01b03808b16928c821692918816917fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62910160405180910390a461144d848a8a8a8a8a6118a5565b505050505050505050565b6001600160a01b0383166114ba5760405162461bcd60e51b815260206004820152602360248201527f455243313135353a206275726e2066726f6d20746865207a65726f206164647260448201526265737360e81b6064820152608401610445565b3360006114c68461185a565b905060006114d38461185a565b604080516020808201835260009182905288825260c981528282206001600160a01b038b168352905220549091508481101561155d5760405162461bcd60e51b8152602060048201526024808201527f455243313135353a206275726e20616d6f756e7420657863656564732062616c604482015263616e636560e01b6064820152608401610445565b600086815260c9602090815260408083206001600160a01b038b81168086529184528285208a8703905582518b81529384018a90529092908816917fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62910160405180910390a4604080516020810190915260009052611321565b6001600160a01b0384163b15610e815760405163bc197c8160e01b81526001600160a01b0385169063bc197c819061161b908990899088908890889060040161238a565b6020604051808303816000875af1925050508015611656575060408051601f3d908101601f19168201909252611653918101906123e8565b60015b61170357611662612405565b806308c379a0141561169c5750611677612420565b80611682575061169e565b8060405162461bcd60e51b81526004016104459190611c6a565b505b60405162461bcd60e51b815260206004820152603460248201527f455243313135353a207472616e7366657220746f206e6f6e20455243313135356044820152732932b1b2b4bb32b91034b6b83632b6b2b73a32b960611b6064820152608401610445565b6001600160e01b0319811663bc197c8160e01b146113215760405162461bcd60e51b8152600401610445906124aa565b6001600160a01b0381163b6117a05760405162461bcd60e51b815260206004820152602d60248201527f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60448201526c1bdd08184818dbdb9d1c9858dd609a1b6064820152608401610445565b60008051602061255483398151915280546001600160a01b0319166001600160a01b0392909216919091179055565b6117d883611960565b6000825111806117e55750805b15610ec4576117f483836119a0565b50505050565b600054610100900460ff166118215760405162461bcd60e51b81526004016104459061233f565b61068581611a94565b600054610100900460ff166118515760405162461bcd60e51b81526004016104459061233f565b6109493361105b565b6040805160018082528183019092526060916000919060208083019080368337019050509050828160008151811061189457611894612213565b602090810291909101015292915050565b6001600160a01b0384163b15610e815760405163f23a6e6160e01b81526001600160a01b0385169063f23a6e61906118e990899089908890889088906004016124f2565b6020604051808303816000875af1925050508015611924575060408051601f3d908101601f19168201909252611921918101906123e8565b60015b61193057611662612405565b6001600160e01b0319811663f23a6e6160e01b146113215760405162461bcd60e51b8152600401610445906124aa565b61196981611733565b6040516001600160a01b038216907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b60606001600160a01b0383163b611a085760405162461bcd60e51b815260206004820152602660248201527f416464726573733a2064656c65676174652063616c6c20746f206e6f6e2d636f6044820152651b9d1c9858dd60d21b6064820152608401610445565b600080846001600160a01b031684604051611a239190612537565b600060405180830381855af49150503d8060008114611a5e576040519150601f19603f3d011682016040523d82523d6000602084013e611a63565b606091505b5091509150611a8b828260405180606001604052806027815260200161257460279139611aa7565b95945050505050565b805161087f9060cb906020840190611ae7565b60608315611ab6575081611ae0565b825115611ac65782518084602001fd5b8160405162461bcd60e51b81526004016104459190611c6a565b9392505050565b828054611af3906120f1565b90600052602060002090601f016020900481019282611b155760008555611b5b565b82601f10611b2e57805160ff1916838001178555611b5b565b82800160010185558215611b5b579182015b82811115611b5b578251825591602001919060010190611b40565b50611b67929150611b6b565b5090565b5b80821115611b675760008155600101611b6c565b80356001600160a01b0381168114611b9757600080fd5b919050565b60008060408385031215611baf57600080fd5b611bb883611b80565b946020939093013593505050565b6001600160e01b03198116811461068557600080fd5b600060208284031215611bee57600080fd5b8135611ae081611bc6565b600060208284031215611c0b57600080fd5b5035919050565b60005b83811015611c2d578181015183820152602001611c15565b838111156117f45750506000910152565b60008151808452611c56816020860160208601611c12565b601f01601f19169290920160200192915050565b602081526000611ae06020830184611c3e565b634e487b7160e01b600052604160045260246000fd5b601f8201601f1916810167ffffffffffffffff81118282101715611cb957611cb9611c7d565b6040525050565b600067ffffffffffffffff821115611cda57611cda611c7d565b5060051b60200190565b600082601f830112611cf557600080fd5b81356020611d0282611cc0565b604051611d0f8282611c93565b83815260059390931b8501820192828101915086841115611d2f57600080fd5b8286015b84811015611d4a5780358352918301918301611d33565b509695505050505050565b600082601f830112611d6657600080fd5b813567ffffffffffffffff811115611d8057611d80611c7d565b604051611d97601f8301601f191660200182611c93565b818152846020838601011115611dac57600080fd5b816020850160208301376000918101602001919091529392505050565b600080600080600060a08688031215611de157600080fd5b611dea86611b80565b9450611df860208701611b80565b9350604086013567ffffffffffffffff80821115611e1557600080fd5b611e2189838a01611ce4565b94506060880135915080821115611e3757600080fd5b611e4389838a01611ce4565b93506080880135915080821115611e5957600080fd5b50611e6688828901611d55565b9150509295509295909350565b600060208284031215611e8557600080fd5b611ae082611b80565b60008060408385031215611ea157600080fd5b823567ffffffffffffffff80821115611eb957600080fd5b818501915085601f830112611ecd57600080fd5b81356020611eda82611cc0565b604051611ee78282611c93565b83815260059390931b8501820192828101915089841115611f0757600080fd5b948201945b83861015611f2c57611f1d86611b80565b82529482019490820190611f0c565b96505086013592505080821115611f4257600080fd5b50611f4f85828601611ce4565b9150509250929050565b600081518084526020808501945080840160005b83811015611f8957815187529582019590820190600101611f6d565b509495945050505050565b602081526000611ae06020830184611f59565b60008060408385031215611fba57600080fd5b611fc383611b80565b9150602083013567ffffffffffffffff811115611fdf57600080fd5b611f4f85828601611d55565b60008060408385031215611ffe57600080fd5b61200783611b80565b91506020830135801515811461201c57600080fd5b809150509250929050565b6000806040838503121561203a57600080fd5b61204383611b80565b915061205160208401611b80565b90509250929050565b600080600080600060a0868803121561207257600080fd5b61207b86611b80565b945061208960208701611b80565b93506040860135925060608601359150608086013567ffffffffffffffff8111156120b357600080fd5b611e6688828901611d55565b600080604083850312156120d257600080fd5b6120db83611b80565b9150602083013560ff8116811461201c57600080fd5b600181811c9082168061210557607f821691505b6020821081141561212657634e487b7160e01b600052602260045260246000fd5b50919050565b6020808252602f908201527f455243313135353a2063616c6c6572206973206e6f7420746f6b656e206f776e60408201526e195c881b9bdc88185c1c1c9bdd9959608a1b606082015260800190565b6020808252602c908201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060408201526b19195b1959d85d1958d85b1b60a21b606082015260800190565b6020808252602c908201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060408201526b6163746976652070726f787960a01b606082015260800190565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b600060001982141561225357612253612229565b5060010190565b6000821982111561226d5761226d612229565b500190565b60208082526025908201527f455243313135353a207472616e7366657220746f20746865207a65726f206164604082015264647265737360d81b606082015260800190565b6020808252602a908201527f455243313135353a20696e73756666696369656e742062616c616e636520666f60408201526939103a3930b739b332b960b11b606082015260800190565b6040815260006123146040830185611f59565b8281036020840152611a8b8185611f59565b60006020828403121561233857600080fd5b5051919050565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b6001600160a01b0386811682528516602082015260a0604082018190526000906123b690830186611f59565b82810360608401526123c88186611f59565b905082810360808401526123dc8185611c3e565b98975050505050505050565b6000602082840312156123fa57600080fd5b8151611ae081611bc6565b600060033d11156109345760046000803e5060005160e01c90565b600060443d101561242e5790565b6040516003193d81016004833e81513d67ffffffffffffffff816024840111818411171561245e57505050505090565b82850191508151818111156124765750505050505090565b843d87010160208285010111156124905750505050505090565b61249f60208286010187611c93565b509095945050505050565b60208082526028908201527f455243313135353a204552433131353552656365697665722072656a656374656040820152676420746f6b656e7360c01b606082015260800190565b6001600160a01b03868116825285166020820152604081018490526060810183905260a06080820181905260009061252c90830184611c3e565b979650505050505050565b60008251612549818460208701611c12565b919091019291505056fe360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a2646970667358221220acc0ee3085ecbc4e5fc4755ff75a2ce1dea4ebc655f01acd284782f091e9e83564736f6c634300080c0033";

type CoffeeNFTConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: CoffeeNFTConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class CoffeeNFT__factory extends ContractFactory {
  constructor(...args: CoffeeNFTConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<CoffeeNFT> {
    return super.deploy(overrides || {}) as Promise<CoffeeNFT>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): CoffeeNFT {
    return super.attach(address) as CoffeeNFT;
  }
  override connect(signer: Signer): CoffeeNFT__factory {
    return super.connect(signer) as CoffeeNFT__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CoffeeNFTInterface {
    return new utils.Interface(_abi) as CoffeeNFTInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): CoffeeNFT {
    return new Contract(address, _abi, signerOrProvider) as CoffeeNFT;
  }
}
