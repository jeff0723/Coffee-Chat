import { useQuery } from '@apollo/client'
import { CoffeeChat } from 'generated/types'
import { COFFEE_CHAT_QUERY_FILTERED_BY_ADDRESS } from 'graphql/get-coffee-chat-query'
import { useState } from 'react'
import { useAccount } from 'wagmi'
import PastChatItem from './PastChatItem'


type Props = {
    coffeeChatList: CoffeeChat[]
}

const PastChatList = ({ coffeeChatList }: Props) => {

    return (
        <div className='flex flex-wrap gap-2 justify-center'>
            {coffeeChatList?.map((coffeeChat, index) => (
                <PastChatItem key={`past-coffeechat-${index}`} info={coffeeChat} />
            ))}
        </div>
    )
}

export default PastChatList