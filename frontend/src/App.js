import { useState, useEffect } from 'react';
import { session } from './controllers/session';
import { encrypt, decrypt } from './helpers/rsa'
import LoginPage from './pages/loginPage';
import MainPage from './pages/mainPage';
import PageLoader from './pages/pageLoader';

function App() {
    const [login, setLogin] = useState(session.loginState);

    const [visible, setVisible] = useState(false);

    useEffect(() => {
       setVisible(true) 
       setTimeout(()=>{
        setVisible(false)
       }, 1000)
    }, []);

    session.addLoginListener(() => {
        setLogin(session.loginState);
    });

    // (() => {
    //     const text='Hello World';
    //     const encText = encrypt(text);
    //     console.log(encText)
    //     const decText = decrypt(encText);
    //     console.log(decText)
    //     console.log(text===decText)
    // })()

    return <>
            {visible ? (<PageLoader/>) : (login === true ? <MainPage /> : <LoginPage />) }
    </>;
}

export default App;
