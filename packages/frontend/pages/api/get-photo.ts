// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { GOOGLE_API_KEY } from 'constant'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    image_blob: Blob
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { photo_reference } = req.query
    const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photo_reference}&key=${GOOGLE_API_KEY}`
    const raw = await fetch(url)
    const blob = await raw.blob()
    const resBufferArray = await blob.arrayBuffer();
    const resBuffer = Buffer.from(resBufferArray);
    res.setHeader('Content-Type', blob.type)
    res.write(resBuffer, 'binary');
    res.end()
}
