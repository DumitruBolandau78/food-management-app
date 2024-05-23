const {Router} = require('express');
const authMiddleware = require('../middleware/auth');
const auth = require('../middleware/auth');
const Product = require('../models/Product');
const router = Router();

router.get('/', auth, async (req, res) => {
    const product = await Product.find();

    const sushi = product.filter(prod => prod.category === 'sushi');
    const pizza = product.filter(prod => prod.category === 'pizza');
    const fastFood = product.filter(prod => prod.category === 'fastFood');
    const juice = product.filter(prod => prod.category === 'suc');
    const naturalJuice = product.filter(prod => prod.category === 'sucNatural');
    const coffe = product.filter(prod => prod.category === 'cafea');

    if(req.session.user.isAdmin){
        res.render('admin-panel', {
            title: 'Admin Panel',
            csrf: req.csrfToken(),
            sushi,
            pizza,
            fastFood,
            juice,
            naturalJuice,
            coffe
        });
    } else {
        res.redirect('/management');
    }
});

router.post('/add-product', auth, async (req, res) => {
    try {
        const {name, price, type} = req.body;
        if(req.file){
            const product = new Product({
                name, price, urlImage: req.file.path, category: type
            });

            await product.save();
        }

        res.redirect('/admin-panel');
    } catch (error) {
        console.log(error);
    }
});

router.post('/delete', async (req, res) => {
    const product = await Product.findByIdAndDelete(req.body.id);

    res.redirect('/admin-panel');
});

module.exports = router;