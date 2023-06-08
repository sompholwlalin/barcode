<!DOCTYPE html>
<html>
<head>
  <title>Barcode Reader</title>
  <script src="./index.min.js"></script>
</head>
<body>
  <h1>Barcode Reader</h1>

  <video id="video" width="400" height="300" autoplay></video>
  <div id="result"></div>

  <script>
    var video = document.getElementById('video');
    var resultElement = document.getElementById('result');

    // Check if the browser supports getUserMedia
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // Request access to the camera
      navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
        // Set the video source to the camera stream
        video.srcObject = stream;
        video.play();

        // Create a BrowserBarcodeReader instance
        var codeReader = new ZXing.BrowserBarcodeReader();

        // Decode barcodes from video stream
        codeReader.decodeFromVideoElement(video, function(result, error) {
          if (result) {
            resultElement.innerText = result.text;
          } else {
            resultElement.innerText = 'No barcode found';
          }
        });
      }).catch(function(error) {
        console.error('Error accessing the camera:', error);
      });
    } else {
      console.error('getUserMedia is not supported by this browser.');
    }
  </script>
</body>
</html>
