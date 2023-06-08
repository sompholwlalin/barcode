<!DOCTYPE html>
<html>
<head>
  <title>Barcode Reader</title>
  <script src="https://cdn.rawgit.com/zxing-js/library/gh-pages/0.17.1/zxing.min.js"></script>
</head>
<body>
  <h1>Barcode Reader</h1>

  <input type="file" accept="image/*" id="fileInput">
  <div id="result"></div>

  <script>
    document.getElementById('fileInput').addEventListener('change', function(event) {
      var file = event.target.files[0];
      var reader = new FileReader();

      reader.onload = function() {
        var image = new Image();
        image.src = reader.result;

        image.onload = function() {
          var canvas = document.createElement('canvas');
          var context = canvas.getContext('2d');
          canvas.width = image.width;
          canvas.height = image.height;
          context.drawImage(image, 0, 0, image.width, image.height);

          var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
          var luminanceSource = new ZXing.LuminanceSource(imageData.width, imageData.height);
          luminanceSource.setMatrix(imageData.data);

          var hybridBinarizer = new ZXing.Common.HybridBinarizer(luminanceSource);
          var binaryBitmap = new ZXing.BinaryBitmap(hybridBinarizer);

          var hints = new ZXing.DecodeHints();
          hints.setShouldTryHarder(true);
          hints.setFormats(ZXing.BarcodeFormat.QR_CODE, ZXing.BarcodeFormat.CODE_39);

          var reader = new ZXing.MultiFormatReader();
          var result = reader.decode(binaryBitmap, hints);

          if (result) {
            document.getElementById('result').innerText = result.text;
          } else {
            document.getElementById('result').innerText = 'No barcode found';
          }
        };
      };

      reader.readAsDataURL(file);
    });
  </script>
</body>
</html>
