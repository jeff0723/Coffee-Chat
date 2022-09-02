import { EnvironmentOutlined, PhoneOutlined, TagOutlined, CoffeeOutlined } from '@ant-design/icons';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { Button, Drawer, InputNumber, Modal, Rate, TimePicker } from 'antd';
import { COFFEE_CHAT } from 'constant/abi';
import { COFFEE_CHAT_ADDRESS } from 'constant/address';
import { ethers } from 'ethers';
import { Dispatch, FC, useEffect, useMemo, useState } from 'react';
import useGeolocation from 'react-hook-geolocation';
import toast from 'react-hot-toast';
import { useContractWrite, useNetwork } from 'wagmi';
import { AutoComplete, Input } from 'antd';
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";

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
const Home: FC = (props: Props) => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: GOOGLE_API_KEY,
        libraries: ["places", 'geometry'],
    });
    const { chain, chains } = useNetwork()

    const geolocation = useGeolocation();
    const [clicked, setClicked] = useState(false)
    const [placeId, setPlaceId] = useState("")
    const [drawerShow, setDrawerShow] = useState(false)
    const [placeDetail, setPlaceDetail] = useState<PlaceDetail>()
    const [placePhotos, setPlacePhotos] = useState<string[]>([])
    const [modalOpen, setModalOpen] = useState(false)
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [inputAmount, setInputAmount] = useState(0)
    const [zoom, setZoom] = useState(10)
    const [clickedPoint, setClickedPoint] = useState({
        lat: 0,
        lng: 0
    })
    const { isLoading: writeLoading, write } = useContractWrite({
        addressOrName: chain?.id ? COFFEE_CHAT_ADDRESS[chain?.id] : "",
        contractInterface: COFFEE_CHAT,
        functionName: 'intializeChat',
        mode: 'recklesslyUnprepared',
        onSuccess(data) {
            console.log(data)
            toast.success("Successfully initiate a chat!")
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
        console.log(data)
        setPlaceDetail(data)
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
    useEffect(() => {
        if (placeId) {
            getPlaceDetail()
        }
    }, [placeId])
    useEffect(() => {
        if (placeDetail?.photos?.length) {
            getPlacePhotos()
        }
        else {
            setPlacePhotos([])
        }
    }, [placeDetail])

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
        <div>
            <div className='flex justify-between items-center p-2'>
                <div className='text-[24px] font-bold'>☕ Coffee chat</div>
                <PlaceAutoComplete
                    setZoom={setZoom}
                    clicked={clicked}
                    setClicked={setClicked}
                    placeId={placeId}
                    setPlaceId={setPlaceId}
                    setDrawerShow={setDrawerShow}
                    clickedPoint={clickedPoint}
                    setClickedPoint={setClickedPoint} />
                <ConnectButton />
            </div>
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
                        <Button className='mt-20' onClick={handleStake}>Let's go</Button>

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
                    setClickedPoint={setClickedPoint} />
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
                                {placeDetail?.types?.map((type) => (
                                    <div className='py-1 px-2 text-gray-500 bg-black bg-opacity-10 rounded-xl'>{type}</div>
                                ))}
                            </div>


                            <div className='flex overflow-scroll gap-2 '>
                                {placePhotos.map((photo) => (
                                    <img src={photo} className='w-2/5 rounded-lg' />
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
}


const Map: FC<MapProps> = ({ zoom, latitude, longtitude, clicked, setClicked, placeId, setPlaceId, setDrawerShow, clickedPoint, setClickedPoint }) => {
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
    return (
        <GoogleMap onLoad={map => setMapRef(map)} zoom={zoom} center={center} mapContainerClassName="w-full h-[95vh]" onClick={handleMapClick}
            onCenterChanged={
                () => {
                    mapRef?.panTo(center)
                }
            } >
            <Marker position={center} />
            {clicked && <Marker position={clickedPoint} />}
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
            options={options}
            onSelect={onSelect}
            onSearch={onSearch}
            placeholder="Search a place..."
            disabled={!ready}
            className='w-[300px] border-none'
            dropdownClassName='w-[500px]'

        />)
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