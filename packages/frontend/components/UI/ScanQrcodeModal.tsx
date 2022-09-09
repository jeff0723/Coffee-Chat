import { Modal } from 'antd'
import Qrscan from 'components/QrcodeScanner';
import React, { Dispatch } from 'react'
import { useMediaQuery } from 'react-responsive';

type Props = {
    open: boolean;
    toggle: Dispatch<boolean>
}



const ScanQrcodeModal = ({ open, toggle }: Props) => {
    return (
        <Modal visible={open} title="Scan" onCancel={() => toggle(open)} footer={null} bodyStyle={{ height: 700 }}>
            <Qrscan toggle={toggle} open={open} />
        </Modal>
    )
}

export default ScanQrcodeModal