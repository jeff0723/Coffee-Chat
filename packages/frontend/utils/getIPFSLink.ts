const getIPFSLink = (hash: string): string => {
    if (!hash) return ""
    const ipfsURL = 'https://ipfs.io/ipfs/'

    return hash
        .replace(/^Qm[1-9A-Za-z]{44}/gm, `${ipfsURL}${hash}`)
        .replace('ipfs://', ipfsURL)
}

export default getIPFSLink
