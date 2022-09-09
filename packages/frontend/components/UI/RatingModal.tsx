import { Modal } from 'antd'
import Qrscan from 'components/QrcodeScanner';
import { COFFEE_CHAT_QUERY_FILTER_BY_REDEEMER_UNRATED } from 'graphql/get-coffee-chat-query';
import React, { Dispatch, useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive';
import { useLazyQuery, useQuery } from '@apollo/client';
import { CoffeeChat } from 'generated/types';
import UnratedChatList from 'components/CoffeeChat/UnratedChatList';
import { useAccount } from 'wagmi';

type Props = {
    open: boolean;
    toggle: Dispatch<boolean>
}


const RatingModal = ({ open, toggle }: Props) => {

    const [unratedChatList, setUnratedChatList] = useState<CoffeeChat[]>([])
    const { address } = useAccount()
    // TODO: query using COFFEE_CHAT_QUERY_FILTER_BY_REDEEMER_UNRATED after deploy new subgraph
    const [fetchRate, { data: rateData, loading: fetchRateLoading }] = useLazyQuery(COFFEE_CHAT_QUERY_FILTER_BY_REDEEMER_UNRATED, {
        variables: {
            redeemer: address
        },
        onCompleted: (data) => {
            setUnratedChatList(data.coffeeChats)
        },
        onError: (error) => {
            console.log(error)
        }
    }
    )

    useEffect(() => {
        fetchRate()
        const id = setInterval(() => fetchRate(), 15000);
        return (() => {
            clearInterval(id)
        })
    }, [])

    return (
        <Modal visible={open} onCancel={() => toggle(open)} footer={null} zIndex={10}>
            <div className='flex flex-col gap-2'>
                <div className='text-xl font-bold'>Rate Your Experience</div>
                <UnratedChatList coffeeChatList={unratedChatList} />
            </div>
        </Modal>
    )
}

export default RatingModal