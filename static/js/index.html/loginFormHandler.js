document.getElementById('loginBtn').onclick = (e) => {
    e.preventDefault();
    //verify form
    if(verifyForm()) {
        //perform api call
        alert('success');
        const profile = Models.createUser(
            document.getElementById('lgnfrm-inp-name').value,
            document.getElementById('lgnfrm-inp-dob').value,
            document.getElementById('lgnfrm-inp-gender').value,
            document.getElementById('lgnfrm-inp-address').value,
            document.getElementById('lgnfrm-inp-aadharno').value
        );

        ApiCalls.register(profile)
        .then(data => {
            UserProfile.setName(profile.name);
            UserProfile.setDob(profile.dob);
            UserProfile.setGender(profile.gender);
            UserProfile.setAddress(profile.address);
            UserProfile.setAadharNumber(profile.aadharNo);

            Credentials.setKeyPair(data.keyPair);
            Credentials.setTimePair(data.timePair);
            Credentials.setSign(data.sign);
            Credentials.setDataHash(data.dataHash);
        })
        // UserProfile.setName(document.getElementById('lgnfrm-inp-name').value);
        // UserProfile.setDob(document.getElementById('lgnfrm-inp-dob').value);
        // UserProfile.setGender(document.getElementById('lgnfrm-inp-gender').value);
        // UserProfile.setAddress(document.getElementById('lgnfrm-inp-address').value);
        // UserProfile.setAadharNumber(document.getElementById('lgnfrm-inp-aadharno').value);
    }
    else {
        //notify user
        alert('failure');
    }
}

const verifyForm = () => {
    return (
        verifyFormName() &&
        verifyFormDob() &&
        verifyFormGender() &&
        verifyFormAddress() &&
        verifyFormAadharno() 
    )
}


const verifyFormName = () => {
    const element = document.getElementById('lgnfrm-inp-name');
    if(element.value==='') {
        return false;
    }
    else {
        return true;
    }
}
const verifyFormDob = () => {
    const element = document.getElementById('lgnfrm-inp-dob');
    if(element.value==='') {
        return false;
    }
    else {
        return true;
    }
}
const verifyFormGender = () => {
    const element = document.getElementById('lgnfrm-inp-gender');
    return true;
}
const verifyFormAddress = () => {
    const element = document.getElementById('lgnfrm-inp-address');
    if(element.value==='') {
        return false;
    }
    else {
        return true;
    }
}
const verifyFormAadharno = () => {
    const element = document.getElementById('lgnfrm-inp-aadharno');
    if(element.value==='' || element.value.length!==12) {
        return false;
    }
    else {
        return true;
    }
}