
import React, { useState } from 'react'
import { QrReader } from 'react-qr-reader';


type Props = {}

const QRcode = (props: Props) => {
    const [data, setData] = useState('No result');

    return (
        <>
            <QrReader
                constraints={{ facingMode: 'user' }}
                onResult={(result, error) => {
                    if (!!result) {
                        setData(result.getText())
                    }

                    if (!!error) {
                        console.info(error);
                    }
                }}
                videoStyle={{ outerHeight: '100%' }}
            />
            <p>{data}</p>
        </>
    );
};

export default QRcode