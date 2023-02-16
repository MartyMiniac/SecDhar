export const registerBodyValidator = (body: any) => {
    if(
        body.name === undefined ||
        body.dob === undefined ||
        body.gender === undefined ||
        body.address === undefined ||
        body.aadharNo === undefined
    ) {
        return false;
    }
    else {
        return true;
    }
}