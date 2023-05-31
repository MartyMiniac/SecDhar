const qrCodeGen = {
    __size: 256,
    __qrcodeobj: null,
    __targetDivID: 'qrCodeImg',
    setSize: (size) => {
        qrCodeGen.__size=size;
    },
    generateQR: (data) => {
        qrCodeGen.__qrcodeobj = new QRCode(qrCodeGen.__targetDivID, {
            text: data,
            width: qrCodeGen.__size,
            height: qrCodeGen.__size,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.M
        })
    },
    clean: () => {
        if(qrCodeGen.__qrcodeobj!==null) {
            qrCodeGen.__qrcodeobj.clear();
            document.getElementById(qrCodeGen.__targetDivID).innerHTML=''
        }
    }
}