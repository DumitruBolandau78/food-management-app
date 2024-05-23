const { Router } = require('express');
const router = Router();
const authMiddleware = require('../middleware/auth');
const Table = require('../models/Table');
const Product = require('../models/Product');

router.get('/', authMiddleware, async (req, res) => {
    const tables = await Table.find();

    tables.forEach( async (table) => {
        let sum = 0;
        table.orders.forEach(order => {
            sum += order.price * order.amount;
        });
        table.sum = sum;
    });

    res.render('management', {
        title: 'Administrare mese',
        tables,
        csrf: req.csrfToken()
    });
});

router.post('/', authMiddleware, async (req, res) => {
    await Table.findOneAndUpdate({_id: req.body.id}, {isFree: true, orders: []});

    return res.redirect('/management');
});

router.get('/:id', authMiddleware, async (req, res) => {
    const table = await Table.findOne({_id: req.params.id});
    const product = await Product.find();

    const sushi = product.filter(prod => prod.category === 'sushi');
    const pizza = product.filter(prod => prod.category === 'pizza');
    const fastFood = product.filter(prod => prod.category === 'fastFood');
    const juice = product.filter(prod => prod.category === 'suc');
    const naturalJuice = product.filter(prod => prod.category === 'sucNatural');
    const coffe = product.filter(prod => prod.category === 'cafea');

    res.render('menu', {
        title: 'Comanda pentru ' + table.name,
        id: req.params.id,
        sushi,
        pizza,
        fastFood,
        juice,
        naturalJuice,
        coffe,
        csrf: req.csrfToken(),
    });
});

router.post('/:id/payment', authMiddleware, async (req, res) => {
    const table = await Table.findById({_id: req.params.id});

    if(Array.isArray(req.body.name)){
        req.body.name.forEach((el, idx) => {
            table.orders.push({
                name: el,
                amount: req.body.amount[idx],
                price: req.body.price[idx]
            });
        });
    } else {
        if(!req.body.name){
            return res.redirect(`/management/${req.params.id}`);
        }
        table.orders.push({
            name: req.body.name,
            amount: req.body.amount,
            price: req.body.price
        });
    }
    

    table.isFree = false;
    await table.save();
    res.redirect('/management');
});

module.exports = router;