import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import socketio from "socket.io-client";
import api from "../../services/api";
import {useTranslation} from "react-i18next";

import "./styles.css";

export default function Dashboard() {
  const [restaurants, setRestaurants] = useState([]);
  const [requests, setRequests] = useState([]);

  const {t} = useTranslation('dashboard');

  const user_id = localStorage.getItem('user');
  const socket = useMemo(() => socketio('http://localhost:3333', {
    query: { user_id },
  }), [user_id]);

  useEffect(() => {
    socket.on('booking_request', data => {
      setRequests([...requests, data]);
    })
  }, [requests, socket]);

  useEffect(() => {
    async function loadRestaurants() {
      const user_id = localStorage.getItem("user");
      const response = await api.get("/dashboard", {
        headers: { user_id }
      });

      setRestaurants(response.data);
    }
    loadRestaurants();
  }, []);

  async function handleAccept(id) {
    await api.post(`/bookings/${id}/approvals`);

    setRequests(requests.filter(request => request._id !== id));
  }
  async function handleReject(id) {
    await api.post(`/bookings/${id}/rejections`);

    setRequests(requests.filter(request => request._id !== id));
  }

  return (
      <>
        <ul className="notifications">
          {requests.map(request => (
              <li key={request._id}>
                <p>
                  <strong>{request.user.email}</strong> {t('requester')} <strong>{request.restaurant.name}</strong> {t('date')} <strong>{request.date}</strong>
                </p>
                <button className="accept" onClick={() => handleAccept(request._id)}>{t('accept')}</button>
                <button className="reject" onClick={() => handleReject(request._id)}>{t('reject')}</button>
              </li>
          ))}
        </ul>
        <ul className="restaurant-list">
          {restaurants.map(restaurant => (
              <li key={restaurant._id}>
                <header
                    style={{ backgroundImage: `url(${restaurant.image_url})` }}
                ></header>
                <strong>{restaurant.name}</strong>
                <span>{restaurant.price ? `R$${restaurant.price}${t('people')}` : `${t('free')}`}</span>
              </li>
          ))}
        </ul>

        <Link to="/new">
          <button className="btn">{t('register')}</button>
        </Link>
      </>
  );
}