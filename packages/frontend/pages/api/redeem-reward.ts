// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { DefenderRelaySigner, DefenderRelayProvider } from 'defender-relay-client/lib/ethers'
import { ethers } from 'ethers'
import { COFFEE_CHAT_ADDRESS } from 'constant/address'
import { COFFEE_CHAT } from 'constant/abi'
const API_KEY = process.env.NEXT_PUBLIC_RELAYER_API_KEY || ""
const API_SECRET = process.env.NEXT_PUBLIC_RELAYER_API_SECRET || ""
type Data = {
    status: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { signature, chatId, redeemer } = req.query
    const credentials = { apiKey: API_KEY, apiSecret: API_SECRET };
    const provider = new DefenderRelayProvider(credentials);
    const signer = new DefenderRelaySigner(credentials, provider, { speed: 'fast' });

    const coffeeChat = new ethers.Contract(COFFEE_CHAT_ADDRESS[4], COFFEE_CHAT, signer);
    console.log("start to redeem")
    const tx = await coffeeChat.redeemReward([chatId], signature, redeemer)
    const receipt = await tx.wait();
    if (receipt.status) {
        res.status(200).json({ status: 'success' })
        console.log("redeem success")
    }
    res.status(400)
}
