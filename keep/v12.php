<!DOCTYPE html>
<html>
<head>
  <title>Barcode Reader</title>
  <!-- Include ZXing library via CDN -->
  <script src="https://cdn.jsdelivr.net/npm/@zxing/library@0.17.0"></script>
</head>
<body>
  <input type="file" id="file-input">
  <script>
    // Create an instance of MultiFormatReader
    const multiFormatReader = new zxing.MultiFormatReader();

    // Configure the barcode formats to be read
    const decodeHints = new zxing.DecodeHints();
    decodeHints.setHints(
      zxing.DecodeHintType.POSSIBLE_FORMATS,
      zxing.BarcodeFormat.QR_CODE,
      zxing.BarcodeFormat.DATA_MATRIX,
      zxing.BarcodeFormat.PDF_417,
      zxing.BarcodeFormat.AZTEC
      // Add more formats if needed
    );

    // Read the barcode from an image
    function readBarcodeFromFile(imageFile) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const imageData = event.target.result;
        const imageElement = document.createElement('img');
        imageElement.src = imageData;

        const luminanceSource = new zxing.HTMLCanvasElementLuminanceSource(imageElement);
        const binaryBitmap = new zxing.BinaryBitmap(new zxing.HybridBinarizer(luminanceSource));

        try {
          const result = multiFormatReader.decode(binaryBitmap, decodeHints);
          console.log('Barcode format:', result.getBarcodeFormat().getName());
          console.log('Barcode text:', result.getText());
        } catch (error) {
          console.error('Error decoding barcode:', error);
        }
      };

      reader.readAsDataURL(imageFile);
    }

    // Example usage with an image file input
    const fileInput = document.getElementById('file-input');
    fileInput.addEventListener('change', (event) => {
      const selectedFile = event.target.files[0];
      readBarcodeFromFile(selectedFile);
    });
  </script>
</body>
</html>
