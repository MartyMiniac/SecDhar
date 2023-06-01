const wizard = {
    __activeProtocol: '',
    __nextStep: 0,
    __init: () => {
        if(wizard.__activeProtocol===wizard.PROTOCOLS.SEND) {
            sendData.init();
        }
        else if(wizard.__activeProtocol===wizard.PROTOCOLS.RECEIVE) {
            receiveData.init();
        }
    },
    PROTOCOLS: {
        SEND: 'SEND',
        RECEIVE: 'RECEIVE'
    },
    next: () => {
        if(wizard.__activeProtocol===wizard.PROTOCOLS.SEND) {
            document.getElementById('modalLabel').innerText='Send Data';
            switch(wizard.__nextStep) {
                case 0:
                    sendData.step1();
                    wizard.__nextStep++;
                    break;
                case 1:
                    sendData.step2();
                    break;
            }
        }
        else if(wizard.__activeProtocol===wizard.PROTOCOLS.RECEIVE) {
            document.getElementById('modalLabel').innerText='Receive Data';
            switch(wizard.__nextStep) {
                case 0:
                    receiveData.step1();
                    wizard.__nextStep++;
                    break;
                case 1:
                    receiveData.step2();
                    wizard.__nextStep++;
                    break;
                case 2:
                    receiveData.step3();
                    break;
            }
        }
    },
    init: () => {
        wizard.__init();
        wizard.__activeProtocol='';
        wizard.__nextStep=0;
    },
    set: (data) => {
        wizard.__activeProtocol=data;
    },
    nextButtonVisible: () => {        
        document.getElementById('modalNextBtn').style.visibility='visible';
    },
    nextButtonInvisible: () => {
        document.getElementById('modalNextBtn').style.visibility='hidden';
    }
}

const sendData = {
    __step1PassThrough: '',
    init: () => {
        qrCodeGen.clean();
        qrCodeScanner.clean();
    },
    step1: () => {
        wizard.nextButtonInvisible();
        qrCodeScanner.scanQR((txt, result) => {
            console.log(txt);
            console.log(result);
            
            sendProtocol.step1(txt).then((value) => {
                sendProtocol.step2(value).then(value2 => {
                    console.log(value2);
                    sendData.__step1PassThrough=value2.substring(value2.length/2, value2.length);
                    qrCodeGen.generateQR(value2.substring(0, value2.length/2));
                    wizard.nextButtonVisible();
                })
            })
        })
        
    },
    step2: () => {
        wizard.nextButtonInvisible();
        qrCodeGen.clean();
        qrCodeGen.generateQR(sendData.__step1PassThrough);
    }
}

const receiveData = {
    __step2PassThrough: '',
    init: () => {
        qrCodeGen.clean();
        qrCodeScanner.clean();
    },
    step1: () => {
        wizard.nextButtonVisible();
        const data = receiveProtocol.step1();
        qrCodeGen.generateQR(data);
    },
    step2: () => {
        wizard.nextButtonInvisible();
        qrCodeGen.clean();
        qrCodeScanner.scanQR((txt, result) => {
            alert(txt);
            console.log(txt);
            console.log(result);
            receiveData.__step2PassThrough=txt;
            wizard.nextButtonVisible();
        })
    },
    step3: () => {
        wizard.nextButtonInvisible();
        qrCodeScanner.clean();
        qrCodeScanner.scanQR((txt, result) => {
            console.log(txt);
            console.log(result);
            receiveData.__step2PassThrough+=txt;
            receiveProtocol.step2(receiveData.__step2PassThrough).then(data => {
                alert(JSON.stringify(data));
            })
        })
    }
}