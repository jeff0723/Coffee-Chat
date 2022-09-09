import { useLazyQuery, useQuery } from '@apollo/client'
import { Modal } from 'antd'
import React, { Dispatch, useEffect, useState } from 'react'
import { useAccount, useNetwork } from 'wagmi'
import { COFFEE_CHAT_QUERY_FILTERED_BY_ADDRESS } from 'graphql/get-coffee-chat-query';
import { CoffeeChat } from 'generated/types';
import CoffeeChatItem from './CoffeeChatItem';
import { Tabs } from 'antd';
import ActiveChatList from 'components/CoffeeChat/ActiveChatList';
import PastChatList from 'components/CoffeeChat/PastChatList';
import { useContractEvent } from 'wagmi'
import { COFFEE_CHAT } from 'constant/abi';
import { COFFEE_CHAT_ADDRESS } from 'constant/address';


type Props = {
    open: boolean
    toggle: Dispatch<boolean>
}

const CoffeeChatList = ({ open, toggle }: Props) => {
    const { address } = useAccount()

    const [activeCoffeeChatList, setActiveCoffeeChatList] = useState<CoffeeChat[]>([])
    const [pastCoffeeChatList, setPastCoffeeChatList] = useState<CoffeeChat[]>([])
    const { chain } = useNetwork()
    const [fetchCoffeeChat, { data: coffeeChatData, loading: fetchCoffeeChatLoading }] = useLazyQuery(COFFEE_CHAT_QUERY_FILTERED_BY_ADDRESS, {
        variables: {
            initiater: address
        },
        onCompleted: (data) => {

            const activeChatList = data.coffeeChats.filter((coffeeChat: CoffeeChat) => (+coffeeChat.endTime) * 1000 > new Date().valueOf() && coffeeChat.isActive)
            const pastChatList = data.coffeeChats.filter((coffeeChat: CoffeeChat) => (+coffeeChat.endTime) * 1000 < new Date().valueOf() || !coffeeChat.isActive)

            setActiveCoffeeChatList(activeChatList)
            setPastCoffeeChatList(pastChatList)

        },
        onError: (error) => {
            console.log(error)
        }
    }
    )
    useEffect(() => {
        fetchCoffeeChat()
        const id = setInterval(() => fetchCoffeeChat(), 15000);
        return (() => {
            clearInterval(id)
        })
    }, [])



    return (
        <Modal visible={open} onCancel={() => toggle(open)} footer={null}  >
            <div className='flex flex-col gap-2'>
                <div className='text-xl font-bold'>Your CoffeeChat</div>
                <Tabs defaultActiveKey="1" type="card">
                    <Tabs.TabPane tab="Active chat" key="1">
                        <ActiveChatList coffeeChatList={activeCoffeeChatList} />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Past chat" key="2">
                        <PastChatList coffeeChatList={pastCoffeeChatList} />
                    </Tabs.TabPane>
                </Tabs>
            </div>
        </Modal>
    )
}

export default CoffeeChatList