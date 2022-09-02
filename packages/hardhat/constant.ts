import { BigNumberish, BigNumber } from "ethers";
import { TypedDataField } from "@ethersproject/abstract-signer";

export function getTimestamp(date: Date): number {
  return BigNumber.from(date.valueOf()).div(1000).toNumber();
}

export type RedeemVoucher = {
    chatId: BigNumberish;
};

export const VOUCHER_TYPE: Record<string, TypedDataField[]> = {
  RedeemVoucher: [
    { name: "chatId", type: "uint256" },
  ],
};

type AddressMap = { [chainId: string]: string };
export const CONTRACT_ADDRESS: AddressMap = {
  "1": "0x5FbDB2315678afecb367f032d93F642f64180aa3", // TODO
  "4": "0x47EC596C581D9354dbCb0E2C00aBe298b51EB32A", // TODO
  "1337": "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
};