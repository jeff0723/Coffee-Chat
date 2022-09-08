import { gql } from "@apollo/client";

export const COFFEE_CHAT_QUERY_FILTERED_BY_POINT = gql`
    query(
        $lantitude1:BigInt!
        $lantitude2:BigInt!
        $longtitude1:BigInt!
        $longtitude2:BigInt!
        $now:BigInt!
        $isActive:Boolean!
    ){
        coffeeChats(where:{
            lantitude_gt:$lantitude1
            lantitude_lt:$lantitude2
            longtitude_gt:$longtitude1
            longtitude_lt:$longtitude2
            endTime_gt:$now
            isActive:$isActive
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

export const COFFEE_CHAT_QUERY_ALL = gql`
    query {
        coffeeChats {
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

export const COFFEE_CHAT_QUERY_FILTER_BY_REDEEMER_UNRATED = gql`
    query(
        $redeemer:String!
        $threshold:Int!
    ){
        coffeeChats(where:{
            redeemer:$redeemer
            points_lt:$threshold
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