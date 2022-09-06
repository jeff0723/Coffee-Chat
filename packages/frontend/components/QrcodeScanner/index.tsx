import React, { useState } from 'react';
import QrReader from 'react-qr-reader';

import styles from './Qrscan.module.css';

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
            <div>{result}</div>
        </div>
    );
}

export default Qrscan;