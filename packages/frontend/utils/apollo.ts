import { ApolloClient, InMemoryCache } from '@apollo/client'
const APIURL = 'https://api.studio.thegraph.com/query/19892/coffeechat/v0.0.3'

export const client = new ApolloClient({
    uri: APIURL,
    cache: new InMemoryCache(),
})

