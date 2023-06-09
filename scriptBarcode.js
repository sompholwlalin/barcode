
var baseurl = $("meta[name^=baseUrl]").attr("content");

const dataProject = document.getElementById("data-project");
const tableData = document.getElementById("table-data");
const divCarmara = document.getElementById("div-carmara");

// Check for Windows
if (navigator.platform.toUpperCase().indexOf('WIN') !== -1) {
    dataProject.style.display = 'none';
    tableData.style.display = 'none';
    console.log('Operating System: Windows');
}

// Check for macOS
if (navigator.platform.toUpperCase().indexOf('MAC') !== -1) {
    dataProject.style.display = 'none';
    tableData.style.display = 'none';
    console.log('Operating System: macOS');
}

// Check for Linux
if (navigator.platform.toUpperCase().indexOf('LINUX') !== -1) {
    dataProject.style.display = 'none';
    tableData.style.display = 'none';
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
        type: "POST",
        data: {
            barcode: barcode
        },
        dataType: "json",
        success: function (response) {

            if (Object.prototype.toString.call(response) !== '[object Object]') {
                Swal.fire({
                    icon: 'error',
                    title: 'พบข้อผิดพลาด',
                    text: 'สแกนใหม่ หรือรีเฟรชหน้า อีกครั้ง',
                })
                return false;
            }


            if (Object.keys(response).length === 0) {
                Swal.fire({
                    icon: 'warning',
                    title: 'บาร์โค้ดไม่ถูกต้อง : ' + barcode,
                    text: 'โปรดลองสแกนใหม่อีกครั้ง',
                })
                return false;
            }




            let obj = response;
            let SCAN_STATUS = obj.SCAN_STATUS;

            if (obj.TYPE_SCAN === 'scheme') {
                scheme(obj);
            } else if (obj.TYPE_SCAN === 'job') {
                job(obj);
            }



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

function confirmBarCode(object) {

    let BARCODE_TEXT = object.BARCODE_TEXT;
    let TYPE_SCAN = object.TYPE_SCAN;
    let PJ_CODE = object.PJ_CODE;
    let PD_CODE = object.PD_CODE;
    let N_MF_CODE = object.N_MF_CODE;
    let PIT_BARCODE_2 = object.PIT_BARCODE_2;


    $.ajax({
        url: baseurl + "test_somphol/api/confirmBarCode",
        type: "POST",
        data: {
            PIT_BARCODE_2: PIT_BARCODE_2,
            TYPE_SCAN: TYPE_SCAN,
            barcode: BARCODE_TEXT,
            PJ_CODE: PJ_CODE,
            PD_CODE: PD_CODE,
            N_MF_CODE: N_MF_CODE
        },
        // dataType: "json",
        success: function (response) {
            console.log(response);

        }
    });



    // const swalWithBootstrapButtons = Swal.mixin({
    //     customClass: {
    //         confirmButton: 'btn btn-success m-2',
    //         cancelButton: 'btn btn-danger m-2'
    //     },
    //     buttonsStyling: false
    // })
    // swalWithBootstrapButtons.fire(
    //     '',
    //     'เบิกรายการชิ้นงานสำเร็จ',
    //     'success'
    // )
}

function scheme(object) {
    let obj = object;
    let SCAN_STATUS = obj.SCAN_STATUS;

    if (SCAN_STATUS === 'F' || SCAN_STATUS === 'C') {
        Swal.fire({
            icon: 'success',
            title: obj.TEXT_SCAN,
            text: obj.MESSAGE,
        })
        return false; //
    }

    // console.log(object)


    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success m-2',
            cancelButton: 'btn btn-danger m-2'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: "<h2>โปรดอ่าน</h2>" + obj.MESSAGE,
        text: "กดยืนยัน ระบบจะเบิกชิ้นงานทั้งหมดที่เหลือ หรือที่ยังไม่สแกน",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'ยกเลิก',
        confirmButtonText: 'ยืนยัน',

        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            confirmBarCode(object);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
        }
    })
    // console.log(obj);

}

function job(object) {
    let obj = object;
    let SCAN_STATUS = obj.SCAN_STATUS;
    let SCAN_D_STATUS = obj.SCAN_D_STATUS;
    let SCAN_M_STATUS = obj.SCAN_M_STATUS;

    if (SCAN_D_STATUS === 'D' || SCAN_M_STATUS === 'D' || SCAN_STATUS === 'C') {
        Swal.fire({
            icon: 'success',
            title: obj.TEXT_SCAN,
            text: obj.MESSAGE,
        })
        return false; //
    }

    console.log(object)

    // return 0;

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success m-2',
            cancelButton: 'btn btn-danger m-2'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: "<h2>โปรดอ่าน</h2>" + obj.MESSAGE,
        text: "กดยืนยัน ชิ้นงานนี้จะถูกนำไปใช้งาน",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'ยกเลิก',
        confirmButtonText: 'ยืนยัน',

        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            confirmBarCode(object);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
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