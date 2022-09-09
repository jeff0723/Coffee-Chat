import { ethers } from 'ethers'
import { CoffeeChat } from 'generated/types'
import React, { memo, useEffect, useState } from 'react'
import { QrcodeOutlined } from '@ant-design/icons'
import { TypedDataDomain } from "@ethersproject/abstract-signer";
import { useAccount, useNetwork } from 'wagmi';
import { COFFEE_CHAT_ADDRESS } from 'constant/address';
import { TypedDataField } from "@ethersproject/abstract-signer";
import { useSignTypedData } from 'wagmi';
import { VOUCHER_TYPE } from 'constant/voucher';
import toast from 'react-hot-toast';
import { Modal, Tooltip } from 'antd';
import { QRCodeCanvas } from 'qrcode.react';
import { event } from 'nextjs-google-analytics';


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
const ActiveChatItem = ({ info }: Props) => {
    const [placeDetail, setPlaceDetail] = useState<PlaceDetail>()
    const [thumbnail, setThumbnail] = useState<string>("")
    const { chain } = useNetwork()
    const { address } = useAccount()
    const [open, setOpen] = useState(false)
    const signature = localStorage.getItem(`signature-${info?.id}`)
    const { isLoading: signLoading, signTypedDataAsync } = useSignTypedData({
        onError(error) {
            toast.error("User denied message signature")

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
    const handleSign = async (chatId: string) => {
        if (!chain?.id) return
        if (!chatId) return
        if (!signature) {
            const domainData = {
                name: "CoffeeChat",
                version: "1",
                chainId: chain.id,
                verifyingContract: COFFEE_CHAT_ADDRESS[chain?.id],
            }

            const _signature = await signTypedDataAsync({
                domain: domainData,
                types: VOUCHER_TYPE,
                value: { chatId }
            })
            event("redeem_code_sign", {
                category: "Action",
                label: address
            })
            localStorage.setItem(`signature-${info?.id}`, _signature)
        }
        event("redeem_click", {
            category: "Action",
            label: address
        })
        setOpen(true)
    }

    return (
        <div className='flex flex-col gap-2 items-center w-32 py-2'>
            <img src={thumbnail} className='w-28 h-28 rounded-lg' />
            <div className='flex flex-col mt-2 gap-2'>
                <Tooltip title={placeDetail?.name}>
                    <div className='flex justify-center items-center text-lg font-bold text-center h-14 overflow-y-hidden text-ellipsis'>{placeDetail?.name}</div>
                </Tooltip>
                <div>🕜 {formatTimestamp(info.startTime)} - {formatTimestamp(info.endTime)}</div>
                <div>🎁 {ethers.utils.formatEther(info.stakeAmount)} MATIC</div>
                <button className='flex items-center mt-3 p-2 rounded-xl bg-black text-white hover:bg-opacity-80'
                    onClick={() => (handleSign(info?.id))}>
                    <QrcodeOutlined className="mr-1" /> Redeem Code</button>
            </div>
            <Modal visible={open} onCancel={() => { setOpen(false) }} footer={null} width={350}>
                <div>
                    <QRCodeCanvas
                        value={`signature=${signature}&chatId=${info?.id}`}
                        size={300}
                    />
                </div>
            </Modal>
        </div>
    )
}

export default memo(ActiveChatItem)