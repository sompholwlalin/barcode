<!DOCTYPE html>
<html>

<head>
    <title>Camera Names Example</title>
</head>

<body>
    <ul id="cameraList"></ul>

    <script>
        // Display the names of the cameras
        var cameraListElement = document.getElementById('cameraList');

        navigator.mediaDevices.enumerateDevices()
            .then(function (devices) {
                var cameras = devices.filter(function (device) {
                    return device.kind === 'videoinput';
                });

                cameras.forEach(function (camera, index) {
                    var listItem = document.createElement('li');
                    listItem.textContent = 'Camera ' + (index + 1) + ': ' + camera.label;
                    cameraListElement.appendChild(listItem);
                });
            })
            .catch(function (error) {
                console.error('Error enumerating devices.', error);
            });
    </script>
</body>

</html>