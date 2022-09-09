/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { Coffee, CoffeeInterface } from "../../contracts/Coffee";

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
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
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
        name: "value",
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
    inputs: [],
    name: "MAX_SUPPLY",
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
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
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
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
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
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
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
        name: "user1",
        type: "address",
      },
      {
        internalType: "address",
        name: "user2",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
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
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
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
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
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
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
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
  "0x60a06040523060805234801561001457600080fd5b506080516119b661004c600039600081816104bc01528181610505015281816105c701528181610607015261069a01526119b66000f3fe60806040526004361061012a5760003560e01c806370a08231116100ab578063a457c2d71161006f578063a457c2d714610321578063a9059cbb14610341578063c4d66de814610361578063c6c3bbe614610381578063dd62ed3e146103a1578063f2fde38b146103c157600080fd5b806370a082311461026f578063715018a6146102a55780638da5cb5b146102ba57806395d89b41146102ec57806399bcaf461461030157600080fd5b806332cb6b0c116100f257806332cb6b0c146101e55780633659cfe61461020557806339509351146102275780634f1ef2861461024757806352d1902d1461025a57600080fd5b806306fdde031461012f578063095ea7b31461015a57806318160ddd1461018a57806323b872dd146101a9578063313ce567146101c9575b600080fd5b34801561013b57600080fd5b506101446103e1565b604051610151919061159c565b60405180910390f35b34801561016657600080fd5b5061017a6101753660046115eb565b610473565b6040519015158152602001610151565b34801561019657600080fd5b506099545b604051908152602001610151565b3480156101b557600080fd5b5061017a6101c4366004611615565b61048b565b3480156101d557600080fd5b5060405160128152602001610151565b3480156101f157600080fd5b5061019b6b033b2e3c9fd0803ce800000081565b34801561021157600080fd5b50610225610220366004611651565b6104b1565b005b34801561023357600080fd5b5061017a6102423660046115eb565b61059a565b610225610255366004611682565b6105bc565b34801561026657600080fd5b5061019b61068d565b34801561027b57600080fd5b5061019b61028a366004611651565b6001600160a01b031660009081526097602052604090205490565b3480156102b157600080fd5b50610225610740565b3480156102c657600080fd5b5060c9546001600160a01b03165b6040516001600160a01b039091168152602001610151565b3480156102f857600080fd5b50610144610754565b34801561030d57600080fd5b5060fb546102d4906001600160a01b031681565b34801561032d57600080fd5b5061017a61033c3660046115eb565b610763565b34801561034d57600080fd5b5061017a61035c3660046115eb565b6107e9565b34801561036d57600080fd5b5061022561037c366004611651565b6107f7565b34801561038d57600080fd5b5061022561039c366004611615565b6109ac565b3480156103ad57600080fd5b5061019b6103bc366004611744565b610a99565b3480156103cd57600080fd5b506102256103dc366004611651565b610ac4565b6060609a80546103f090611777565b80601f016020809104026020016040519081016040528092919081815260200182805461041c90611777565b80156104695780601f1061043e57610100808354040283529160200191610469565b820191906000526020600020905b81548152906001019060200180831161044c57829003601f168201915b5050505050905090565b600033610481818585610b3a565b5060019392505050565b600033610499858285610c5e565b6104a4858585610cd8565b60019150505b9392505050565b306001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614156105035760405162461bcd60e51b81526004016104fa906117b2565b60405180910390fd5b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031661054c60008051602061193a833981519152546001600160a01b031690565b6001600160a01b0316146105725760405162461bcd60e51b81526004016104fa906117fe565b61057b81610ea6565b6040805160008082526020820190925261059791839190610eae565b50565b6000336104818185856105ad8383610a99565b6105b79190611860565b610b3a565b306001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614156106055760405162461bcd60e51b81526004016104fa906117b2565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031661064e60008051602061193a833981519152546001600160a01b031690565b6001600160a01b0316146106745760405162461bcd60e51b81526004016104fa906117fe565b61067d82610ea6565b61068982826001610eae565b5050565b6000306001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000161461072d5760405162461bcd60e51b815260206004820152603860248201527f555550535570677261646561626c653a206d757374206e6f742062652063616c60448201527f6c6564207468726f7567682064656c656761746563616c6c000000000000000060648201526084016104fa565b5060008051602061193a83398151915290565b610748611019565b6107526000611073565b565b6060609b80546103f090611777565b600033816107718286610a99565b9050838110156107d15760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b60648201526084016104fa565b6107de8286868403610b3a565b506001949350505050565b600033610481818585610cd8565b600054610100900460ff16158080156108175750600054600160ff909116105b806108315750303b158015610831575060005460ff166001145b6108945760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084016104fa565b6000805460ff1916600117905580156108b7576000805461ff0019166101001790555b6108f960405180604001604052806006815260200165436f6666656560d01b8152506040518060400160405280600281526020016110d560f21b8152506110c5565b6109016110f6565b610909611125565b60fb80546001600160a01b0384166001600160a01b031990911617905561096361093b60c9546001600160a01b031690565b60646109546b033b2e3c9fd0803ce80000006005611878565b61095e9190611897565b61114c565b8015610689576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15050565b60fb546001600160a01b0316336001600160a01b031614610a1a5760405162461bcd60e51b815260206004820152602260248201527f6f6e6c792063616c6c656420627920436f666665654368617420636f6e74726160448201526118dd60f21b60648201526084016104fa565b6b033b2e3c9fd0803ce8000000610a32826002611878565b609954610a3f9190611860565b10610a805760405162461bcd60e51b8152602060048201526011602482015270657863656564206d617820737570706c7960781b60448201526064016104fa565b610a8a838261114c565b610a94828261114c565b505050565b6001600160a01b03918216600090815260986020908152604080832093909416825291909152205490565b610acc611019565b6001600160a01b038116610b315760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016104fa565b61059781611073565b6001600160a01b038316610b9c5760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b60648201526084016104fa565b6001600160a01b038216610bfd5760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b60648201526084016104fa565b6001600160a01b0383811660008181526098602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b6000610c6a8484610a99565b90506000198114610cd25781811015610cc55760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e636500000060448201526064016104fa565b610cd28484848403610b3a565b50505050565b6001600160a01b038316610d3c5760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b60648201526084016104fa565b6001600160a01b038216610d9e5760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b60648201526084016104fa565b6001600160a01b03831660009081526097602052604090205481811015610e165760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b60648201526084016104fa565b6001600160a01b03808516600090815260976020526040808220858503905591851681529081208054849290610e4d908490611860565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610e9991815260200190565b60405180910390a3610cd2565b610597611019565b7f4910fdfa16fed3260ed0e7147f7cc6da11a60208b5b9406d12a635614ffd91435460ff1615610ee157610a948361122b565b826001600160a01b03166352d1902d6040518163ffffffff1660e01b8152600401602060405180830381865afa925050508015610f3b575060408051601f3d908101601f19168201909252610f38918101906118b9565b60015b610f9e5760405162461bcd60e51b815260206004820152602e60248201527f45524331393637557067726164653a206e657720696d706c656d656e7461746960448201526d6f6e206973206e6f74205555505360901b60648201526084016104fa565b60008051602061193a833981519152811461100d5760405162461bcd60e51b815260206004820152602960248201527f45524331393637557067726164653a20756e737570706f727465642070726f786044820152681a58589b195555525160ba1b60648201526084016104fa565b50610a948383836112c7565b60c9546001600160a01b031633146107525760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016104fa565b60c980546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b600054610100900460ff166110ec5760405162461bcd60e51b81526004016104fa906118d2565b61068982826112ec565b600054610100900460ff1661111d5760405162461bcd60e51b81526004016104fa906118d2565b61075261133a565b600054610100900460ff166107525760405162461bcd60e51b81526004016104fa906118d2565b6001600160a01b0382166111a25760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f20616464726573730060448201526064016104fa565b80609960008282546111b49190611860565b90915550506001600160a01b038216600090815260976020526040812080548392906111e1908490611860565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b6001600160a01b0381163b6112985760405162461bcd60e51b815260206004820152602d60248201527f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60448201526c1bdd08184818dbdb9d1c9858dd609a1b60648201526084016104fa565b60008051602061193a83398151915280546001600160a01b0319166001600160a01b0392909216919091179055565b6112d08361136a565b6000825111806112dd5750805b15610a9457610cd283836113aa565b600054610100900460ff166113135760405162461bcd60e51b81526004016104fa906118d2565b815161132690609a9060208501906114d7565b508051610a9490609b9060208401906114d7565b600054610100900460ff166113615760405162461bcd60e51b81526004016104fa906118d2565b61075233611073565b6113738161122b565b6040516001600160a01b038216907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b60606001600160a01b0383163b6114125760405162461bcd60e51b815260206004820152602660248201527f416464726573733a2064656c65676174652063616c6c20746f206e6f6e2d636f6044820152651b9d1c9858dd60d21b60648201526084016104fa565b600080846001600160a01b03168460405161142d919061191d565b600060405180830381855af49150503d8060008114611468576040519150601f19603f3d011682016040523d82523d6000602084013e61146d565b606091505b5091509150611495828260405180606001604052806027815260200161195a6027913961149e565b95945050505050565b606083156114ad5750816104aa565b8251156114bd5782518084602001fd5b8160405162461bcd60e51b81526004016104fa919061159c565b8280546114e390611777565b90600052602060002090601f016020900481019282611505576000855561154b565b82601f1061151e57805160ff191683800117855561154b565b8280016001018555821561154b579182015b8281111561154b578251825591602001919060010190611530565b5061155792915061155b565b5090565b5b80821115611557576000815560010161155c565b60005b8381101561158b578181015183820152602001611573565b83811115610cd25750506000910152565b60208152600082518060208401526115bb816040850160208701611570565b601f01601f19169190910160400192915050565b80356001600160a01b03811681146115e657600080fd5b919050565b600080604083850312156115fe57600080fd5b611607836115cf565b946020939093013593505050565b60008060006060848603121561162a57600080fd5b611633846115cf565b9250611641602085016115cf565b9150604084013590509250925092565b60006020828403121561166357600080fd5b6104aa826115cf565b634e487b7160e01b600052604160045260246000fd5b6000806040838503121561169557600080fd5b61169e836115cf565b9150602083013567ffffffffffffffff808211156116bb57600080fd5b818501915085601f8301126116cf57600080fd5b8135818111156116e1576116e161166c565b604051601f8201601f19908116603f011681019083821181831017156117095761170961166c565b8160405282815288602084870101111561172257600080fd5b8260208601602083013760006020848301015280955050505050509250929050565b6000806040838503121561175757600080fd5b611760836115cf565b915061176e602084016115cf565b90509250929050565b600181811c9082168061178b57607f821691505b602082108114156117ac57634e487b7160e01b600052602260045260246000fd5b50919050565b6020808252602c908201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060408201526b19195b1959d85d1958d85b1b60a21b606082015260800190565b6020808252602c908201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060408201526b6163746976652070726f787960a01b606082015260800190565b634e487b7160e01b600052601160045260246000fd5b600082198211156118735761187361184a565b500190565b60008160001904831182151516156118925761189261184a565b500290565b6000826118b457634e487b7160e01b600052601260045260246000fd5b500490565b6000602082840312156118cb57600080fd5b5051919050565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b6000825161192f818460208701611570565b919091019291505056fe360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a26469706673582212207165d0929c731bc2e3a2ee6c67e9b961c9b07441f6fd894d1aa33d37bdf2b76c64736f6c634300080c0033";

type CoffeeConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: CoffeeConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Coffee__factory extends ContractFactory {
  constructor(...args: CoffeeConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Coffee> {
    return super.deploy(overrides || {}) as Promise<Coffee>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Coffee {
    return super.attach(address) as Coffee;
  }
  override connect(signer: Signer): Coffee__factory {
    return super.connect(signer) as Coffee__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CoffeeInterface {
    return new utils.Interface(_abi) as CoffeeInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Coffee {
    return new Contract(address, _abi, signerOrProvider) as Coffee;
  }
}