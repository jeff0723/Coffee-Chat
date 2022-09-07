import React, { Dispatch } from 'react'
import { COFFEE_CHAT } from 'constant/abi';
import { COFFEE_CHAT_ADDRESS } from 'constant/address';
import { useState } from 'react';
import { QrReader } from "react-qr-reader";
import { useAccount, useContractWrite, useNetwork, usePrepareContractWrite } from 'wagmi';
import toast from 'react-hot-toast';

type Props = {
    signature: string
    chatId: string
    setSignature: Dispatch<string>
    setChatId: Dispatch<string>
    open: boolean
    toggle: Dispatch<boolean>

}

const RedeemReward = ({ signature, chatId, setSignature, setChatId, toggle, open }: Props) => {
    console.log("signature: ", signature)
    const { address } = useAccount()
    const { chain } = useNetwork()
    const { config, error } = usePrepareContractWrite({
        addressOrName: chain?.id ? COFFEE_CHAT_ADDRESS[chain?.id] : "",
        contractInterface: COFFEE_CHAT,
        functionName: 'redeemReward',
        args: [[chatId], signature, address],
        onError(error) {
            console.log("Camera: ", error)

        }

    })
    const { isLoading: writeLoading, write } = useContractWrite({
        ...config,
        onSuccess(data) {
            toast.success("Successfully redeem reward!")
            setSignature("")
            setChatId("")
            toggle(open)
        },
        onError(error: any) {
            toast.error(error?.data?.message ?? error?.message)
            console.log(error)
        }
    })
    const handleRedeem = async () => {
        if (!address) return toast.error("Please connect to wallet!")

        await write?.()
    }

    return (
        <div className='flex flex-col mt-2 gap-2 '>
            <div>Signature: {signature}</div>
            <div>ChatId: {chatId}</div>
            <button onClick={handleRedeem} className='p-2 bg-black rounded-xl text-white'>Redeem</button>
        </div>
    )
}

export default RedeemReward