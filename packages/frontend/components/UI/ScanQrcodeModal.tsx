import { Modal } from 'antd'
import Qrscan from 'components/QrcodeScanner';
import React, { Dispatch, useState } from 'react'
import QrScanner from 'components/QrcodeScanner/Scanner'
if (typeof window !== 'undefined') {
    var QrReader = require('react-qr-reader')
}
// import QrReader from 'react-qr-reader'

type Props = {
    open: boolean;
    toggle: Dispatch<boolean>
}

const previewStyle = {
    height: 320,
    width: 320,
}

const ScanQrcodeModal = ({ open, toggle }: Props) => {
    const [data, setData] = useState();
    
    const handleScan = (data: any) => {
        setData(data);
    }
    
    const handleError = (err: any) => {
        console.log(err);
    }
    
    console.log(data);

    return (
        <Modal visible={open} onCancel={() => toggle(open)} footer={null} bodyStyle={{ height: 400 }}>
            <QrReader
                onScan={handleScan}
                onError={handleError}
                style={previewStyle}
            />
        </Modal>
    )
}

export default ScanQrcodeModal