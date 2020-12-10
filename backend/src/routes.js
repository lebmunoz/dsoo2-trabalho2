const express = require('express');
const multer = require('multer');

const uploadConfig = require('./config/upload');

const SessionController = require('./controllers/SessionController');
const RestaurantController = require('./controllers/RestaurantController');
const DashboardController = require('./controllers/DashboardController');
const BookingController = require('./controllers/BookingController');
const ApprovalController = require('./controllers/ApprovalController')
const RejectionController = require('./controllers/RejectionController')

const routes = express.Router();
const upload = multer(uploadConfig);

routes.post('/sessions', SessionController.store);
routes.post('/restaurants', upload.single('thumbnail'), RestaurantController.store);
routes.get('/restaurants', RestaurantController.index);
routes.get('/dashboard', DashboardController.show);

routes.post('/restaurants/:restaurant_id/bookings', BookingController.store)

routes.post('/bookings/:booking_id/approvals', ApprovalController.store)
routes.post('/bookings/:booking_id/rejections', RejectionController.store)

module.exports = routes;
