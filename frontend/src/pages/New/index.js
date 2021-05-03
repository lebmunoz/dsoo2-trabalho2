import React, { useState, useMemo } from 'react';
import api from '../../services/api'

import camera from '../../assets/camera.svg'

import './styles.css';
import {useTranslation} from "react-i18next";

export default function New({ history }) {
    const [image, setImage] = useState(null);
    const [name, setName] = useState('');
    const [dishes, setDishes] = useState('');
    const [price, setPrice] = useState('');

    const {t} = useTranslation('new');

    const preview = useMemo(() => {
        return image ? URL.createObjectURL(image) : null;
    }, [image])

    async function handleSubmit(event) {
        event.preventDefault();

        const data = new FormData();
        const user_id = localStorage.getItem('user');

        data.append('image', image);
        data.append('name', name);
        data.append('dishes', dishes);
        data.append('price', price);

        await api.post('/restaurants', data, {
            headers: { user_id }
        })

        history.push('/dashboard');
    }

    return (
        <form onSubmit={handleSubmit}>
            <label
                id="image"
                style={{ backgroundImage: `url(${preview})`}}
                className={ image ? "has-image" : ""}
            >
                <input type="file" onChange={event => setImage(event.target.files[0])}/>
                <img src={camera} alt="Select img"/>
            </label>

            <label htmlFor="name">{t('name')}</label>
            <input
                id="name"
                placeholder={t('restaurantName')}
                onChange={event => setName(event.target.value)}
            />

            <label htmlFor="dishes">{t('dishes')}</label>
            <input
                id="dishes"
                placeholder={t('dishesFromMenu')}
                onChange={event => setDishes(event.target.value)}
            />

            <label htmlFor="price">{t('reservationAmount')}<span>({t('blankFree')})</span></label>
            <input
                id="price"
                placeholder={t('amountPerPerson')}
                value={price}
                onChange={event => setPrice(event.target.value)}
            />

            <button type="submit" className="btn">{t('signUp')}</button>
        </form>
    )
}