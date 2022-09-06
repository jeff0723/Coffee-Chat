import { useQuery } from '@apollo/client'
import { Modal } from 'antd'
import React, { Dispatch, useState } from 'react'
import { useAccount } from 'wagmi'
import { COFFEE_CHAT_QUERY_FILTERED_BY_ADDRESS } from 'graphql/get-coffee-chat-query';
import { CoffeeChat } from 'generated/types';
import CoffeeChatItem from './CoffeeChatItem';
import { Tabs } from 'antd';


type Props = {
    open: boolean
    toggle: Dispatch<boolean>
}

const CoffeeChatList = ({ open, toggle }: Props) => {
    const { address } = useAccount()
    const [coffeeChatList, setCoffeeChatList] = useState<CoffeeChat[]>()
    const { data, loading, error } = useQuery(COFFEE_CHAT_QUERY_FILTERED_BY_ADDRESS, {
        variables: {
            initiater: address
        },
        skip: !address,
        onCompleted: (data) => {
            setCoffeeChatList(data.coffeeChats)
        },
        onError: (error) => {
            console.log(error)
        }
    }
    )
    return (
        <Modal visible={open} onCancel={() => toggle(open)} footer={null}  >
            <div className='flex flex-col gap-2'>
                <div className='text-xl font-bold'>Your CoffeeChat</div>
                <Tabs defaultActiveKey="1" type="card">
                    <Tabs.TabPane tab="Active chat" key="1">
                        <div className='flex flex-wrap gap-2 justify-center'>
                            {coffeeChatList?.map((coffeeChat, index) => (
                                <CoffeeChatItem key={`coffeechat-${index}`} info={coffeeChat} />
                            ))}
                        </div>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Past chat" key="2">
                        hi
                    </Tabs.TabPane>
                </Tabs>
            </div>
        </Modal>
    )
}

export default CoffeeChatList