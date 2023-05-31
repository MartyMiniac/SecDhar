const updateUserInfo = () => {
    document.getElementById('userInfoDisplay').innerHTML=`Name: ${UserProfile.getName()}<br>Gender: ${UserProfile.getGender()}<br>Address: XXXXXXXXXXXXXXXXXXXXXXXXXXXX<br>Aadhar Number: XXXXXXXXXXXXXXXX`
}

document.onreadystatechange = () => {
    updateUserInfo();
}