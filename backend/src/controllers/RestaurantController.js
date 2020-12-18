const User = require('../models/User');
const Restaurant = require('../models/Restaurant');

module.exports = {
    async index(req, res) {
        const { dish } = req.query;

        const restaurants = await Restaurant.find({ dishes: dish })

        return res.json(restaurants);
    },
    
    async store(req, res) {
        const { filename } = req.file;
        const { name, dishes, price } = req.body;
        const { user_id } = req.headers;

        const user = await User.findById(user_id);
        
        if (!user) {
            return res.status(400).json({ error: 'User does not exists' });
        }

        const restaurant = await Restaurant.create({
            user: user_id,
            image: filename,
            name,
            dishes: dishes.split(',').map(dish => dish.trim()), 
            price
        })

        return res.json(restaurant)
    }
}