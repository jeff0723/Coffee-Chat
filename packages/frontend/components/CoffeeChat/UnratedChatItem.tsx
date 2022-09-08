import { ethers } from 'ethers'
import { CoffeeChat } from 'generated/types'
import React, { memo, useEffect, useState } from 'react'
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
import ConfirmModal from 'components/Rating/ConfirmModal';

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
const UnratedChatItem = ({ info }: Props) => {
    const [placeDetail, setPlaceDetail] = useState<PlaceDetail>()
    const [thumbnail, setThumbnail] = useState<string>("")
    const { chain } = useNetwork()
    const [ratingDisable, setRatingDisable] = useState(false)
    const [rate, setRate] = useState(0)
    const [points, setPoints] = useState<number>(info?.points ?? 0)
    const [rateModalOpen, setRateModalOpen] = useState(false)
    const { config, error } = usePrepareContractWrite({
        addressOrName: chain?.id ? COFFEE_CHAT_ADDRESS[chain?.id] : "",
        contractInterface: COFFEE_CHAT,
        functionName: 'rate',
        args: [info?.id, 4],
        onError() {
            console.log('set rate disabled')
            setRatingDisable(true)
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

    const handleRateChange = (rate: number) => {
        setRate(rate)
        setRateModalOpen(true)
    }


    return (
        <div className='flex flex-col gap-2 items-center w-36 py-2'>
            <img src={thumbnail} className='w-28 h-28 rounded-lg' />
            <div className='flex flex-col mt-2 gap-1'>
                <div className='flex justify-center items-center text-lg font-bold text-center h-14'>{placeDetail?.name}</div>
                <div>🕜 {formatTimestamp(info.startTime)} - {formatTimestamp(info.endTime)}</div>
                <div>🎁 {ethers.utils.formatEther(info.stakeAmount)} MATIC</div>
                <div>👤 {formatAddress(info?.initializer)}</div>
                {!ratingDisable && <Rate value={rate} onChange={handleRateChange} />}
                {ratingDisable && info?.points && <Rate value={points} />}
            </div>
            {!ratingDisable && <ConfirmModal id={info?.id} open={rateModalOpen} setOpen={setRateModalOpen} rate={rate} setRate={setRate} setDisabled={setRatingDisable} setPoints={setPoints} />}
        </div>
    )
}

export default memo(UnratedChatItem)