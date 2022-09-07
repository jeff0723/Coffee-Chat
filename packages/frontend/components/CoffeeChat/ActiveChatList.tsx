import { useQuery } from '@apollo/client'
import { CoffeeChat } from 'generated/types'
import { COFFEE_CHAT_QUERY_FILTERED_BY_ADDRESS } from 'graphql/get-coffee-chat-query'
import { useState } from 'react'
import { useAccount } from 'wagmi'
import ActiveChatItem from './ActiveChatItem'

type Props = {
    coffeeChatList: CoffeeChat[]
}

const ActiveChatList = ({ coffeeChatList }: Props) => {

    return (
        <div className='flex flex-wrap gap-2 justify-center'>
            {coffeeChatList?.map((coffeeChat, index) => (
                <ActiveChatItem key={`coffeechat-${index}`} info={coffeeChat} />
            ))}
        </div>
    )
}

export default ActiveChatList