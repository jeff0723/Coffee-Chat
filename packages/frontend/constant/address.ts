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
    [SupportedChainId.RINKEBY]: '0xa717BA0e938cd4F18B720A0Eaf52F737ECe848BB',
    [SupportedChainId.HARDHAT]: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    [SupportedChainId.POLYGON]: "0x4eD8CB52ce6Df5FD46017648DdDa93a753E7a116"
}
export const COFFEE_NFT_ADDRESS: AddressMap = {
    [SupportedChainId.RINKEBY]: '0x70611611B641f587b12c4BF052D8424b6A5ACa85',
    [SupportedChainId.POLYGON]: "0x0c28fE607A1F66017c1F887Cb7458C7220CDedce"
}

export const COFFEE_TOKEN_ADDRESS: AddressMap = {
    [SupportedChainId.RINKEBY]: '0xaBEdD255741f9057c81A4E03C6266c64a65dc2E7',
    [SupportedChainId.POLYGON]: "0xE09E08F7387166b315f5fDd08a2aFD4043Cfae4C"


}