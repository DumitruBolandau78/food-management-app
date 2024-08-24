const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const hbsrs = require('express-handlebars');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);
const accountRoutes = require('./routes/account');
const managementRoutes = require('./routes/management');
const adminpanelRoutes = require('./routes/admin-panel');
const flash = require('express-flash');
const csrf = require('csurf');
const fileMiddleware = require('./middleware/file');

dotenv.config();

const app = express();

const hbs = hbsrs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
});

const store = new MongoStore({
    collection: 'sessions',
    uri: process.env.URL
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'images')));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(session({
    secret: 'some secret value',
    resave: false,
    saveUninitialized: false,
    store
}));
app.use(fileMiddleware.single('productImg'));
app.use(flash());
app.use(csrf());

app.get('/', (req, res) => {
    if(!req.body.isAuth){
        res.redirect('/account/login');
    } else {
        res.redirect('/management');
    }
});
app.use('/account', accountRoutes);
app.use('/management', managementRoutes);
app.use('/admin-panel', adminpanelRoutes);

const PORT = 5000 || process.env.PORT;

async function start(){
    try {
        await mongoose.connect('mongodb+srv://dimabolandau0:xIx24Sl2QIlq196a@cluster0.oo1ngs0.mongodb.net/management');
        app.listen(PORT);
        console.log("Port is " + process.env.PORT || 5000);
    } catch (error) {
        console.log(error);
    }
}

start();