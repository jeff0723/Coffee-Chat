import { Modal } from 'antd'
import Qrscan from 'components/QrcodeScanner';
import { COFFEE_CHAT_QUERY_ALL } from 'graphql/get-coffee-chat-query';
import React, { Dispatch, useState } from 'react'
import { useMediaQuery } from 'react-responsive';
import { useQuery } from '@apollo/client';
import { CoffeeChat } from 'generated/types';
import UnratedChatList from 'components/CoffeeChat/UnratedChatList';

type Props = {
    open: boolean;
    toggle: Dispatch<boolean>
}


const RatingModal = ({ open, toggle }: Props) => {

    const [unratedChatList, setUnratedChatList] = useState<CoffeeChat[]>([])

    // TODO: query using COFFEE_CHAT_QUERY_FILTER_BY_REDEEMER_UNRATED after deploy new subgraph
    const { data, loading, error } = useQuery(COFFEE_CHAT_QUERY_ALL, {
        onCompleted: (data) => {
            console.log(data.coffeeChats)
            setUnratedChatList(data.coffeeChats)
        },
        onError: (error) => {
            console.log(error)
        }
    })

    return (
        <Modal visible={open} onCancel={() => toggle(open)} footer={null}>
            <div className='flex flex-col gap-2'>
                <div className='text-xl font-bold'>Unrated CoffeeChat</div>
                <UnratedChatList coffeeChatList={unratedChatList} />
            </div>
        </Modal>
    )
}

export default RatingModal