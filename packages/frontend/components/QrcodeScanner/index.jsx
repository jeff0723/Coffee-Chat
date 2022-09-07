import React, { useCallback, useEffect, useRef, useState } from 'react';
import Script from 'next/script';


const Qrscan = () => {
    const videoRef = useRef()
    const canvasRef = useRef()
    const [data, setData] = useState("")
    const [qrcode, setQrcode] = useState()
    const [scanning, setScanning] = useState(false)
    useEffect(() => {
        if (qrcode)
            qrcode.callback = (res) => {
                console.log('hi outside callback')

                if (res) {
                    console.log('hi inside callback')

                    console.log(res)
                    setData(res)
                    setScanning(false)
                    if (videoRef.current) {
                        videoRef.current.srcObject.getTracks().forEach(track => {
                            track.stop();
                        });
                    }
                    canvasRef.current.hidden = true


                }
            };
    }, [qrcode])
    const tick = () => {
        console.log('tick')
        const canvas = canvasRef.current.getContext("2d");
        console.log(canvas)
        console.log(videoRef.current.videoHeight)
        console.log(videoRef.current.videoWidth)
        console.log(videoRef.current)
        canvasRef.current.height = videoRef.current.videoHeight
        canvasRef.current.width = videoRef.current.videoWidth
        canvas.drawImage(videoRef.current, 0, 0, canvasRef.current.height, canvasRef.current.width);
        scanning && requestAnimationFrame(tick);
    }
    const scan = useCallback(() => {
        if (qrcode) {

            try {
                qrcode.decode()
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
            setScanning(true)
            tick()
            scan()
        })
    }

    return (
        <div>
            <div onClick={handleCamera}>
                camera on
            </div>
            <canvas ref={canvasRef} hidden={true} id="qr-canvas"></canvas>
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