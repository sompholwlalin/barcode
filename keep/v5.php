<!DOCTYPE html>
<html>

<head>
    <title>Barcode Scanner</title>
    <style>
        #scanner-container {
            position: relative;
            width: 100%;
            height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        #preview {
            max-width: 100%;
            max-height: 100%;
            width: auto;
            height: auto;
        }

        #scanner-frame {
            position: relative;
            width: 70%;
            padding-top: 30vh;
            border: 2px solid #ff0000;
            pointer-events: none;
        }

        .scanner-line {
            position: absolute;
            width: 100%;
            height: 2px;
            background-color: #ff0000;
            pointer-events: none;
            animation-duration: 2s;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
        }

        #horizontal-line {
            top: 50%;
            left: 0;
            right: 0;
            animation-name: scan-horizontal;
        }

        #vertical-line {
            left: 50%;
            top: 0;
            bottom: 0;
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
    <div id="scanner-container">
        <video id="preview"></video>
        <div id="scanner-frame"></div>
        <div id="horizontal-line" class="scanner-line"></div>
        <div id="vertical-line" class="scanner-line"></div>
    </div>

    <script src="https://unpkg.com/@zxing/library@latest"></script>
    <script>
        const codeReader = new ZXing.BrowserBarcodeReader();
        const videoElement = document.getElementById('preview');

        const decodeFormats = [
            ZXing.BarcodeFormat.UPC_A,
            ZXing.BarcodeFormat.QR_CODE,
            ZXing.BarcodeFormat.CODE_39
            // Add more formats as needed
        ];

        codeReader
            .getVideoInputDevices()
            .then((videoInputDevices) => {
                if (videoInputDevices.length > 0) {
                    const constraints = {
                        deviceId: videoInputDevices[0].deviceId,
                        decodeFormats: decodeFormats
                    };

                    codeReader.decodeFromVideoDevice(undefined, videoElement, (result, error) => {
                        if (result) {
                            console.log(result.text);
                            // Handle the decoded barcode value here
                        }

                        if (error && !(error instanceof ZXing.NotFoundException)) {
                            console.error(error);
                        }
                    }, constraints);
                } else {
                    console.error('No video input devices found');
                }
            })
            .catch((err) => {
                console.error(err);
            });
    </script>
</body>

</html>