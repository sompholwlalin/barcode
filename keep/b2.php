<!-- QuaggaJS Library -->
<script src="https://cdn.jsdelivr.net/npm/quagga/dist/quagga.min.js"></script>

<div id="video-container"></div>
<div id="result"></div>
<script>
    document.onload = function() {

    }

    window.onload = function(e) {
        Quagga.init({
            inputStream: {
                name: "Live",
                type: "LiveStream",
                target: "#video-container",
            },
            decoder: {
                readers: [
                    "code_128_reader",
                    "ean_reader",
                    "upc_reader",
                    "code_39_reader",
                ],
            },
        }, function(err) {
            if (err) {
                console.error("Error initializing Quagga: " + err);
                return;
            }
            console.log("Quagga initialized successfully");
            Quagga.start();
            Quagga.onDetected(function(result) {
                var code = result.codeResult.code;
                document.getElementById("result").textContent = "Scanned barcode: " + code;
            });
        });


    }
</script>