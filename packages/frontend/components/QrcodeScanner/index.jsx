import { COFFEE_CHAT } from 'constant/abi';
import { COFFEE_CHAT_ADDRESS } from 'constant/address';
import { useState } from 'react';
import { QrReader } from "react-qr-reader";
import { useAccount, useContractWrite, useNetwork, usePrepareContractWrite } from 'wagmi';
import toast from 'react-hot-toast';
import RedeemReward from 'components/UI/RedeemReward';
import { event } from 'nextjs-google-analytics';

const Qrscan = ({ toggle, open }) => {
    const [signature, setSignature] = useState("")
    const [chatId, setChatId] = useState("")
    const { address } = useAccount()
    return (
        <div>
            <div >
                <QrReader
                    onResult={(result, error) => {
                        if (result) {
                            const params = new URLSearchParams(result?.text)
                            const _signature = params.get('signature')
                            const _chatId = params.get('chatId')
                            event("scan", {
                                category: 'Action',
                                label: address
                            })
                            setSignature(_signature)
                            setChatId(_chatId)
                        }

                    }
                    }
                    constraints={{ facingMode: "environment" }}
                    style={{ width: "100%", height: "auto" }}
                />
                {signature && chatId &&
                    <RedeemReward signature={signature} chatId={chatId} setSignature={setSignature} setChatId={setChatId} toggle={toggle} open={open} />
                }
            </div>

        </div>
    );
}

export default Qrscan;