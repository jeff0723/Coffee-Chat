import "@reach/combobox/styles.css";
import { AutoComplete } from 'antd';
import { Dispatch, FC } from 'react';
import {
    Combobox,
    ComboboxInput, ComboboxList,
    ComboboxOption, ComboboxPopover
} from "@reach/combobox";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng
} from "use-places-autocomplete";
import { useAccount } from "wagmi";
import { event } from "nextjs-google-analytics";


type AutoCompleteProps = {
    setOpen: Dispatch<boolean>
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
const PlaceAutoCompleteMobile: FC<AutoCompleteProps> = ({ setOpen, setZoom, clicked, setClicked, placeId, setPlaceId, setDrawerShow, clickedPoint, setClickedPoint }) => {
    const { address: account } = useAccount()

    const {
        ready,
        value,
        setValue,
        suggestions: { status, data },
        clearSuggestions,
    } = usePlacesAutocomplete();



    const onSelect = async (address: string) => {
        clearSuggestions();
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
        setValue("")
        setOpen(false)
        event("select_place", {
            category: 'Action',
            label: account
        })
    }

    return (

        <Combobox onSelect={onSelect}>
            <input
                value={value}
                onChange={(e) => {
                    event("type_in_search_place", {
                        category: 'Action',
                        label: account
                    })
                    setValue(e.target.value)
                }}
                disabled={!ready}
                className='bg-transparent focus:outline-none w-full text-[16px]'
                placeholder="Search an place..."
            />
            <ComboboxList>
                {status === "OK" &&
                    data.map(({ place_id, description }) => (
                        <ComboboxOption key={place_id} value={description} />
                    ))}
            </ComboboxList>
        </Combobox>
    );
};
export default PlaceAutoCompleteMobile