const qrCodeScanner = {
    __qrBox: 250,
    __qrcodeobj: null,
    __targetDivID: 'qrCodeReader',
    setQRBox: (size) => {
        qrCodeScanner.__qrBox=size;
    },
    scanQR: (onSuccessHandler) => {
        qrCodeScanner.__qrcodeobj = new Html5QrcodeScanner(qrCodeScanner.__targetDivID, {
            fps: 10,
            qrbox: qrCodeScanner.__qrBox
        })
        qrCodeScanner.__qrcodeobj.render((txt, result) => {
            onSuccessHandler(txt, result);
            qrCodeScanner.__qrcodeobj.clear();
        });
    },
    clean: () => {
        if(qrCodeGen.__qrcodeobj!==null) {
            qrCodeScanner.__qrcodeobj.clear();
            document.getElementById(qrCodeScanner.__targetDivID).innerHTML=''
        }
    }
}