import React, {useMemo} from 'react';

import './App.css';

import logo from './assets/logo.svg';

import Routes from "./routes";

import './locales';

import {useTranslation} from "react-i18next";

function App() {

    const { i18n } = useTranslation();

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    };

    return (
        <div className="container">
            <table>
                <tr>
                    <td>
                        <div>
                            <button onClick={() => changeLanguage("en-US")}>ENGLISH</button>
                        </div>
                    </td>
                    <td>
                        <div>
                             <button onClick={() => changeLanguage("pt-BR")}>PORTUGUÊS</button>
                        </div>
                    </td>
                    </tr>
            </table>

            <img src={logo} alt="AirCnC"/>
            <div className="content">
                <Routes />

            </div>
        </div>
    );
}

export default App;