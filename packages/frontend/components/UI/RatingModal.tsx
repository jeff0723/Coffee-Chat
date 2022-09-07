import { Modal } from 'antd'
import Qrscan from 'components/QrcodeScanner';
import React, { Dispatch } from 'react'
import { useMediaQuery } from 'react-responsive';

type Props = {
    open: boolean;
    toggle: Dispatch<boolean>
}


const RatingModal = ({ open, toggle }: Props) => {

    return (
        <Modal visible={open} onCancel={() => toggle(open)} footer={null}>

        </Modal>
    )
}

export default RatingModal