import { useQuery } from '@apollo/client'
import { CoffeeChat } from 'generated/types'
import { COFFEE_CHAT_QUERY_FILTERED_BY_ADDRESS } from 'graphql/get-coffee-chat-query'
import { useState } from 'react'
import { useAccount } from 'wagmi'
import UnratedChatItem from './UnratedChatItem'

type Props = {
    coffeeChatList: CoffeeChat[]
}

const UnratedChatList = ({ coffeeChatList }: Props) => {

    return (
        <div className='flex flex-wrap gap-2 justify-center'>
            {coffeeChatList?.map((coffeeChat, index) => (
                <UnratedChatItem key={`unrated-coffeechat-${index}`} info={coffeeChat} />
            ))}
        </div>
    )
}

export default UnratedChatList