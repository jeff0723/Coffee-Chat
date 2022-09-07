import React, { useRef, useState } from 'react';
import dynamic from "next/dynamic";
import Script from 'next/script';
const QrReader = dynamic(() => import('react-qr-reader'), { ssr: false })


const Qrscan = () => {
    const videoRef = useRef()
    const stream = useRef();
    const handleCamera = async () => {
        const video = document.querySelector('video');
        const constraints = {
            audio: false,
            video: { facingMode: "environment" }
        };

        stream.current = await navigator.mediaDevices.getUserMedia(
            constraints //will change
        );
        videoRef.current.srcObject = stream.current;

        console.log("stream", stream.current);
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
        </div>
    );
}

export default Qrscan;