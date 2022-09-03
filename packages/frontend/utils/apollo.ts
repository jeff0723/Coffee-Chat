import { ApolloClient, InMemoryCache } from '@apollo/client'
import { APIURL } from 'constant'


export const client = new ApolloClient({
    uri: APIURL,
    cache: new InMemoryCache(),
})

