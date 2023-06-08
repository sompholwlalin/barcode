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

    #result {
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <h1>Barcode Scanner</h1>
  <div id="scanner-container">
    <button id="scan-button">Scan Barcode</button>
    <div id="result"></div>
  </div>

  <script src="https://unpkg.com/@zxing/library@latest"></script>
  <script>
    const codeReader = new ZXing.MultiFormatReader();

    const scanButton = document.getElementById('scan-button');
    const resultDiv = document.getElementById('result');

    scanButton.addEventListener('click', () => {
      codeReader
        .decodeOnceFromVideoDevice(undefined, 'video')
        .then((result) => {
          console.log(result);
          resultDiv.textContent = result.text;
        })
        .catch((error) => {
          console.error(error);
        });
    });
  </script>
</body>
</html>
