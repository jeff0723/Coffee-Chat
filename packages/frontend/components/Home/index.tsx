import { CoffeeOutlined, EnvironmentOutlined, PhoneOutlined, TagOutlined } from '@ant-design/icons';
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
    const today = new Date().toJSON().slice(0, 10).replace(/-/g, '/')
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

    const { data, loading, error } = useQuery(COFFEE_CHAT_QUERY_FILTERED_BY_POINT, {
        variables: {
            lantitude1: ((geolocation.latitude - 1) * 10 ** 15).toString(),
            lantitude2: ((geolocation.latitude + 1) * 10 ** 15).toString(),
            longtitude1: ((geolocation.longitude - 1) * 10 ** 15).toString(),
            longtitude2: ((geolocation.longitude + 1) * 10 ** 15).toString()

        },
        skip: !geolocation,
        onCompleted: (data) => {
            console.log(data)
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
    const [zoom, setZoom] = useState(12)
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
    const { isLoading: writeLoading, write } = useContractWrite({
        addressOrName: chain?.id ? COFFEE_CHAT_ADDRESS[chain?.id] : "",
        contractInterface: COFFEE_CHAT,
        functionName: 'initializeChat',
        mode: 'recklesslyUnprepared',
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
        console.log(chain?.id)
        const inputStruct = [
            placeId,
            startTimeStamp,
            endTimeStamp,
            lantitude,
            longitude
        ]

        await write?.({
            recklesslySetUnpreparedArgs: inputStruct, recklesslySetUnpreparedOverrides: {
                value: amount
            }
        })


    }
    if (!isLoaded) return <div className='h-screen w-full flex justify-center items-center'>Loading...</div>;
    return (
        <div className='relative'>

            <OptionButton />

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
                        <div className='font-bold'>☕ Coffee chat</div>
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
                        <Button className='mt-20' onClick={handleStake}>Let&apos; go</Button>

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
                            ⏰ Time Left: <Countdown date={Date.now() + 10000} className='font-bold' />
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
                <Drawer zIndex={100} title="Detail" placement="right" onClose={() => {
                    setDrawerShow(false)
                    setPlacePhotos([])
                }} visible={drawerShow}>
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

                        <Button className='rounded-2xl' onClick={() => { setModalOpen(true) }}>Coffee chat</Button>
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
            console.log(e?.placeId)
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
        <GoogleMap onLoad={map => setMapRef(map)} zoom={zoom} center={center} mapContainerClassName="w-full h-[95vh] sm:h-[85vh]" onClick={handleMapClick} >
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
                        console.log("coffeeChatClick")
                        setCoffeeChatClick(true)
                        setSelectedCoffeeChat(coffeeChat)
                    }}
                    onMouseDown={
                        () => {
                            console.log("coffeeChatClick")
                            setCoffeeChatClick(true)
                            setSelectedCoffeeChat(coffeeChat)
                        }
                    }
                />

            ))}

        </GoogleMap>
    );
}

type AutoCompleteProps = {
    setZoom: Dispatch<number>
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

}
const StyledInput = styled(Input)`
    border: none; 
    background: none;
    &:hover {
        border: none;
      }
    
`
const PlaceAutoComplete: FC<AutoCompleteProps> = ({ setZoom, clicked, setClicked, placeId, setPlaceId, setDrawerShow, clickedPoint, setClickedPoint }) => {
    const {
        ready,
        value,
        setValue,
        suggestions: { status, data },
        clearSuggestions,
    } = usePlacesAutocomplete();

    const onSearch = (value: string) => {
        setValue(value)
    }
    const onSelect = async (address: string) => {
        const results = await getGeocode({ address });
        const { lat, lng } = await getLatLng(results[0]);
        const place_id = results[0].place_id
        // if (data.place_id) {
        setPlaceId(place_id)
        setDrawerShow(true)
        // }

        setClicked(true)
        setClickedPoint({
            lat,
            lng
        })
        setZoom(15)
    }

    const options = data.map(({ description }) => {
        return {
            value: description,
            label: <div>{description}</div>
        }
    })

    return (
        <AutoComplete
            allowClear={true}
            options={options}
            onSelect={onSelect}
            onSearch={onSearch}
            disabled={!ready}
            dropdownMatchSelectWidth={500}
            style={{ width: 300 }}
            placeholder='Search a place...'
        />
    )
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