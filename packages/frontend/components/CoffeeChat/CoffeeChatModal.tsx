import { Modal, Rate, Tooltip } from 'antd'
import { COFFEE_CHAT } from 'constant/abi'
import { COFFEE_CHAT_ADDRESS } from 'constant/address'
import { ethers } from 'ethers'
import { CoffeeChat } from 'generated/types'
import React, { Dispatch, useEffect, useState } from 'react'
import Countdown from 'react-countdown'
import useGeolocation from 'react-hook-geolocation'
import { formatLatorLng } from 'utils/format'
import formatAddress from 'utils/formatAddress'
import { getDistance } from 'utils/getDistance'
import getIPFSLink from 'utils/getIPFSLink'
import { useContractRead, useNetwork } from 'wagmi'

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
    photos: PlacePhoto[]
    types?: string[]
    formatted_address?: string
    icon?: string
}
type Props = {
    open: boolean
    setOpen: Dispatch<boolean>
    selectedCoffeeChat: CoffeeChat | undefined
    setSelectedCoffeeChat: Dispatch<CoffeeChat | undefined>
    coffeeChatDetail: PlaceDetail | undefined
    coffeeChatPlacePhotos: string[]

}
const formatDistance = (distance: number) => {
    if (distance < 1000) {
        return Math.floor(distance).toString() + " M"
    }
    return (distance / 1000).toFixed(1) + " KM"
}
const CoffeeChatModal = ({ open, setOpen, setSelectedCoffeeChat, selectedCoffeeChat, coffeeChatDetail, coffeeChatPlacePhotos }: Props) => {
    const geolocation = useGeolocation();
    const [description, setDescription] = useState("")
    const [rateCount, setRateCount] = useState(0)
    const [elo, setElo] = useState(0)
    const { chain } = useNetwork()

    const { data, isError, isLoading } = useContractRead({
        addressOrName: chain?.id ? COFFEE_CHAT_ADDRESS[chain?.id] : "",
        contractInterface: COFFEE_CHAT,
        functionName: 'eloOf',
        args: selectedCoffeeChat?.initializer,
        onSuccess: (data) => {
            const { rateCount, elo } = data
            setRateCount(rateCount.toNumber())
            setElo(elo.toNumber())


        }
    })
    const getDescription = async () => {
        if (selectedCoffeeChat?.metadataURI) {
            const { description } = await fetch(getIPFSLink(selectedCoffeeChat?.metadataURI)).then(res => res.json())
            setDescription(description)
        }
    }
    useEffect(() => {
        getDescription()
    }, [selectedCoffeeChat])
    return (
        <Modal zIndex={201} width={300} footer={null} title="Info" open={open} onCancel={() => {
            setOpen(false)
            setSelectedCoffeeChat(undefined)
        }}
        >
            <div className='flex flex-col gap-2'>
                <div>👤 Host: <Tooltip title={selectedCoffeeChat?.initializer}><span className='font-bold'>{formatAddress(selectedCoffeeChat?.initializer)}</span></Tooltip>
                </div>
                <div>👍 Host Rating: {elo && rateCount && (elo / rateCount)} ({rateCount})</div>
                <div>✏️ Host Description: <span className='font-bold'>{description}</span> </div>
                <div>💰 Staked amount:  <span className='font-bold'>{ethers.utils.formatEther(selectedCoffeeChat?.stakeAmount ?? "0")} MATIC</span></div>
                <div>👟 Distance: <span className='font-bold'>
                    {formatDistance(getDistance(
                        geolocation.latitude,
                        geolocation.latitude,
                        formatLatorLng(selectedCoffeeChat?.lantitude),
                        formatLatorLng(selectedCoffeeChat?.lantitude)))}</span></div>
                <div>
                    ⏰ Time Left: <Countdown daysInHours={true} date={new Date((+selectedCoffeeChat?.endTime) * 1000)} className='font-bold' />
                </div>
                <div className='flex flex-col'>
                    <div>📍 Location:  <span className='font-bold'>{coffeeChatDetail?.name}</span></div>
                    <Rate allowHalf value={coffeeChatDetail?.rating} />
                    <div className='flex overflow-scroll gap-2 '>
                        {coffeeChatPlacePhotos.map((photo, index) => (
                            <img src={photo} className='w-2/5 rounded-lg' key={`image-${index}`} />
                        ))}

                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default CoffeeChatModal