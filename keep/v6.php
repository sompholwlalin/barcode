<!DOCTYPE html>
<html>

<head>
    <title>Barcode Scanner</title>
    <style>
        #scanner-container {
            position: relative;
            width: 400px;
            height: 250px;
            background-color: black;
            /* padding: 20px; */
        }

        #preview {
            position: absolute;
            width: 400px;
            height: 250px;
        }

        #scanner-frame {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 90%;
            height: 50%;
            border: 2px solid #ff0000;
            pointer-events: none;
        }

        /* #scanner-line {
            position: absolute;
            top: 50%;
            left: 0;
            right: 0;
            height: 2px;
            background-color: #ff0000;
            pointer-events: none;
        } */

        #scanner-line {
            position: absolute;
            width: 100%;
            height: 2px;
            background-color: #ff0000;
            pointer-events: none;
            /* animation-duration: 2s; */
            animation: 1s linear 2s infinite alternate slidein;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
            animation-name: scan-vertical;

        }

        @keyframes scan-horizontal {
            0% {
                left: 0;
            }

            100% {
                left: 100%;
            }
        }

        @keyframes scan-vertical {
            0% {
                top: 0;
            }

            100% {
                top: 100%;
            }
        }
    </style>
</head>

<body>
    <h1>Barcode Scanner</h1>

    <!-- <center> -->
    <div id="scanner-container">
        <video id="preview"></video>
        <div id="scanner-frame"></div>
        <div id="scanner-line" class="scanner-line"></div>
        <!-- <div id="horizontal-line" class="scanner-line"></div>
        <div id="vertical-line" class="scanner-line"></div> -->
    </div>
    <!-- </center> -->


    <!-- <script src="https://unpkg.com/@zxing/library@latest"></script> -->
    <script src="./index.min.js"></script>
    <script>
        const codeReader = new ZXing.BrowserQRCodeReader();
        const videoElement = document.getElementById('preview');

        const decodeFormats = [
            ZXing.BarcodeFormat.UPC_A,
            ZXing.BarcodeFormat.QR_CODE,
            ZXing.BarcodeFormat.CODE_39
            // Add more formats as needed
        ];

        // codeReader
        //     .getVideoInputDevices()
        //     .then((videoInputDevices) => {
        //         if (videoInputDevices.length > 0) {
        //             const constraints = {
        //                 deviceId: videoInputDevices[0].deviceId,
        //                 decodeFormats: decodeFormats
        //             };

        //             codeReader.decodeFromVideoDevice(undefined, videoElement, (result, error) => {
        //                 if (result) {
        //                     console.log(result.text);
        //                     // Handle the decoded barcode value here
        //                 }

        //                 if (error && !(error instanceof ZXing.NotFoundException)) {
        //                     console.error(error);
        //                 }
        //             }, constraints);
        //         } else {
        //             console.error('No video input devices found');
        //         }
        //     })
        //     .catch((err) => {
        //         console.error(err);
        //     });


        // const decodeFormats = [
        //     ZXing.BarcodeFormat.UPC_A,
        //     ZXing.BarcodeFormat.QR_CODE,
        //     ZXing.BarcodeFormat.CODE_39
        //     // Add more formats as needed
        // ];
        codeReader
            .getVideoInputDevices()
            .then((videoInputDevices) => {



                if (videoInputDevices.length > 0) {

                    const constraints = {
                        deviceId: videoInputDevices[0].deviceId,
                        decodeFormats: decodeFormats
                    };

                    codeReader.decodeFromInputVideoDevice(videoInputDevices[0].deviceId, videoElement)
                        .then((result) => {
                            console.log(result.text);
                            // Handle the decoded barcode value here
                        })
                        .catch((err) => {
                            console.error(err);
                        });
                } else {
                    console.error('No video input devices found');
                }
            })
            .catch((err) => {
                console.error(err);
            });

        // codeReader
        //     .getVideoInputDevices()
        //     .then((videoInputDevices) => {
        //         if (videoInputDevices.length > 0) {
        //             const constraints = {
        //                 deviceId: videoInputDevices[0].deviceId,
        //                 decodeFormats: decodeFormats
        //             };

        //             codeReader.decodeFromVideoDevice(videoInputDevices[0].deviceId, videoElement, (result, error) => {
        //                 if (result) {
        //                     console.log(result.text);
        //                     // Handle the decoded barcode value here
        //                 }

        //                 if (error && !(error instanceof ZXing.NotFoundException)) {
        //                     console.error(error);
        //                 }
        //             }, constraints);
        //         } else {
        //             console.error('No video input devices found');
        //         }
        //     })
        //     .catch((err) => {
        //         console.error(err);
        //     });
    </script>
</body>

</html>