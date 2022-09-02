type AddressMap = { [chainId: number]: string }
export enum SupportedChainId {
    MAINNET = 1,
    ROPSTEN = 3,
    RINKEBY = 4,
    GOERLI = 5,
    KOVAN = 42,
    ARBITRUM_ONE = 42161,
    ARBITRUM_RINKEBY = 421611,
    OPTIMISM = 10,
    OPTIMISTIC_KOVAN = 69,
    MUMBAI = 80001,
    POLYGON = 137,
    HARDHAT = 1337,
    BSC = 56,
}

export const COFFEE_CHAT_ADDRESS: AddressMap = {
    [SupportedChainId.RINKEBY]: '0x6C78Af041aE5611d171c58f01e3cc5fe41e2fa1F',
    [SupportedChainId.HARDHAT]: '0x5FbDB2315678afecb367f032d93F642f64180aa3',

}