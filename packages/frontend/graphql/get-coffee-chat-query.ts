import { gql } from "@apollo/client";

export const COFFEE_CHAT_QUERY = gql`
    query{
        coffeeChats {
            id
            tokenId
            placeId
            startTime
            endTime
            lantitude
            longtitude
            initializer
            stakeAmount
          }
    }
`