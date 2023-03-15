import { useState } from 'react';
import { session } from './controllers/session';
import {encrypt, decrypt} from './helpers/rsa'
import LoginPage from './pages/loginPage';
import MainPage from './pages/mainPage';

function App() {
    const [login, setLogin] = useState(session.loginState);

    session.addLoginListener(() => {
        setLogin(session.loginState);
    });

    (() => {
        const text='Hello World';
        const encText = encrypt(text);
        console.log(encText)
        const decText = decrypt(encText);
        console.log(decText)
        console.log(text===decText)
    })()

    return <>{login === true ? <MainPage /> : <LoginPage />}</>;
}

export default App;
