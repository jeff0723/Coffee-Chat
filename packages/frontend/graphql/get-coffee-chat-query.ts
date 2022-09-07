import { gql } from "@apollo/client";

export const COFFEE_CHAT_QUERY_FILTERED_BY_POINT = gql`
    query(
        $lantitude1:BigInt!
        $lantitude2:BigInt!
        $longtitude1:BigInt!
        $longtitude2:BigInt!
        $now:BigInt!
        $isactive:Boolean!
    ){
        coffeeChats(where:{
            lantitude_gt:$lantitude1
            lantitude_lt:$lantitude2
            longtitude_gt:$longtitude1
            longtitude_lt:$longtitude2
            endTime_gt:$now
            isActive:$isactive
        }) {
            id
            placeId
            startTime
            endTime
            lantitude
            longtitude
            initializer
            stakeAmount
            isActive
          }
    }
`

export const COFFEE_CHAT_QUERY_FILTERED_BY_ADDRESS = gql`
    query(
        $initiater:String!

    ){
        coffeeChats(where:{
            initializer:$initiater
        }) {
            id
            placeId
            startTime
            endTime
            lantitude
            longtitude
            initializer
            stakeAmount
            isActive
          }
    }
`

