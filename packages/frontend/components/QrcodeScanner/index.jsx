import React, { useEffect, useRef, useState } from 'react';
import dynamic from "next/dynamic";
import Script from 'next/script';
import { useMediaQuery } from 'react-responsive';
const QrReader = dynamic(() => import('react-qr-reader'), { ssr: false })


const Qrscan = () => {
    const videoRef = useRef()
    const qrcode = useRef()
    const [data, setData] = useState("")

    useEffect(() => {
        console.log(window)
        qrcode.current = window.qrcode
        qrcode.current.callback = res => {
            if (res) {
                console.log(res)
                setData(res)
                scanning = false;

                videoRef.current.srcObject.getTracks().forEach(track => {
                    track.stop();
                });


            }
        };
    }, [])
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
            <Script src="https://rawgit.com/sitepoint-editors/jsqrcode/master/src/qr_packed.js" />
        </div>
    );
}

export default Qrscan;