import { ethers } from 'ethers'
import { CoffeeChat } from 'generated/types'
import React, { memo, useEffect, useState } from 'react'
import { QrcodeOutlined, DollarCircleOutlined } from '@ant-design/icons'
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

type Props = {
    info: CoffeeChat
}
type PlacePhoto = {
    height: number
    html_attributions: string[]
    photo_reference: string
    width: number
}
type PlaceDetail = {
    name: string
    rating: number
    phone_number: string
    open_now: boolean
    open_hours: any[]
    photo: PlacePhoto
    types?: string[]
    formatted_address?: string
    icon?: string
}
const formatTimestamp = (timeStamp: string) => {
    const time = new Date((+timeStamp) * 1000)
    return time.toLocaleString('en-US', { hour: 'numeric', hour12: true })
}
const PastChatItem = ({ info }: Props) => {
    const [placeDetail, setPlaceDetail] = useState<PlaceDetail>()
    const [thumbnail, setThumbnail] = useState<string>("")
    const { chain } = useNetwork()
    const { address } = useAccount()
    const [refundDisabled, setRefundDisable] = useState(false)
    const { config, error } = usePrepareContractWrite({
        addressOrName: chain?.id ? COFFEE_CHAT_ADDRESS[chain?.id] : "",
        contractInterface: COFFEE_CHAT,
        functionName: 'refund',
        args: [info?.id],
        onError() {
            console.log('set refund disabled')
            setRefundDisable(true)
        }

    })
    const { write } = useContractWrite({
        ...config,
        onSuccess(data) {
            toast.success("Successfully refund!")

        },
        onError(error: any) {
            toast.error(error?.data?.message ?? error?.message)
            console.log(error)
        }
    })

    const getPlaceDetail = async () => {

        const respone = await fetch(`/api/get-place-detail?place_id=${info.placeId}`)
        const data = await respone.json()
        if (data && data.photos) {
            const detail = {
                ...data,
                photo: data.photos[0]
            }
            setPlaceDetail(detail)
        }
    }
    const getPlacePhoto = async () => {
        const photo = placeDetail?.photo
        const response = await fetch(`/api/get-photo?photo_reference=${photo?.photo_reference}`)
        const url = URL.createObjectURL(new Blob([await response.blob()]));
        setThumbnail(url)
    }
    useEffect(() => {
        if (info) {
            getPlaceDetail()
        }
    }, [])
    useEffect(() => {
        if (placeDetail?.photo) {
            getPlacePhoto()
        }
    }, [placeDetail])

    const handleRefund = async () => {
        await write?.()
    }

    return (
        <div className='flex flex-col gap-2 items-center w-32 py-2'>
            <img src={thumbnail} className='w-28 h-28 rounded-lg' />
            <div className='flex flex-col mt-2 gap-2'>
                <div className='flex justify-center items-center text-lg font-bold text-center h-14'>{placeDetail?.name}</div>
                <div>🕜 {formatTimestamp(info.startTime)} - {formatTimestamp(info.endTime)}</div>
                <div>🎁 {ethers.utils.formatEther(info.stakeAmount)} MATIC</div>
                {(info?.isActive && !refundDisabled) && <button
                    className='flex justify-center items-center mt-3 p-2 rounded-xl bg-black text-white hover:bg-opacity-80 disabled:bg-opacity-80'
                    onClick={handleRefund}>
                    <DollarCircleOutlined className="text-[15px] mr-1" /> Refund</button>}
            </div>

        </div>
    )
}

export default memo(PastChatItem)