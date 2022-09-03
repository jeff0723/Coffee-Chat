import { gql } from "@apollo/client";

export const COFFEE_CHAT_QUERY_FILTERED = gql`
    query(
        $lantitude1:BigInt!
        $lantitude2:BigInt!
        $longtitude1:BigInt!
        $longtitude2:BigInt!

    ){
        coffeeChats(where:{
            lantitude_gt:$lantitude1
            lantitude_lt:$lantitude2
            longtitude_gt:$longtitude1
            longtitude_lt:$longtitude2
        }) {
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