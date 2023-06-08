<script src="https://cdn.jsdelivr.net/npm/quagga/dist/quagga.min.js"></script>
<div id="scanner-container"></div>
<div id="result"></div>

<script>
    // import Quagga from 'quagga'; // ES6
    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.querySelector("#scanner-container"),
        },
        decoder: {
            readers: ["ean_reader", "upc_reader", "code_128_reader"],
        },
    }, function(err) {
        if (err) {
            console.error("Quagga initialization failed:", err);
            return;
        }
        console.log("Quagga initialization succeeded.");
        Quagga.start();
    });


    Quagga.onDetected(function(result) {
        var code = result.codeResult.code;
        console.log("Barcode detected:", code);
        document.querySelector("#results").innerHTML = code;
    });

    // Quagga.stop();
    // 
</script>