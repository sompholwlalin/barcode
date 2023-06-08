<!DOCTYPE html>
<html>
<head>
  <title>Barcode Scanner</title>
  <style>
    #scanner-container {
      position: relative;
      width: 100%;
      height: 100vh;
    }

    #preview {
      width: 100%;
      height: 100%;
    }

    #scanner-frame {
      position: absolute;
      padding-top: 30vh;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 70%;
      height: 50%;
      border: 2px solid #ff0000;
      pointer-events: none;
    }

    #scanner-line {
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      height: 2px;
      background-color: #ff0000;
      pointer-events: none;
    }
  </style>
</head>
<body>
  <h1>Barcode Scanner</h1>
  <div id="scanner-container">
    <video id="preview"></video>
    <div id="scanner-frame"></div>
    <div id="scanner-line"></div>
  </div>

  <script src="https://unpkg.com/@zxing/library@latest"></script>
  <script>
    const codeReader = new ZXing.BrowserBarcodeReader();
    const videoElement = document.getElementById('preview');

    codeReader
      .getVideoInputDevices()
      .then((videoInputDevices) => {
        if (videoInputDevices.length > 0) {
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
  </script>
</body>
</html>
