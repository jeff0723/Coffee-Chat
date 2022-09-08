import { ethers } from 'ethers'
import { CoffeeChat } from 'generated/types'
import React, { Dispatch, memo, useEffect, useState } from 'react'
import { QrcodeOutlined, LikeOutlined } from '@ant-design/icons'
import { TypedDataDomain } from "@ethersproject/abstract-signer";
import { useAccount, useContractWrite, useNetwork, usePrepareContractWrite } from 'wagmi';
import { COFFEE_CHAT_ADDRESS } from 'constant/address';
import { TypedDataField } from "@ethersproject/abstract-signer";
import { useSignTypedData } from 'wagmi';
import { VOUCHER_TYPE } from 'constant/voucher';
import toast from 'react-hot-toast';
import { Modal } from 'antd';
import { QRCodeCanvas } from 'qrcode.react';
import { COFFEE_CHAT } from 'constant/abi';
import formatAddress from 'utils/formatAddress';
import { Rate } from 'antd';
import MyModal from 'components/UI/CustomizeModal';
import { event } from 'nextjs-google-analytics';

type Props = {
    id: string,
    open: boolean
    setOpen: Dispatch<boolean>
    setRate: Dispatch<number>
    rate: number
    setDisabled: Dispatch<boolean>
    setPoints: Dispatch<number>
}

const ConfirmModal = ({ id, open, setOpen, setRate, rate, setDisabled, setPoints }: Props) => {
    const { chain } = useNetwork()
    const { address } = useAccount()
    const { config, error } = usePrepareContractWrite({
        addressOrName: chain?.id ? COFFEE_CHAT_ADDRESS[chain?.id] : "",
        contractInterface: COFFEE_CHAT,
        functionName: 'rate',
        args: [id, rate],
        onError(error) {
            // toast.error(error?.message)
            console.log(error)
        }

    })
    const { write } = useContractWrite({
        ...config,
        onSuccess(data) {
            toast.success("Successfully rate!")
            setRate(0)
            setOpen(false)
            setDisabled(true)
            setPoints(rate)
            event("rate_success", {
                category: "Action",
                label: address
            })

        },
        onError(error) {
            toast.error(error?.message)

        }
    })
    const handleRate = async () => {
        await write?.()
    }
    return (
        <MyModal open={open} onClose={() => {
            setOpen(false)
            setRate(0)
        }} position='bottom' zIndex={20}>
            <div className='flex flex-col gap-4'>
                <div> Are you sure you want to rate this chat for:</div>
                <Rate value={rate} /> {rate} stars
                <button className='p-2 rounded-lg bg-black text-white' onClick={handleRate}>Yes</button>
                <button className='p-2 rounded-lg hover:border hover:border-red-600 hover:text-red-600'
                    onClick={() => {
                        setOpen(false)
                        setRate(0)
                    }}>No</button>
            </div>
        </MyModal>
    )
}


export default ConfirmModal