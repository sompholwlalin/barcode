class CookieManager {
    createCookie(name, value, daysToExpire) {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + daysToExpire);
        const cookieString = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/`;
        document.cookie = cookieString;
    }

    readCookie(name) {
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookieArray = decodedCookie.split(';');

        for (let i = 0; i < cookieArray.length; i++) {
            let cookie = cookieArray[i];
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(name) === 0) {
                return cookie.substring(name.length + 1, cookie.length);
            }
        }

        return null;
    }

    updateCookie(name, value, daysToExpire) {
        this.createCookie(name, value, daysToExpire);
    }

    deleteCookie(name) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
}



// var codeReader = null;
// const codeReader = new ZXing.BrowserQRCodeReader();

// const myObject = { key1: 'value1', key2: 'value2' };

// Convert JSON object to string
// const jsonString = JSON.stringify(myObject);


// const cookieManager = new CookieManager();

// Create a cookie
// cookieManager.createCookie('BarcodeReader', jsonString, 7);

// Read a cookie
// const value = cookieManager.readCookie('BarcodeReader');
// console.log(value); // Outputs the value of the "cookieName" cookie

// Update a cookie
// cookieManager.updateCookie('BarcodeReader', 'newCookieValue', 7);

// Delete a cookie
// cookieManager.deleteCookie('BarcodeReader');



// console.log(baseurl)


