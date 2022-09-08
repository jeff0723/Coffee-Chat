import "@reach/combobox/styles.css";
import { AutoComplete } from 'antd';
import { event } from "nextjs-google-analytics";
import { Dispatch, FC } from 'react';

import usePlacesAutocomplete, {
    getGeocode,
    getLatLng
} from "use-places-autocomplete";
import { useAccount } from "wagmi";


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
    const { address: account } = useAccount()
    const {
        ready,
        value,
        setValue,
        suggestions: { status, data },
        clearSuggestions,
    } = usePlacesAutocomplete();

    const onSearch = (value: string) => {
        setValue(value)
        event("type_in_search_place", {
            category: 'Action',
            label: account
        })
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
        event("select_place", {
            category: 'Action',
            label: account
        })
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
export default PlaceAutoComplete