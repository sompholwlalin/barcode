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

        #result {
            margin-top: 20px;
        }
    </style>
</head>

<body>
    <h1>Barcode Scanner</h1>
    <div id="scanner-container">
        <video id="preview"></video>
        <div id="result"></div>
    </div>

    <script src="https://unpkg.com/@zxing/library@latest"></script>
    <script>
        const zxing = require('@zxing/library');

        function readBarcodesFromCamera() {
            const videoElement = document.getElementById('preview');

            // Create an instance of MultiFormatReader
            const multiFormatReader = new zxing.MultiFormatReader();

            // Configure the barcode formats to be read
            const decodeHints = new zxing.DecodeHints();
            decodeHints.setHints(
                zxing.DecodeHintType.POSSIBLE_FORMATS,
                zxing.BarcodeFormat.QR_CODE,
                zxing.BarcodeFormat.UPC_A,
                zxing.BarcodeFormat.CODE_39
            );

            // Request access to camera
            navigator.mediaDevices.getUserMedia({
                    video: true
                })
                .then((stream) => {
                    videoElement.srcObject = stream;

                    // Read barcode from each video frame
                    const videoTrack = stream.getVideoTracks()[0];
                    const imageCapture = new ImageCapture(videoTrack);

                    function processVideoFrame() {
                        imageCapture.grabFrame()
                            .then((imageBitmap) => {
                                const luminanceSource = new zxing.HTMLCanvasElementLuminanceSource(imageBitmap);
                                const binaryBitmap = new zxing.BinaryBitmap(new zxing.HybridBinarizer(luminanceSource));

                                try {
                                    const result = multiFormatReader.decode(binaryBitmap, decodeHints);
                                    console.log('Barcode format:', result.getBarcodeFormat().getName());
                                    console.log('Barcode text:', result.getText());
                                } catch (error) {
                                    // Barcode not found or error decoding
                                    console.error('Error decoding barcode:', error);
                                }

                                // Process next video frame
                                requestAnimationFrame(processVideoFrame);
                            })
                            .catch((error) => {
                                // Error capturing video frame
                                console.error('Error capturing video frame:', error);
                            });
                    }

                    // Start processing video frames
                    processVideoFrame();
                })
                .catch((error) => {
                    // Error accessing camera
                    console.error('Error accessing camera:', error);
                });
        }

        readBarcodesFromCamera()
    </script>
</body>

</html>