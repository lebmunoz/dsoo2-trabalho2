const Restaurant = require('../models/Restaurant')

module.exports = {
    async show(req, res) {
        const { user_id } = req.headers;

        const restaurants = await Restaurant.find({ user: user_id})

        return res.json(restaurants);
    }
}