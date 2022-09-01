// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { GOOGLE_API_KEY } from 'constant'
import type { NextApiRequest, NextApiResponse } from 'next'
type PlacePhoto = {
    height: number
    html_attributions: string[]
    photo_reference: string
    width: number
}
type Data = {
    name: string
    rating: number
    phone_number: string
    open_now: boolean
    open_hours: any[]
    photos: PlacePhoto[]
    types: string[]
    formatted_address: string
    icon: string
}


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { place_id } = req.query
    const URL = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&fields=name%2Cphotos%2Ctypes%2Copening_hours%2Cvicinity%2Crating%2Cformatted_phone_number%2Cformatted_address%2Cicon&key=${GOOGLE_API_KEY}`
    const raw = await fetch(URL)
    const response = await raw.json()
    const result = response.result
    res.status(200).json({
        name: result?.name,
        rating: result?.rating,
        phone_number: result?.formatted_phone_number,
        open_now: result?.opening_hours?.open_now,
        open_hours: result?.opening_hours?.periods,
        photos: result?.photos,
        types: result?.types,
        formatted_address: result?.formatted_address,
        icon: result?.icon

    })
}
