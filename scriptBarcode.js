
var baseurl = $("meta[name^=baseUrl]").attr("content");

// var codeReader = null;
// const codeReader = new ZXing.BrowserQRCodeReader();

const myObject = { key1: 'value1', key2: 'value2' };

// Convert JSON object to string
const jsonString = JSON.stringify(myObject);


const cookieManager = new CookieManager();

// Create a cookie
cookieManager.createCookie('BarcodeReader', jsonString, 7);

// Read a cookie
const value = cookieManager.readCookie('BarcodeReader');
// console.log(value); // Outputs the value of the "cookieName" cookie

// Update a cookie
// cookieManager.updateCookie('BarcodeReader', 'newCookieValue', 7);

// Delete a cookie
// cookieManager.deleteCookie('BarcodeReader');



// console.log(baseurl)








const videoElement = document.getElementById("preview");
// const selsect = document.getElementById("selsect");

// selsect.addEventListener("change", function () {
//     if (selsect.value === "BrowserBarcodeReader") {
//         //   BrowserBarcodeReader();
//     } else if (selsect.value === "BrowserQRCodeReader") {
//         //   BrowserQRCodeReader();
//     }
// });

// $('input[type=radio][name=selsect]').change(function () {
//     if (this.value == 'BrowserBarcodeReader') {
//         // ...
//         alert('BrowserBarcodeReader')
//     }
//     else if (this.value == 'BrowserQRCodeReader') {
//         // ...
//         alert('BrowserQRCodeReader')

//     }
// });

// Get the radio buttons and the result element
const radioButtons = document.querySelectorAll('input[name="radios"]');
const resultElement = document.getElementById('result');

// Add event listeners to radio buttons
radioButtons.forEach(function (radioButton) {
    radioButton.addEventListener('click', function () {
        // Get the value of the selected radio button
        let selectedValue = this.value;
        if (selectedValue === 'แบบผังงาน') {
            BrowserBarcodeReader();
            // alter('textarea')
        } else if (selectedValue === 'แบบรายชิน') {
            BrowserQRCodeReader();
            // alter('textareaddd')

        }
        resultElement.textContent = 'เลือก : ' + selectedValue;
    });
});



let codeText = 'code';

$.ajax({
    url: baseurl + "test_somphol/api/getCode",
    type: "POST",
    data: {
        codeReader: codeText
    },
    success: function (response) {

        let resulet = response ?? false; // emtpy return false 
        if (resulet === false) {
            alert("error");
            return false;
        }

        let obj = JSON.parse(resulet);

        $.each(obj, function (key, val) {
            console.log(val);
        })

        // alter(codeText)


        // alter(code)
    }, error: function (response) {
        console.error(response);
        alert("error");
        return false;
    }
})

function altersw(code) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'คุณแน่ใจหรือไม่!!',
        text: "รหัสรายการ : " + code,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            swalWithBootstrapButtons.fire(
                '',
                'เบิกรายการชิ้นงานสำเร็จ',
                'success'
            )
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            // swalWithBootstrapButtons.fire(
            //     'Cancelled',
            //     'Your imaginary file is safe :)',
            //     'error'
            // )
        }
    })
}



async function BrowserQRCodeReader() {
    // console.log(decodeHints)
    const codeReader = new ZXing.BrowserQRCodeReader();
    codeReader
        .getVideoInputDevices()
        .then((videoInputDevices) => {
            // console.log(videoInputDevices[0].deviceId)
            const decodeFormats = [
                ZXing.BarcodeFormat.UPC_A,
                ZXing.BarcodeFormat.UPC_E,
                ZXing.BarcodeFormat.EAN_8,
                ZXing.BarcodeFormat.EAN_13,
                ZXing.BarcodeFormat.CODE_39,
                ZXing.BarcodeFormat.CODE_93,
                ZXing.BarcodeFormat.CODE_128,
                ZXing.BarcodeFormat.ITF,
                ZXing.BarcodeFormat.CODABAR,
                ZXing.BarcodeFormat.MSI,
                ZXing.BarcodeFormat.RSS_14,
                ZXing.BarcodeFormat.RSS_EXPANDED,
                ZXing.BarcodeFormat.RSS_LIMITED,
                ZXing.BarcodeFormat.UPC_EAN_EXTENSION,
                ZXing.BarcodeFormat.QR_CODE,
                ZXing.BarcodeFormat.DATA_MATRIX,
                ZXing.BarcodeFormat.PDF_417,
                ZXing.BarcodeFormat.AZTEC,
            ];
            if (videoInputDevices.length > 0) {
                const constraints = {
                    deviceId: videoInputDevices[0].deviceId,
                    decodeFormats: decodeFormats,
                };

                let tempCodeResult = null;
                codeReader.decodeFromVideoDevice(
                    undefined,
                    videoElement,
                    (result, error) => {
                        if (result) {

                            // รอบแรกกำหนดให้ → มีค่าเท่ากัน
                            if (tempCodeResult === null) {
                                tempCodeResult = result.text;
                            }

                            if (tempCodeResult !== result.text) {
                                //stadment code
                            }


                            let codeText = result.text;


                            document.getElementById("show-barcode").innerHTML =
                                "barcode : " + result.text;
                            console.log("BrowserQRCodeReader : " + result.text);


                        }

                        if (error && !(error instanceof ZXing.NotFoundException)) {
                            console.error(error);
                        }
                    },
                    constraints
                );
            } else {
                console.error("No video input devices found");
            }
        })
        .catch((err) => {
            console.error(err);
        });
}

function BrowserBarcodeReader() {
    // console.log(decodeHints)
    const codeReader = new ZXing.BrowserBarcodeReader();
    const decodeFormats = [
        ZXing.BarcodeFormat.UPC_A,
        ZXing.BarcodeFormat.UPC_E,
        ZXing.BarcodeFormat.EAN_8,
        ZXing.BarcodeFormat.EAN_13,
        ZXing.BarcodeFormat.CODE_39,
        ZXing.BarcodeFormat.CODE_93,
        ZXing.BarcodeFormat.CODE_128,
        ZXing.BarcodeFormat.ITF,
        ZXing.BarcodeFormat.CODABAR,
        ZXing.BarcodeFormat.MSI,
        ZXing.BarcodeFormat.RSS_14,
        ZXing.BarcodeFormat.RSS_EXPANDED,
        ZXing.BarcodeFormat.RSS_LIMITED,
        ZXing.BarcodeFormat.UPC_EAN_EXTENSION,
        ZXing.BarcodeFormat.QR_CODE,
        ZXing.BarcodeFormat.DATA_MATRIX,
        ZXing.BarcodeFormat.PDF_417,
        ZXing.BarcodeFormat.AZTEC,
    ];

    codeReader
        .getVideoInputDevices()
        .then((videoInputDevices) => {
            // console.log(videoInputDevices[0].deviceId)
            if (videoInputDevices.length > 0) {
                const constraints = {
                    deviceId: videoInputDevices[0].deviceId,
                    decodeFormats: decodeFormats,
                };
                codeReader.decodeFromVideoDevice(
                    undefined,
                    videoElement,
                    (result, error) => {
                        if (result) {
                            document.getElementById("show-barcode").innerHTML =
                                "barcode : " + result.text;
                            // console.log(result.text);
                            console.log("BrowserBarcodeReader : " + result.text);
                        }

                        if (error && !(error instanceof ZXing.NotFoundException)) {
                            console.error(error);
                        }
                    },
                    constraints
                );
            } else {
                console.error("No video input devices found");
            }
        })
        .catch((err) => {
            console.error(err);
        });
}
