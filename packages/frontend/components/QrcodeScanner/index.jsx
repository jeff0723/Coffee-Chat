import React, { useCallback, useEffect, useRef, useState } from 'react';
import Script from 'next/script';


const Qrscan = () => {
    const videoRef = useRef()
    const canvasRef = useRef()
    const [data, setData] = useState("")
    const [qrcode, setQrcode] = useState()
    useEffect(() => {
        if (qrcode)
            qrcode.callback = (res) => {
                if (res) {
                    console.log(res)
                    setData(res)

                    if (videoRef.current) {
                        videoRef.current.srcObject.getTracks().forEach(track => {
                            track.stop();
                        });
                    }
                    canvasRef.current.hidden = true


                }
            };
    }, [qrcode])
    const scan = useCallback(() => {
        if (qrcode) {
            try {
                qrcode.decode();
            } catch (e) {
                setTimeout(scan, 300);
            }
        }
    }, [qrcode])
    const handleCamera = async () => {
        const constraints = {
            audio: false,
            video: { facingMode: "environment" }
        };

        navigator.mediaDevices.getUserMedia(
            constraints //will change
        ).then(stream => {
            videoRef.current.srcObject = stream;
            canvasRef.current.hidden = false
            scan()
        })
    }

    return (
        <div>
            <div onClick={handleCamera}>
                camera on
            </div>
            <canvas ref={canvasRef} hidden={true} id="qr-canvas" className='w-0 h-0'></canvas>
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