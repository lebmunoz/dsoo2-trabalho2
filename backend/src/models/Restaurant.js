const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
    image: String,
    name: String,
    price: Number,
    dishes: [String],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    toJSON: {
        virtuals: true,
    },
});


RestaurantSchema.virtual('thumbnail_url').get(function() {
    return `http://localhost:3333/files/${this.thumbnail}`
})

module.exports = mongoose.model('Restaurant', RestaurantSchema);