import React, { useState } from 'react';
import api from '../../services/api';

import {useTranslation} from "react-i18next";

export default function Login({ history }) {
    const [email, setEmail] = useState('');

    const {t} = useTranslation('login');

    async function handleSubmit(event) {
        event.preventDefault();
        const response = await api.post('/sessions', { email });

        const { _id } = response.data;

        localStorage.setItem('user', _id);

        history.push('/dashboard')
    }

    return (
        <>
            <p>
                {t('offer')} <strong>{t('restaurant')}</strong> {t('clients')} <strong>{t('dish')}</strong> {t('appetizing')}
            </p>

            <form onSubmit={handleSubmit}>
                <label htmlFor="email">{t('email')}</label>
                <input
                    id="email"
                    type="email"
                    placeholder={t('insertEmail')}
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />

                <button type="submit" className="btn">{t('enter')}</button>
            </form>
        </>
    )
}