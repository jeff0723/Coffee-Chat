import { Modal } from 'antd'
import Qrscan from 'components/QrcodeScanner';
import React, { Dispatch } from 'react'

type Props = {
    open: boolean;
    toggle: Dispatch<boolean>
}

const ScanQrcodeModal = ({ open, toggle }: Props) => {
    return (
        <Modal visible={open} onCancel={() => toggle(open)} footer={null} bodyStyle={{ height: 400 }}>
            <Qrscan />
        </Modal>
    )
}

export default ScanQrcodeModal