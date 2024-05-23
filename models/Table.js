const {model, Schema} = require('mongoose');

const table = new Schema({
    name: {
        type: String,
        required: true
    },
    orders: [
        {
            name: {
                type: String,
                required: true
            },
            amount: {
                type: Number,
                required: true,
                default: 1
            },
            price: {
                type: Number,
                required: true
            }
        }
    ],
    isFree: {
        type: Boolean,
        required: true,
        default: false
    }
});

module.exports = model('table', table);