import usePrevious from 'hooks/usePrevious'
import { event } from 'nextjs-google-analytics'
import React, { useEffect } from 'react'
import { useAccount } from 'wagmi'

type Props = {}

const Updater = (props: Props) => {
    const { address } = useAccount()
    const previous = usePrevious(address)
    useEffect(() => {
        if (previous == undefined && address) {
            event("connect_wallet", {
                category: "Action",
                label: address
            })
        }
    }, [address])
    return null
}

export default Updater