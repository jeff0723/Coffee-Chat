import React, { Dispatch } from 'react'
import { Button, Drawer, Rate, Modal, InputNumber, TimePicker } from 'antd';

type Props = {
    open: boolean;
    setOpen: Dispatch<boolean>
}

const StakeModal = ({ open, setOpen }: Props) => {
    return (
        <Modal zIndex={200} width={300} footer={null} title="Stake your chat" visible={open} onCancel={() => { setOpen(false) }} wrapClassName="rounded-lg">

            <div className='flex flex-col gap-2'>
                <div className='flex flex-col gap-1'>
                    <label>Amount</label>
                    <InputNumber min={0} style={{ width: '100%' }} />
                </div>
                <div>
                    <label>When</label>
                    <TimePicker.RangePicker showNow={true} format="HH:mm" style={{ width: '100%' }} />
                </div>
                <Button className='mt-20'>Let's go</Button>

            </div>

        </Modal>
    )
}

export default StakeModal