import { Modal } from 'antd'
import Qrscan from 'components/QrcodeScanner';
import React, { Dispatch } from 'react'
import { useMediaQuery } from 'react-responsive';

type Props = {
    open: boolean;
    toggle: Dispatch<boolean>
}

const ScanQrcodeModal = ({ open, toggle }: Props) => {
    const isMobile = useMediaQuery({
        query: '(max-width: 475px)'
    })
    return (
        <Modal visible={open} onCancel={() => toggle(open)} footer={null} bodyStyle={{ height: isMobile ? 700 : 400 }}>
            <Qrscan />
            {/* <QrScanner /> */}
        </Modal>
    )
}

export default ScanQrcodeModal