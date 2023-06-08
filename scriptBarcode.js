
var baseurl = $("meta[name^=baseUrl]").attr("content");

const dataProject = document.getElementById("data-project");
const tableData = document.getElementById("table-data");
const divCarmara = document.getElementById("div-carmara");

// Check for Windows
if (navigator.platform.toUpperCase().indexOf('WIN') !== -1) {
    dataProject.style.display = 'block';
    tableData.style.display = 'block';
    console.log('Operating System: Windows');
}

// Check for macOS
if (navigator.platform.toUpperCase().indexOf('MAC') !== -1) {
    dataProject.style.display = 'block';
    tableData.style.display = 'block';
    console.log('Operating System: macOS');
}

// Check for Linux
if (navigator.platform.toUpperCase().indexOf('LINUX') !== -1) {
    dataProject.style.display = 'block';
    tableData.style.display = 'block';
    console.log('Operating System: Linux');
}

// Check for iOS
if (/iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
    dataProject.style.display = 'none';
    tableData.style.display = 'none';
    console.log('Operating System: iOS');
}
if (/iPad/.test(navigator.userAgent) && !window.MSStream) {
    dataProject.style.display = 'block';
    tableData.style.display = 'block';
    console.log('Operating System: iPad');
}
// Check for Android
if (/Android/.test(navigator.userAgent)) {
    dataProject.style.display = 'none';
    tableData.style.display = 'none';
    console.log('Operating System: Android');
}







const videoElement = document.getElementById("preview");
const radioButtons = document.querySelectorAll('input[name="radios"]');
const resultElement = document.getElementById('result');
const inputBarcode = document.getElementById("input-barcode");
const btnScanBarcode = document.getElementById("btn-scan-barcode");
const showBarcode = document.getElementById("show-barcode");

inputBarcode.addEventListener('keydown', function (event) {
    if (event.keyCode === 13 || event.key === 'Enter') {
        checkBarCodeSubmit(this.value)
    }
});

// เลือกกล้อง 
const cameraListElement = document.getElementById("camara");
navigator.mediaDevices.enumerateDevices()
    .then(function (devices) {
        let cameras = devices.filter(function (device) {
            return device.kind === 'videoinput';
        });

        if (cameras.length == 0) {
            divCarmara.style.display = 'none';
            return false;
        } else {
            divCarmara.style.display = 'block';
            carmaraBarCodeScan();
        }

        cameras.forEach(function (camera, index) {
            let opt = document.createElement('option');
            opt.value = camera.deviceId;
            opt.innerHTML = 'เลือก : ' + camera.label;
            camara.appendChild(opt);

        });

        camara.selectedIndex = cameras.length - 1;
    })
    .catch(function (error) {
        console.error('Error enumerating devices.', error);
    });



radioButtons.forEach(function (radioButton) {
    radioButton.addEventListener('click', function () {
        let selectedValue = this.value;
        if (selectedValue === 'แบบผังงาน') {
            carmaraBarCodeScan();
        } else if (selectedValue === 'แบบรายชิ้น') {
            carmaraBarCodeScan();
        }
        resultElement.textContent = 'เลือก : ' + selectedValue;
    });
});




async function carmaraBarCodeScan() {
    const codeReader = new ZXing.BrowserBarcodeReader();
    codeReader
        .getVideoInputDevices()
        .then((videoInputDevices) => {

            if (videoInputDevices.length !== 0) {

            }

            if (videoInputDevices.length > 0) {

                let tempCodeResult = null;
                codeReader.decodeFromVideoDevice(
                    camara.value,
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

                            inputBarcode.value = result.text;
                            inputBarcode.focus();

                            let codeText = inputBarcode.value;
                            checkBarCodeSubmit(codeText)

                        }

                        if (error && !(error instanceof ZXing.NotFoundException)) {
                            console.error(error);
                        }
                    }
                );
            } else {
                console.error("No video input devices found");
            }
        })
        .catch((err) => {
            console.error(err);
        });
}



// เพิ่มข้อมูลลง
function checkBarCodeSubmit(barcode) {

    // let codeText = barcode;

    $.ajax({
        url: baseurl + "test_somphol/api/getCode",
        type: "GET",
        data: {
            barcode: barcode
        },
        success: function (response) {

            // let resulet = response ?? false; // emtpy return false 
            // if (resulet === false) {
            //     alert("error");
            //     return false;
            // }

            // let obj = JSON.parse(resulet);

            // $.each(obj, function (key, val) {
            //     console.log(val);
            // })
            console.log(response);

        }, error: function (response) {
            console.error(response);
            // alert("error");
            return false;
        }
    })



    showBarcode.innerHTML = "barcode : " + barcode;
    console.log("CodeReader : " + barcode);

    inputBarcode.focus();
}

function confirmBarCode(barcode) {


}



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


// เพิ่มข้อมูลลงใน Session Storage
// sessionStorage.setItem('key', 'value');

// อ่านข้อมูลจาก Session Storage
// const valuecc = sessionStorage.getItem('key');
// console.log(valuecc); // แสดงค่า 'value'

// ลบข้อมูลออกจาก Session Storage
// sessionStorage.removeItem('key');


// BrowserBarcodeReader();