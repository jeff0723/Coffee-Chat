import { COFFEE_CHAT } from 'constant/abi';
import { COFFEE_CHAT_ADDRESS } from 'constant/address';
import { useState } from 'react';
import { QrReader } from "react-qr-reader";
import { useAccount, useContractWrite, useNetwork, usePrepareContractWrite } from 'wagmi';
import toast from 'react-hot-toast';

const Qrscan = ({ toggle, open }) => {
    const { address } = useAccount()
    const { chain } = useNetwork()
    const [signature, setSignature] = useState("")
    const [chatId, setChatId] = useState("")
    const { config, error } = usePrepareContractWrite({
        addressOrName: chain?.id ? COFFEE_CHAT_ADDRESS[chain?.id] : "",
        contractInterface: COFFEE_CHAT,
        functionName: 'redeemReward',
        args: [["0"], "0", address],
        onError(error) {
            console.log(error)

        }

    })
    const { isLoading: writeLoading, write } = useContractWrite({
        ...config,
        onSuccess(data) {
            toast.success("Successfully redeem reward!")
            setSignature("")
            setChatId("")
            toggle(open)
        },
        onError(error) {
            toast.error(error?.data?.message ?? error?.message)
            console.log(error)
        }
    })
    const handleRedeem = async () => {
        if (!address) return toast.error("Please connect to wallet!")
        if (signature && chatId && address) {
            const inputStruct = [
                [chatId],
                signature,
                address
            ]
            await write?.({
                recklesslySetUnpreparedArgs: inputStruct
            })
        }
    }

    return (
        <div>
            <div >
                <QrReader
                    onResult={(result, error) => {
                        if (result) {
                            const params = new URLSearchParams(result?.text)
                            const _signature = params.get('signature')
                            const _chatId = params.get('chatId')
                            setSignature(_signature)
                            setChatId(_chatId)
                        }

                    }
                    }
                    constraints={{ facingMode: "environment" }}
                    style={{ width: "100%", height: "auto" }}
                />
                {signature && chatId &&
                    <div className='flex flex-col mt-2 gap-2 '>
                        <div>Signature: {signature}</div>
                        <div>ChatId: {chatId}</div>
                        <button onClick={handleRedeem} className='p-2 bg-black rounded-xl text-white'>Redeem</button>
                    </div>
                }
            </div>

        </div>
    );
}

export default Qrscan;