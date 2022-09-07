import React, { useEffect, useRef, useState } from 'react';
import dynamic from "next/dynamic";
import Script from 'next/script';
import { useMediaQuery } from 'react-responsive';
const QrReader = dynamic(() => import('react-qr-reader'), { ssr: false })


const Qrscan = () => {
    const videoRef = useRef()
    const windowRef = useRef()
    const [data, setData] = useState("")
    const [qrcode, setQrcode] = useState()
    useEffect(() => {
        if (qrcode)
            qrcode.callback = res => {
                if (res) {
                    console.log(res)
                    setData(res)
                    scanning = false;
                    if (videoRef.current) {
                        videoRef.current.srcObject.getTracks().forEach(track => {
                            track.stop();
                        });
                    }

                }
            };
    }, [qrcode])
    const scan = () => {
        if (qrcode.current) {
            try {
                qrcode.decode();
            } catch (e) {
                setTimeout(scan, 300);
            }
        }
    }
    const handleCamera = async () => {
        const constraints = {
            audio: false,
            video: { facingMode: "environment" }
        };

        navigator.mediaDevices.getUserMedia(
            constraints //will change
        ).then(stream => {
            videoRef.current.srcObject = stream;
            scan()
        })


    }
    console.log("outside:", qrcode)
    return (
        <div>
            <div onClick={handleCamera}>
                camera on
            </div>
            <video
                ref={videoRef}
                autoPlay
                playsInline
                style={{ height: "auto", width: "100%" }} />
            <div>
                Data: {data}
            </div>
            <Script
                src="https://rawgit.com/sitepoint-editors/jsqrcode/master/src/qr_packed.js"
                onLoad={() => {
                    setQrcode(window.qrcode)
                }}
            />
        </div>
    );
}

export default Qrscan;