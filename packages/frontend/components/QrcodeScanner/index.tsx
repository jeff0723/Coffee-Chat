import React, { useState } from 'react';
import dynamic from "next/dynamic";
const QrReader = dynamic(() => import('react-qr-reader'), { ssr: false })


const Qrscan = () => {

    const [result, setResult] = useState('No result');

    const handleError = (err: string) => {
        console.error(err)
    }

    const handleScan = (result: string | null) => {
        if (result) {
            setResult(result)
        }
    }

    const previewStyle = {
        height: 240,
        width: 320,
    }

    return (
        <div >
            <QrReader
                delay={500}
                style={previewStyle}
                onError={handleError}
                onScan={handleScan}
            />

        </div>
    );
}

export default Qrscan;