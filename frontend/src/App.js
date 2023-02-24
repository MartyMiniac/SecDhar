import { useState } from 'react';
import { session } from './controllers/session';
import LoginPage from './pages/loginPage';
import MainPage from './pages/mainPage';

function App() {
    const [login, setLogin] = useState(session.loginState);

    session.addLoginListener(() => {
        setLogin(session.loginState);
    });

    return <>{login === true ? <MainPage /> : <LoginPage />}</>;
}

export default App;
