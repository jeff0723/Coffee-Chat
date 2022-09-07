import React, { useCallback, useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import { QrReader } from "react-qr-reader";


const Qrscan = () => {
    const videoRef = useRef()
    const canvasRef = useRef()
    const [data, setData] = useState("")
    const [qrcode, setQrcode] = useState()
    const [scanning, setScanning] = useState(false)
    // useEffect(() => {
    //     if (qrcode) {
    //         console.log('hi outside callback')
    //         qrcode.callback = (res) => {
    //             console.log('hi inside callback')
    //             if (res) {
    //                 console.log('hi inside callback')
    //                 console.log(res)
    //                 setData(res)
    //                 setScanning(false)
    //                 if (videoRef.current) {
    //                     videoRef.current.srcObject.getTracks().forEach(track => {
    //                         track.stop();
    //                     });
    //                 }
    //                 canvasRef.current.hidden = true


    //             }
    //         };
    //     }
    // }, [qrcode])
    // const tick = () => {
    //     console.log('tick')
    //     const canvas = canvasRef.current.getContext("2d");
    //     canvasRef.current.height = videoRef.current.videoHeight
    //     canvasRef.current.width = videoRef.current.videoWidth
    //     canvas.drawImage(videoRef.current, 0, 0, canvasRef.current.height, canvasRef.current.width);
    //     scanning && requestAnimationFrame(tick);
    // }
    // const scan = () => {
    //     if (qrcode) {
    //         try {
    //             qrcode.decode()
    //         } catch (e) {
    //             setTimeout(scan, 300);
    //         }
    //     }
    // }
    // const handleCamera = async () => {
    //     const constraints = {
    //         audio: false,
    //         video: { facingMode: "environment" }
    //     };

    //     navigator.mediaDevices.getUserMedia(
    //         constraints //will change
    //     ).then(stream => {
    //         videoRef.current.srcObject = stream;
    //         canvasRef.current.hidden = false
    //         setScanning(true)
    //         tick()
    //         scan()
    //     })
    // }
    // console.log(scanning)
    return (
        <div>
            <div >
                <QrReader
                    onResult={(result, error) => {
                        if (!!result) {
                            setData(result?.text);
                        }

                        if (!!error) {
                            console.info(error);
                        }

                    }
                    }
                    constraints={{ facingMode: "environment" }}
                    style={{ width: "40%", height: "40%" }}
                />
                <p>{data}</p>
            </div>
            {/* <div onClick={handleCamera}>
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
                    console.log("set qr code")
                    setQrcode(window.qrcode)
                }}
            /> */}
        </div>
    );
}

export default Qrscan;