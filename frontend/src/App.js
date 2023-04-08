import { useState, useEffect } from 'react';
import { session } from './controllers/session';
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

    return <>
            {visible ? (<PageLoader/>) : (login === true ? <MainPage /> : <LoginPage />) }
    </>;
}

export default App;
