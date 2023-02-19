export const generateRandomString = (size: number) => {
    let s: string = '';
    for(let i=0; i<size; i++) {
        switch(Math.floor(Math.random()*3)) {
            case 0:
            //digits
            s+=Math.floor(Math.random()*10);
            break;
            case 1:
            //lowercase letter
            s+=String.fromCharCode(97+Math.floor(Math.random()*26));
            break;
            case 2:
            //uppercase letter
            s+=String.fromCharCode(65+Math.floor(Math.random()*26));
            break;
        }
    }

    return s;
}