document.getElementById('sendDataBtn').onclick = () => {
    wizard.init();
    wizard.set(wizard.PROTOCOLS.SEND);
    wizard.next();
}

document.getElementById('receiveDataBtn').onclick = () => {
    wizard.init();
    wizard.set(wizard.PROTOCOLS.RECEIVE);
    wizard.next();
}

document.getElementById('modalNextBtn').onclick = () => {
    wizard.next();
}