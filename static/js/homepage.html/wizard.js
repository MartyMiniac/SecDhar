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
    }
}

const sendData = {
    init: () => {
        qrCodeGen.clean();
        qrCodeScanner.clean();
    },
    step1: () => {
        
    },
    step2: () => {

    }
}

const receiveData = {
    init: () => {
        qrCodeGen.clean();
        qrCodeScanner.clean();
    },
    step1: () => {
        const data = receiveProtocol.step1();
        qrCodeGen.generateQR(data);
    },
    step2: () => {
        qrCodeGen.clean();
        qrCodeScanner.generateQR((txt, result) => {
            alert(txt);
            console.log(txt);
            console.log(result);
        })
    }
}