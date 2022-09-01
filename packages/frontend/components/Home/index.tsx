import { EnvironmentOutlined, PhoneOutlined, TagOutlined } from '@ant-design/icons';
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { Button, Drawer, Rate, Modal, InputNumber, TimePicker } from 'antd';
import { Dispatch, FC, useEffect, useMemo, useState } from 'react';
import useGeolocation from 'react-hook-geolocation';
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
const Home: FC = (props: Props) => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: GOOGLE_API_KEY,
    });
    const geolocation = useGeolocation();
    const [clicked, setClicked] = useState(false)
    const [placeId, setPlaceId] = useState("")
    const [drawerShow, setDrawerShow] = useState(false)
    const [placeDetail, setPlaceDetail] = useState<PlaceDetail>()
    const [placePhotos, setPlacePhotos] = useState<string[]>([])
    const [modalOpen, setModalOpen] = useState(false)
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
        if (placeDetail?.photos.length) {
            getPlacePhotos()
        }
        else {
            setPlacePhotos([])
        }
    }, [placeDetail])
    if (!isLoaded) return <div className='h-screen w-full flex justify-center items-center'>Loading...</div>;
    console.log(placePhotos)

    return (
        <div className='flex'>
            <Modal zIndex={200} width={300} footer={null} title="Stake your chat" visible={modalOpen} onCancel={() => { setModalOpen(false) }} wrapClassName="rounded-lg">

                <div className='flex flex-col gap-2'>
                    <div className='flex flex-col gap-1'>
                        <label>Amount</label>
                        <InputNumber min={0} style={{ width: '100%' }} />
                    </div>
                    <div>
                        <label>When</label>
                        <TimePicker.RangePicker showNow={true} format="HH:mm" style={{ width: '100%' }} />
                    </div>
                    <Button className='mt-20'>Let's go</Button>

                </div>

            </Modal>
            <Map
                latitude={geolocation.latitude}
                longtitude={geolocation.longitude}
                clicked={clicked}
                setClicked={setClicked}
                placeId={placeId}
                setPlaceId={setPlaceId}
                setDrawerShow={setDrawerShow} />
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
    )
}
type MapProps = {
    latitude: number;
    longtitude: number;
    clicked: boolean;
    setClicked: Dispatch<boolean>;
    placeId: string;
    setPlaceId: Dispatch<string>;
    setDrawerShow: Dispatch<boolean>;
}

const Map: FC<MapProps> = ({ latitude, longtitude, clicked, setClicked, placeId, setPlaceId, setDrawerShow }) => {
    const center = useMemo(() => ({ lat: latitude, lng: longtitude }), []);
    const [clickedPoint, setClickedPoint] = useState({
        lat: 0,
        lng: 0
    })
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
    console.log(clickedPoint)
    return (
        <GoogleMap zoom={10} center={center} mapContainerClassName="w-full h-screen" onClick={handleMapClick}>
            <Marker position={center} />
            {clicked && <Marker position={clickedPoint} />}
        </GoogleMap>
    );
}
export default Home