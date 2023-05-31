const updateUserInfo = () => {
    document.getElementById('userInfoDisplay').innerHTML=`Name: ${UserProfile.getName()}<br>Gender: ${UserProfile.getGender()}<br>Address: XXXXXXXXXXXXXXXXXXXXXXXXXXXX<br>Aadhar Number: XXXXXXXXXXXXXXXX`
}

const generateQR = (data) => {
    new QRCode("qrCodeImg", {
        text: data,
        width: 256,
        height: 256,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.M
    })
}

document.onreadystatechange = () => {
    updateUserInfo();
}