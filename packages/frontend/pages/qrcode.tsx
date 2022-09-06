
import Qrscan from 'components/QrcodeScanner';
import React, { useState } from 'react'


type Props = {}

const QRcode = (props: Props) => {
    const [data, setData] = useState('No result');

    return (
        <>
            <Qrscan />
        </>
    );
};

export default QRcode