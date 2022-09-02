import { TypedDataDomain } from "@ethersproject/abstract-signer";
import { ethers, getNamedAccounts, getChainId } from "hardhat";
import { writeFileSync } from "fs";
import { RedeemVoucher, VOUCHER_TYPE, CONTRACT_ADDRESS } from "../constant";

async function main() {
    const users = await ethers.getSigners();
    const signer = users[0];
    console.log("Singer address:", signer.address);
    // domain data
    const chainId = await getChainId();
    const contractAddr = CONTRACT_ADDRESS[chainId];
    if (!contractAddr) {
        console.log("[ERROR] contract address not set");
        return;
    }
    const domainData: TypedDataDomain = {
        name: "CoffeeChat",
        version: "1",
        chainId: chainId,
        verifyingContract: contractAddr,
    }
    let sigMap = new Map<string, {voucher: RedeemVoucher, signature: string}>();
    await Promise.all(users.map(async (user, chatId) => {
        const voucher: RedeemVoucher = { chatId };
        const signature: string = await signer._signTypedData(domainData, VOUCHER_TYPE, voucher);
        sigMap.set(user.address, {voucher, signature});
        return signature;
    }));
    console.log("voucher count:", sigMap.size);
    writeFileSync("./signature.json", JSON.stringify(Object.fromEntries(sigMap), null, 2));
}
  
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});