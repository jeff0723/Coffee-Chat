import React, { useState } from 'react'
import Html5QrcodePlugin from 'components/QrcodeScanner'
type Props = {}

const QRcode = (props: Props) => {
    const [qrCode, setQrCode] = useState('')
    const handleScan = (data: string) => {
        console.log(data)
    }
    return (
        <div>
            <Html5QrcodePlugin
                fps={10}
                qrbox={250}
                disableFlip={false}
                qrCodeSuccessCallback={handleScan} />
        </div>
    )
}

export default QRcode