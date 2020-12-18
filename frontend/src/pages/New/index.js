import React, { useState, useMemo } from 'react';
import api from '../../services/api'

import camera from '../../assets/camera.svg'

import './styles.css';

export default function New({ history }) {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [dishes, setDishes] = useState('');
  const [price, setPrice] = useState('');
  
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

      <label htmlFor="name">NOME *</label>
      <input 
        id="name"
        placeholder="Nome do restaurante"
        onChange={event => setName(event.target.value)}
      />

      <label htmlFor="dishes">PRATOS *</label>
      <input 
        id="dishes"
        placeholder="Quais são os pratos do menu?"
        onChange={event => setDishes(event.target.value)}
      />

      <label htmlFor="price">VALOR DA RESERVA * <span>(em branco para GRATUITO)</span></label>
      <input 
        id="price"
        placeholder="Valor cobrado por pessoa"
        value={price}
        onChange={event => setPrice(event.target.value)}
      />

      <button type="submit" className="btn">Cadastrar</button>
    </form>
  )
}