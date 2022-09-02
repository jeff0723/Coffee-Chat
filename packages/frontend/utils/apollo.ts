import { ApolloClient, InMemoryCache } from '@apollo/client'
const APIURL = 'https://api.studio.thegraph.com/query/coffeechat/'

export const client = new ApolloClient({
    uri: APIURL,
    cache: new InMemoryCache(),
})

