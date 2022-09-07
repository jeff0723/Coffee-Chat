import { CoffeeOutlined, EnvironmentOutlined, PhoneOutlined, TagOutlined, SearchOutlined, LoadingOutlined } from '@ant-design/icons';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import {
    Combobox,
    ComboboxInput, ComboboxList,
    ComboboxOption, ComboboxPopover
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { AutoComplete, Button, Drawer, Input, InputNumber, Modal, Popover, Rate, TimePicker } from 'antd';
import { COFFEE_CHAT } from 'constant/abi';
import { COFFEE_CHAT_ADDRESS } from 'constant/address';
import { ethers } from 'ethers';
import { Dispatch, FC, useEffect, useMemo, useReducer, useState } from 'react';
import useGeolocation from 'react-hook-geolocation';
import toast from 'react-hot-toast';
import { usePrepareContractWrite, useContractWrite, useNetwork } from 'wagmi';

import { useQuery } from '@apollo/client';
import { CoffeeChat } from 'generated/types';
import { COFFEE_CHAT_QUERY_FILTERED_BY_POINT } from 'graphql/get-coffee-chat-query';
import Countdown from 'react-countdown';
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng
} from "use-places-autocomplete";
import { formatLatorLng } from 'utils/format';
import { getDistance } from 'utils/getDistance';
import styled from 'styled-components'
import CoffeeChatList from 'components/UI/CoffeeChatList';
import OptionButton from 'components/UI/OptionButton';
import { useMediaQuery } from 'react-responsive'
import { uploadIpfs } from 'utils/uploadIPFS';
import PlaceAutoComplete from 'components/Search/PlaceAutoComplete';
import SearchModal from 'components/Search/SearchModal';
import Head from 'next/head';



type Props = {}
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

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || ""
const formatTimeStampFromTime = (time: string) => {
    // const today = new Date().toJSON().slice(0, 10).replace(/-/g, '/')
    const today = new Date().toLocaleDateString()
    // console.log(today)
    return new Date(today + " " + time).valueOf() / 1000 // for smart contract input

}
const formatDistance = (distance: number) => {
    if (distance < 1000) {
        return Math.floor(distance).toString() + " M"
    }
    return (distance / 1000).toFixed(1) + " KM"
}
const Home: FC = (props: Props) => {
    const isMobile = useMediaQuery({
        query: '(max-width: 475px)'
    })
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: GOOGLE_API_KEY,
        libraries: ["places", 'geometry'],
    });
    const { chain, chains } = useNetwork()
    const [coffeeChats, setCoffeeChats] = useState<CoffeeChat[]>([])
    const geolocation = useGeolocation();
    const [currentTime,] = useState((new Date().valueOf() / 1000).toFixed(0))
    const { data, loading, error } = useQuery(COFFEE_CHAT_QUERY_FILTERED_BY_POINT, {
        variables: {
            lantitude1: ((geolocation.latitude - 1) * 10 ** 15).toString(),
            lantitude2: ((geolocation.latitude + 1) * 10 ** 15).toString(),
            longtitude1: ((geolocation.longitude - 1) * 10 ** 15).toString(),
            longtitude2: ((geolocation.longitude + 1) * 10 ** 15).toString(),
            now: currentTime,
            isactive: true,
        },
        skip: !geolocation,
        onCompleted: (data) => {

            setCoffeeChats(data.coffeeChats)

        },
        onError: (error) => {
            console.log(error)
        }
    }
    )

    const [clicked, setClicked] = useState(false)
    const [coffeeChatClick, setCoffeeChatClick] = useState(false)
    const [selectedCoffeeChat, setSelectedCoffeeChat] = useState<CoffeeChat>()
    const [placeId, setPlaceId] = useState("")
    const [drawerShow, setDrawerShow] = useState(false)
    const [placeDetail, setPlaceDetail] = useState<PlaceDetail>()
    const [coffeeChatDetail, setCoffeeChatDetail] = useState<PlaceDetail>()
    const [coffeeChatPlacePhotos, setCoffeeChatPlacePhotos] = useState<string[]>([])
    const [placePhotos, setPlacePhotos] = useState<string[]>([])
    const [modalOpen, setModalOpen] = useState(false)
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [inputAmount, setInputAmount] = useState(0)
    const [inputDescription, setInputDescription] = useState("")
    const [zoom, setZoom] = useState(12)
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const [clickedPoint, setClickedPoint] = useState({
        lat: 0,
        lng: 0
    })
    const reset = () => {
        setDrawerShow(false)
        setModalOpen(false)
        setStartTime("")
        setEndTime("")
        setInputAmount(0)
    }
    const { config, error: prepareError } = usePrepareContractWrite({
        addressOrName: chain?.id ? COFFEE_CHAT_ADDRESS[chain?.id] : "",
        contractInterface: COFFEE_CHAT,
        functionName: 'initializeChat',
        args: ["0", "0", "0", "0", "0", "ipfs://"],
        overrides: {
            value: ethers.utils.parseEther('0.01'),
        },
        onError(error) {
            console.log("map:", error)
        }
    })
    const { isLoading: writeLoading, write } = useContractWrite({

        ...config,
        onSuccess(data) {
            toast.success("Successfully initiate a chat!")
            reset()

        },
        onError(error: any) {
            toast.error(error?.data?.message ?? error?.message)
            // Mixpanel.track("publication.mirror", { result: 'write_error' })
            console.log(error)
        }
    })
    const getPlaceDetail = async () => {

        const respone = await fetch(`/api/get-place-detail?place_id=${placeId}`)
        const data = await respone.json()
        setPlaceDetail(data)
    }
    const getCoffeeChatPlaceDetail = async () => {
        const respone = await fetch(`/api/get-place-detail?place_id=${selectedCoffeeChat?.placeId}`)
        const data = await respone.json()
        setCoffeeChatDetail(data)
    }
    const getPlacePhotos = async () => {
        if (placeDetail?.photos?.length) {
            const photos = []
            for (let i = 0; i < placeDetail?.photos?.length; ++i) {
                const photo = placeDetail?.photos[i]
                const response = await fetch(`/api/get-photo?photo_reference=${photo.photo_reference}`)
                const url = URL.createObjectURL(new Blob([await response.blob()]));
                photos.push(url)
            }
            setPlacePhotos(photos)
        }
    }
    const getCoffeeChatPlacePhotos = async () => {
        if (coffeeChatDetail?.photos?.length) {
            const photos = []
            for (let i = 0; i < coffeeChatDetail?.photos?.length; ++i) {
                const photo = coffeeChatDetail?.photos[i]
                const response = await fetch(`/api/get-photo?photo_reference=${photo.photo_reference}`)
                const url = URL.createObjectURL(new Blob([await response.blob()]));
                photos.push(url)
            }
            setCoffeeChatPlacePhotos(photos)
        }
    }

    useEffect(() => {
        if (placeId) {
            getPlaceDetail()
        }
    }, [placeId])
    useEffect(() => {
        if (selectedCoffeeChat) {
            getCoffeeChatPlaceDetail()
        }
    }, [selectedCoffeeChat])
    useEffect(() => {
        if (placeDetail?.photos?.length) {
            getPlacePhotos()
        }
        else {
            setPlacePhotos([])
        }
    }, [placeDetail])
    useEffect(() => {
        if (coffeeChatDetail?.photos?.length) {
            getCoffeeChatPlacePhotos()
        }
        else {
            setCoffeeChatPlacePhotos([])
        }
    }, [coffeeChatDetail])

    const handleStake = async () => {

        if (!inputAmount) return toast.error('Input amount cannot be zero')
        if (!startTime || !endTime) return toast.error("Must fill in start time and end time")
        const amount = ethers.utils.parseEther(inputAmount.toString())
        const startTimeStamp = formatTimeStampFromTime(startTime)
        const endTimeStamp = formatTimeStampFromTime(endTime)
        const { lat, lng } = clickedPoint
        const lantitude = (lat * 10 ** 15).toString()
        const longitude = (lng * 10 ** 15).toString()

        const json = {
            name: `coffee chat`,
            description: inputDescription,
            image: ""
        }
        setIsUploading(true)
        const { path } = await uploadIpfs(json).finally(() => setIsUploading(false))

        const inputStruct = [
            placeId,
            startTimeStamp,
            endTimeStamp,
            lantitude,
            longitude,
            `ipfs://${path}`
        ]

        write?.({
            recklesslySetUnpreparedArgs: inputStruct, recklesslySetUnpreparedOverrides: {
                value: amount
            }
        })


    }
    if (!isLoaded) return <div className='h-screen w-full flex justify-center items-center'>Loading...</div>;
    return (
        <div className='relative w-full h-full'>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
            </Head>
            <OptionButton />
            <SearchModal
                open={mobileSearchOpen}
                setOpen={setMobileSearchOpen}
                setZoom={setZoom}
                clicked={clicked}
                setClicked={setClicked}
                placeId={placeId}
                setPlaceId={setPlaceId}
                setDrawerShow={setDrawerShow}
                clickedPoint={clickedPoint}
                setClickedPoint={setClickedPoint} />
            {!isMobile ?
                <div className='flex justify-between items-center p-2'>
                    <div className='text-[24px] font-bold'>☕ Coffee chat</div>
                    <div className='flex item-centers gap-2s'>
                        <PlaceAutoComplete
                            setZoom={setZoom}
                            clicked={clicked}
                            setClicked={setClicked}
                            placeId={placeId}
                            setPlaceId={setPlaceId}
                            setDrawerShow={setDrawerShow}
                            clickedPoint={clickedPoint}
                            setClickedPoint={setClickedPoint} />

                    </div>

                    <ConnectButton />
                </div> :
                <div className='flex flex-col'>
                    <div className='flex justify-between items-center p-2'
                    >
                        <div className='flex justify-between items-center gap-2'>
                            <div className='font-bold'>☕ Coffee chat</div>
                            <div className='flex justify-center items-center w-10 h-10 rounded-full hover:bg-opacity-80' onClick={() => { setMobileSearchOpen(true) }}>
                                <SearchOutlined className='text-[20px]' />
                            </div>
                        </div>

                        <ConnectButton accountStatus={{
                            smallScreen: 'avatar'
                        }} />
                    </div>
                </div>}
            <div className='flex'>
                <Modal zIndex={200} width={300} footer={null} title="Stake your chat" visible={modalOpen} onCancel={() => { setModalOpen(false) }} wrapClassName="rounded-lg">

                    <div className='flex flex-col gap-2'>
                        <div className='flex flex-col gap-1'>
                            <label>Amount</label>
                            <InputNumber min={0} style={{ width: '100%' }} value={inputAmount} onChange={(number) => {
                                setInputAmount(number)
                            }} />
                        </div>
                        <div>
                            <label>When</label>
                            <TimePicker.RangePicker showNow={true} format="HH:mm" style={{ width: '100%' }} onChange={
                                (e, date) => {
                                    setStartTime(date[0])
                                    setEndTime(date[1])
                                }
                            } />
                        </div>
                        <div>
                            <label>Description</label>
                            <Input.TextArea
                                value={inputDescription}
                                onChange={(e) => { setInputDescription(e.target.value) }}
                                placeholder="Type something that help people recognize you. e.g. College student wearing stripe T-shirt and Jordan 11."
                                autoSize={{ minRows: 3, maxRows: 5 }} />
                        </div>
                        <button className='mt-20 bg-black text-white p-2 rounded-xl flex justify-center items-end hover:bg-opacity-80' onClick={handleStake}>
                            {isUploading && <LoadingOutlined className='mr-2 text-[15px]' />} Let&apos;s go</button>

                    </div>

                </Modal>
                <Modal zIndex={201} width={300} footer={null} title="Info" visible={coffeeChatClick} onCancel={() => {
                    setCoffeeChatClick(false)
                    setSelectedCoffeeChat(undefined)
                }}
                >
                    <div className='flex flex-col gap-2'>
                        <div>👤 Initiater: <span className='font-bold'>{selectedCoffeeChat?.initializer}</span>
                        </div>
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
                <Map
                    zoom={zoom}
                    latitude={geolocation.latitude}
                    longtitude={geolocation.longitude}
                    clicked={clicked}
                    setClicked={setClicked}
                    placeId={placeId}
                    setPlaceId={setPlaceId}
                    setDrawerShow={setDrawerShow}
                    clickedPoint={clickedPoint}
                    setClickedPoint={setClickedPoint}
                    coffeeChats={coffeeChats}
                    setCoffeeChatClick={setCoffeeChatClick}
                    setSelectedCoffeeChat={setSelectedCoffeeChat}
                />
                <Drawer zIndex={100} title="Detail" placement={isMobile ? "bottom" : "right"} onClose={() => {
                    setDrawerShow(false)
                    setPlacePhotos([])
                }} visible={drawerShow}
                    height={600}
                >
                    <div className='flex flex-col justify-between h-full'>
                        <div className='flex flex-col gap-2'>
                            <div className='flex gap-2 items-center'>
                                <img src={placeDetail?.icon} className='w-5 h-5' />
                                <div>{placeDetail?.name}</div>

                                {placeDetail?.open_now ? <div className='text-green-600'>Open</div> : <div className='text-red-600'>Closed</div>}

                            </div>

                            <Rate allowHalf value={placeDetail?.rating} />
                            <div className='flex gap-4 items-center'>
                                <div>
                                    <EnvironmentOutlined className='w-5 h-5' />
                                </div>
                                <div>{placeDetail?.formatted_address}</div>
                            </div>
                            <div className='flex gap-4 items-center'>
                                <div>
                                    <PhoneOutlined className='w-5 h-5' />
                                </div>
                                <div>{placeDetail?.phone_number}</div>
                            </div>
                            <div className='flex gap-2 items-center flex-wrap'>
                                <div> <TagOutlined className='w-5 h-5' /> </div>
                                {placeDetail?.types?.map((type, index) => (
                                    <div key={index} className='py-1 px-2 text-gray-500 bg-black bg-opacity-10 rounded-xl'>{type}</div>
                                ))}
                            </div>


                            <div className='flex overflow-scroll gap-2 '>
                                {placePhotos.map((photo, index) => (
                                    <img key={index} src={photo} className='w-2/5 rounded-lg' />
                                ))}

                            </div>
                        </div>

                        <button className='flex justify-center items-center rounded-2xl bg-black text-white p-3 hover:bg-opacity-80' onClick={() => { setModalOpen(true) }} >
                            <CoffeeOutlined className='text-[20px] mr-2' /> Coffee chat</button>
                    </div>
                </Drawer>
            </div>
        </div>
    )
}
type MapProps = {
    zoom: number;
    latitude: number;
    longtitude: number;
    clicked: boolean;
    setClicked: Dispatch<boolean>;
    placeId: string;
    setPlaceId: Dispatch<string>;
    setDrawerShow: Dispatch<boolean>;
    clickedPoint: {
        lat: number;
        lng: number;
    }
    setClickedPoint: Dispatch<{
        lat: number;
        lng: number;
    }>
    coffeeChats: CoffeeChat[]
    setCoffeeChatClick: Dispatch<boolean>;
    setSelectedCoffeeChat: Dispatch<CoffeeChat>;

}

const Map: FC<MapProps> = ({
    zoom,
    latitude,
    longtitude,
    clicked,
    setClicked,
    placeId,
    setPlaceId,
    setDrawerShow,
    clickedPoint,
    setClickedPoint,
    coffeeChats,
    setCoffeeChatClick,
    setSelectedCoffeeChat
}) => {
    const isMobile = useMediaQuery({
        query: '(max-width: 475px)'
    })
    const center = useMemo(() => {
        if (clicked) {
            return {
                lat: clickedPoint.lat,
                lng: clickedPoint.lng
            }
        }
        else {
            return { lat: latitude, lng: longtitude }
        }
    }, [latitude, longtitude, clicked, clickedPoint]);
    const [mapRef, setMapRef] = useState<google.maps.Map>();
    const [open, setOpen] = useState(false)

    const handleMapClick = (e: google.maps.MapMouseEvent) => {
        // console.log('data: ', e)
        // console.log(e.latLng?.lat())
        const lat = e.latLng?.lat() || 0;
        const lng = e.latLng?.lng() || 0;
        //@ts-ignore
        if (e.placeId) {
            //@ts-ignore
            //@ts-ignore
            setPlaceId(e?.placeId)
            setDrawerShow(true)
        }

        setClicked(true)
        setClickedPoint({
            lat,
            lng
        })
    }
    useEffect(() => {
        mapRef?.panTo(center)
    }, [center])


    return (
        <GoogleMap onLoad={map => setMapRef(map)} zoom={zoom} center={center} mapContainerClassName="w-full h-[calc(var(--vh)*100-56px)]" onClick={handleMapClick} >
            <Marker position={center} />
            {clicked && <Marker position={clickedPoint} />}
            {coffeeChats.length && coffeeChats.map((coffeeChat, index) => (
                <Marker
                    key={`coffee-chat-${index}`}
                    position={{
                        lat: coffeeChat.lantitude / 10 ** 15,
                        lng: coffeeChat.longtitude / 10 ** 15
                    }}
                    icon={{
                        path:
                            "M80,56V24a8,8,0,0,1,16,0V56a8,8,0,0,1-16,0Zm40,8a8,8,0,0,0,8-8V24a8,8,0,0,0-16,0V56A8,8,0,0,0,120,64Zm32,0a8,8,0,0,0,8-8V24a8,8,0,0,0-16,0V56A8,8,0,0,0,152,64Zm96,56v8a40,40,0,0,1-37.5,39.9,98,98,0,0,1-27,40.1H208a8,8,0,0,1,0,16H32a8,8,0,0,1,0-16H56.5A96.4,96.4,0,0,1,24,136V88a8,8,0,0,1,8-8H208A40,40,0,0,1,248,120Zm-16,0a24,24,0,0,0-16-22.6V136a92.9,92.9,0,0,1-1.2,15A24,24,0,0,0,232,128Z",
                        fillColor: "#6f4e37",
                        fillOpacity: 1,
                        scale: 0.15,
                        strokeColor: "black",
                        strokeWeight: 2,
                    }}
                    onClick={() => {
                        setCoffeeChatClick(true)
                        setSelectedCoffeeChat(coffeeChat)
                    }}
                    onMouseDown={
                        () => {
                            setCoffeeChatClick(true)
                            setSelectedCoffeeChat(coffeeChat)
                        }
                    }
                />

            ))}

        </GoogleMap>
    );
}


const PlacesAutocomplete = () => {
    const {
        ready,
        value,
        setValue,
        suggestions: { status, data },
        clearSuggestions,
    } = usePlacesAutocomplete();

    const handleSelect = async (address: string) => {
        setValue(address, false);
        clearSuggestions();

        //   const results = await getGeocode({ address });
        //   const { lat, lng } = await getLatLng(results[0]);
        //   setSelected({ lat, lng });
    };

    return (
        <Combobox onSelect={handleSelect}>
            <ComboboxInput
                value={value}
                onChange={(e) => setValue(e.target.value)}
                disabled={!ready}
                className='bg-transparent p-2 focus:outline-none w-[300px]'
                placeholder="Search an place..."
            />
            <ComboboxPopover>
                <ComboboxList>
                    {status === "OK" &&
                        data.map(({ place_id, description }) => (
                            <ComboboxOption key={place_id} value={description} />
                        ))}
                </ComboboxList>
            </ComboboxPopover>
        </Combobox>
    );
};

export default Home