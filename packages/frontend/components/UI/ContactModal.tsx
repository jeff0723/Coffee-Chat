import Modal from 'antd/lib/modal/Modal'
import React, { Dispatch } from 'react'
import MyModal from './CustomizeModal'

type Props = {
    open: boolean
    setOpen: Dispatch<boolean>
}

const ContactModal = ({ open, setOpen }: Props) => {
    return (
        <Modal open={open} onCancel={() => setOpen(false)} zIndex={10} footer={null}>
            <div>
                Contact: <a href="jeffreylin0723@gmail.com">jeffreylin0723@gmail.com</a>
            </div>
        </Modal>
    )
}

export default ContactModal