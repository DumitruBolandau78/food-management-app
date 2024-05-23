const {model, Schema} = require('mongoose');

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    urlImage: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    } 
});

module.exports = model('product', productSchema);